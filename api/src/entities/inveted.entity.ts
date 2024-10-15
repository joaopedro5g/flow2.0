/* eslint-disable @typescript-eslint/no-unused-vars */
import { randomUUID } from 'crypto';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { EpisodeEntity } from './episode.entity';

@Entity('inveted')
export class InvitedEntity {
  @PrimaryColumn({ default: randomUUID() })
  id: string;

  @Column()
  name: string;

  @ManyToOne(
    (_episode: EpisodeEntity) => EpisodeEntity,
    (episode) => episode.invited,
  )
  episodes: EpisodeEntity[];

  @Column()
  backdropUrl: string;
}
