import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Relation,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  Unique,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { ProductVariation } from '../../product-variations/entities/product-variation.entity';
import { Brand } from '../../brands/entities/brand.entity';
import slugify from 'slugify';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column()
  name: string;

  @Unique(['slug'])
  @Column({ unique: true })
  slug: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  sku: string;

  @Column()
  quantity: number;

  //   @ManyToOne(() => Category, (category) => category.products)
  //   category: Category;

  @ManyToOne(() => Category, (category) => category.products)
  category: Relation<Category>;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Relation<Brand>;

  @OneToMany(() => ProductVariation, (variation) => variation.product, {
    cascade: true,
  })
  variations: Relation<ProductVariation[]>;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (this.name) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
  }
}
