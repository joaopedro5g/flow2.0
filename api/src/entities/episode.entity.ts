import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('episode')
export class EpisodeEntity {
  @PrimaryColumn({ default: randomUUID() })
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  invited: string;

  @Column()
  audioUrl: string;
}
