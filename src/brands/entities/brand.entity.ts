import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import slugify from 'slugify';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  slug: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (this.name) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
  }
}
