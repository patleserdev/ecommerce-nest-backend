import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Relation,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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
}
