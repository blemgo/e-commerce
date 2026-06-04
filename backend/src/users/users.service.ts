import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterLocalUserDto } from './dto/register-local-user.dto';
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
        throw new ConflictException('Email already taken');
      }

      throw error;
    }

    return user;
  }
}
