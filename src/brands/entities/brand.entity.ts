import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import slugify from 'slugify';
import { MediaLink } from '../../media-links/entities/media-link.entity.js';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ unique: true })
  name: string;

  @Column()
  slug: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];

  @OneToMany(() => MediaLink, (mediaLink) => mediaLink.brand)
  mediaLinks: MediaLink[];

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (this.name) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
  }
}
