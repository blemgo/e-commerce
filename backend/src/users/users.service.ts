import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RegisterLocalUserDto } from './dto/register-local-user.dto';
import { GoogleProfileData } from './types/google-profile-data.type';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from './entities/enums/role.enum';
import { AuthProvider } from './entities/enums/auth-provider.enum';
import { env } from 'src/config/env';
import { pgCodes } from 'src/utils/pg-codes';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email: email.toLowerCase() } });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createLocalUser(registerLocalUserDto: RegisterLocalUserDto): Promise<User> {
    const hashedPass = await bcrypt.hash(registerLocalUserDto.password, env.BCRYPT_SALT);

    const user = this.usersRepository.create({
      email: registerLocalUserDto.email.toLowerCase(),
      passwordHash: hashedPass,
      fullName: registerLocalUserDto.fullName,
      role: Role.CUSTOMER,
      authProvider: AuthProvider.LOCAL,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error?.code === pgCodes.UNIQUE_VIOLATION) {
        this.logger.warn(`Email already taken: ${registerLocalUserDto.email}`);
        throw new ConflictException('Email already taken');
      }

      this.logger.error(`Unexpected DB error creating user: ${error.message}`, error.stack);
      throw error;
    }

    return user;
  }

  async findOrCreateGoogleUser(profile: GoogleProfileData): Promise<User> {
    const { googleId, email, fullName } = profile;

    const existingUser = await this.usersRepository.findOne({
      where: { providerId: googleId, authProvider: AuthProvider.GOOGLE },
    });

    if (existingUser) {
      return existingUser;
    }

    const user = this.usersRepository.create({
      email: email.toLowerCase(),
      passwordHash: null,
      fullName,
      role: Role.CUSTOMER,
      authProvider: AuthProvider.GOOGLE,
      providerId: googleId,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error?.code === pgCodes.UNIQUE_VIOLATION) {
        this.logger.warn(`Email already registered: ${email}`);
        throw new ConflictException('An account with this email already exists');
      }

      this.logger.error(
        `Unexpected DB error creating Google user: ${error.message}`,
        error.stack,
      );
      throw error;
    }

    return user;
  }
}
