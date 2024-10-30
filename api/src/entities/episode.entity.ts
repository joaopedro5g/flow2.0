/* eslint-disable @typescript-eslint/no-unused-vars */
import { randomUUID } from 'crypto';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { InvitedEntity } from './inveted.entity';
import { UserEntity } from './user.entity';
import { ChannelEntity } from './channel.entity';

@Entity('episode')
export class EpisodeEntity {
  @PrimaryColumn()
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

  @Column({ nullable: true, default: false })
  uploadConverted: boolean;

  @ManyToOne((_channel) => ChannelEntity, (channel) => channel.episodes, {
    nullable: false,
  })
  channel: ChannelEntity;

  @OneToMany(
    (_inveted: UserEntity) => UserEntity,
    (episode) => episode.episodeLiked,
    {
      nullable: true,
    },
  )
  likes: UserEntity;
}
