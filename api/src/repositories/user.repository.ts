import { Injectable } from '@nestjs/common';
import { RegisterUserDTO } from 'src/dto/register-user.dto';
import { IRepository } from '../interfaces/repository.interface';
import { UserEntity } from 'src/entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';

@Injectable()
export class UserRepository extends IRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {
    super();
  }
  async create(input: RegisterUserDTO): Promise<UserEntity> {
    const id = randomUUID();
    const user = this.repository.create({ ...input, id });
    return await this.repository.save(user);
  }

  async findOne(
    input?: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[],
  ): Promise<UserEntity | UserEntity[]> {
    return await this.repository.findOneBy(input);
  }
  findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }
}
