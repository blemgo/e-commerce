import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'bally', name: 'country' })
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'country_name', type: 'varchar', length: 120, nullable: false })
  countryName: string;
}
