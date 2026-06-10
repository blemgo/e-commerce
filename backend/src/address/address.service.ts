import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { UserAddress } from './entities/user-address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { pgCodes } from 'src/utils/pg-codes';

@Injectable()
export class AddressService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(UserAddress)
    private userAddressRepository: Repository<UserAddress>,
  ) {}

  async getUserAddresses(userId: string): Promise<UserAddress[]> {
    return this.userAddressRepository.find({
      where: { userId },
      relations: { address: { country: true } },
      order: { isDefault: 'DESC' },
    });
  }

  async createAddress(
    userId: string,
    dto: CreateAddressDto,
  ): Promise<UserAddress[]> {
    const { countryId, isDefault, ...addressFields } = dto;

    try {
      await this.dataSource.transaction(async (manager) => {
        const address = await manager.save(
          manager.create(Address, {
            ...addressFields,
            country: { id: countryId },
          }),
        );

        const existingCount = await manager.count(UserAddress, {
          where: { userId },
        });
        const markAsDefault = isDefault === true || existingCount === 0;

        if (markAsDefault && existingCount > 0) {
          await manager.update(UserAddress, { userId }, { isDefault: false });
        }

        await manager.save(
          manager.create(UserAddress, {
            userId,
            addressId: address.id,
            isDefault: markAsDefault,
          }),
        );
      });
    } catch (error) {
      if (error?.code === pgCodes.FOREIGN_KEY_VIOLATION) {
        throw new BadRequestException('Country not found');
      }

      throw error;
    }

    return this.getUserAddresses(userId);
  }

  async getUserAddress(
    userId: string,
    addressId: string,
    manager?: EntityManager,
  ): Promise<UserAddress> {
    const repository = manager ? 
      manager.getRepository(UserAddress)
      : this.userAddressRepository;

    const link = await repository.findOne({ where: { userId, addressId } });

    if (!link) {
      throw new NotFoundException('Address not found');
    }

    return link;
  }

  async setDefaultAddress(
    userId: string,
    addressId: string,
  ): Promise<UserAddress[]> {
    await this.getUserAddress(userId, addressId);

    await this.dataSource.transaction(async (manager) => {
      await manager.update(UserAddress, { userId }, { isDefault: false });
      await manager.update(
        UserAddress,
        { userId, addressId },
        { isDefault: true },
      );
    });

    return this.getUserAddresses(userId);
  }
}
