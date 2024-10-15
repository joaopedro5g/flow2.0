/* eslint-disable @typescript-eslint/no-unused-vars */
import { randomUUID } from 'crypto';
import { Column, Entity, ManyToOne, PrimaryColumn, ColumnType } from 'typeorm';
import { EpisodeEntity } from './episode.entity';

enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('user')
export class UserEntity {
  @PrimaryColumn({ default: randomUUID() })
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(
    (_episode: EpisodeEntity) => EpisodeEntity,
    (episode) => episode.likes,
  )
  episodeLiked: EpisodeEntity[];

  @Column({ type: 'varchar' })
  role: Role;
}
