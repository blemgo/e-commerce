import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from 'src/country/entities/country.entity';

@Entity({ schema: 'bally', name: 'address' })
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'unit_number', type: 'text', nullable: true })
  unitNumber?: string;

  @Column({ name: 'street_number', type: 'text', nullable: true })
  streetNumber?: string;

  @Column({ name: 'address_line1', type: 'text', nullable: false })
  addressLine1: string;

  @Column({ name: 'address_line2', type: 'text', nullable: true })
  addressLine2?: string;

  @Column({ type: 'text', nullable: false })
  city: string;

  @Column({ type: 'text', nullable: true })
  region?: string;

  @Column({ name: 'postal_code', type: 'varchar', length: 20, nullable: true })
  postalCode?: string;

  @ManyToOne(() => Country, { onDelete: 'RESTRICT', nullable: false })
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
