/* eslint-disable @typescript-eslint/no-unused-vars */
import { randomUUID } from 'crypto';
import { Column, Entity, ManyToOne, PrimaryColumn, ColumnType } from 'typeorm';
import { EpisodeEntity } from './episode.entity';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  REMOTE = 'remote',
}

export enum MemberPlans {
  NONE = 'none',
  HUMILDE = 'humilde',
  BURGES = 'burgues',
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

  @Column({ type: 'varchar', default: Role.USER })
  role: Role;

  @Column({ type: 'varchar', default: MemberPlans.NONE })
  plan: MemberPlans;
}
