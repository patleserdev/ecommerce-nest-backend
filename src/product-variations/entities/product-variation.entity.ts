import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class ProductVariation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: 'homme' | 'femme' | 'enfant';

  @Column()
  size: string;

  @Column()
  color: string;

  @Column()
  stock: number;

  @ManyToOne(() => Product, (product) => product.variations)
  product: Relation<Product>;
}
