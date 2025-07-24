import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import slugify from 'slugify';
import { MediaLink } from '../../media-links/entities/media-link.entity';

@Entity()
export class Category {
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

  @Column()
  parent_id: number;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(() => MediaLink, (mediaLink) => mediaLink.category)
  mediaLinks: MediaLink[];

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (this.name) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
  }
}
