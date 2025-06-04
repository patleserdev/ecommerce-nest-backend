// adresse.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AdressRole } from '../../address-roles/entities/address-role.entity';
@Entity()
export class Adress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  streetAddress: string;

  @Column({ nullable: true })
  streetAddress2?: string;

  @Column()
  postalCode: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  phoneToDelivery?: string;

  @OneToMany(() => AdressRole, (role) => role.adresse, { cascade: true })
  roles: AdressRole[];
}
