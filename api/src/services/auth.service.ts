import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcryptjs';
import { AuthDTO } from 'src/dto/auth.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwt: JwtService,
  ) {}
  async login({ email, password }: AuthDTO): Promise<{ access_token: string }> {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) throw new NotFoundException({ message: 'User not found' });
    if (!compareSync(password, user.password))
      throw new UnauthorizedException({
        message: 'email or password is incorrect',
      });
    const token = {
      access_token: this.jwt.sign({ sub: user.id, role: user.role }),
    };
    return token;
  }

  async validate(token: string): Promise<false | UserEntity> {
    try {
      const { sub } = this.jwt.verify(token);
      return await this.userRepo.findOneBy({ id: sub });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  }
}
