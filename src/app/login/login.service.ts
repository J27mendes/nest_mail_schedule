import { Injectable } from '@nestjs/common';
import { loginEntity } from './login.entity';
import { saveLoginDto } from './dto/save-login.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(loginEntity)
    private readonly loginRepository: Repository<loginEntity>
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async save(data: saveLoginDto): Promise<loginEntity> {
    return this.loginRepository.save(this.loginRepository.create(data));
  }
}
