/* eslint-disable @typescript-eslint/no-unused-vars */
import { randomUUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { InvitedEntity } from './inveted.entity';
import { UserEntity } from './user.entity';

@Entity('episode')
export class EpisodeEntity {
  @PrimaryColumn({ default: randomUUID() })
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(
    (_inveted: InvitedEntity) => InvitedEntity,
    (episode) => episode.episodes,
    {
      nullable: true,
    },
  )
  invited: InvitedEntity;

  @Column({ nullable: true })
  audioUrl: string;

  @OneToMany(
    (_inveted: UserEntity) => UserEntity,
    (episode) => episode.episodeLiked,
    {
      nullable: true,
    },
  )
  likes: UserEntity;
}
