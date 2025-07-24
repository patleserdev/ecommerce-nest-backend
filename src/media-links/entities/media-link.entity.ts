import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Media } from '../../medias/entities/media.entity';
import { Product } from 'src/products/entities/product.entity';
import { Brand } from 'src/brands/entities/brand.entity';
import { Category } from 'src/categories/entities/category.entity';

@Entity()
export class MediaLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mediaId: string;

  @ManyToOne(() => Media, (media) => media.links, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'mediaId' })
  media: Media;

  @Column()
  linkedType: string; // ex: 'product', 'category', 'brand'

  @ManyToOne(() => Product, (product) => product.mediaLinks, { nullable: true })
  @JoinColumn({ name: 'linkedId' }) // facultatif si tu veux lier `linkedId`
  product: Product;

  @ManyToOne(() => Brand, (brand) => brand.mediaLinks, { nullable: true })
  @JoinColumn({ name: 'linkedId' }) // facultatif si tu veux lier `linkedId`
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.mediaLinks, {
    nullable: true,
  })
  @JoinColumn({ name: 'linkedId' }) // facultatif si tu veux lier `linkedId`
  category: Category;

  @Column()
  linkedId: number; // ID de l'entité cible

  @Column({ nullable: true })
  role: string; // ex: 'thumbnail', 'banner', 'gallery'

  @Column({ type: 'int', default: 0 })
  position: number;

  @CreateDateColumn()
  createdAt: Date;
}
