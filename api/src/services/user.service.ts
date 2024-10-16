import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDTO } from 'src/dto/register-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hashSync, genSaltSync } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}
  async register(input: RegisterUserDTO): Promise<UserEntity> {
    const salt = genSaltSync(8);
    const password = hashSync(input.password, salt);
    const ep = this.userRepo.create({ ...input, password });
    return await this.userRepo.save(ep);
  }
}
