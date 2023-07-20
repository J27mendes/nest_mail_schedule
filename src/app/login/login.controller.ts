import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { saveLoginDto } from './dto/save-login.dto';

@Controller('/users')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  async save(@Body() body: saveLoginDto) {
    return this.loginService.save(body);
  }
}
