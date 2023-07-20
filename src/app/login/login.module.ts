import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { loginEntity } from './login.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([loginEntity])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
