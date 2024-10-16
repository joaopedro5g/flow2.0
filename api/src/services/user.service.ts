import { ConflictException, Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcryptjs';
import { RegisterUserDTO } from 'src/dto/register-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}
  async register(input: RegisterUserDTO): Promise<UserEntity> {
    const salt = genSaltSync(8);
    const password = hashSync(input.password, salt);
    const user = await this.repository.findOne({ email: input.email });
    if (user) throw new ConflictException({ message: 'User with email exist' });
    return await this.repository.create({ ...input, password });
  }
}
