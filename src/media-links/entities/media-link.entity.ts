import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Media } from '../../medias/entities/media.entity';

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

  @Column()
  linkedId: string; // ID de l'entité cible

  @Column({ nullable: true })
  role: string; // ex: 'thumbnail', 'banner', 'gallery'

  @Column({ type: 'int', default: 0 })
  position: number;

  @CreateDateColumn()
  createdAt: Date;
}
