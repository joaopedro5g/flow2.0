import { ConflictException, Injectable } from '@nestjs/common';
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
    let user = await this.userRepo.findOneBy({ email: input.email });
    if (user) throw new ConflictException({ message: 'User with email exist' });
    const salt = genSaltSync(8);
    const password = hashSync(input.password, salt);
    user = this.userRepo.create({ ...input, password });
    return await this.userRepo.save(user);
  }
}
