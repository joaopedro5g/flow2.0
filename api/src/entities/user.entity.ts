import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class EpisodeEntity {
  @PrimaryColumn({ default: randomUUID() })
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
