import { Body, Controller, Post } from '@nestjs/common';
import { SaveMailDto } from './dto/save-mail.dto';
import { MailService } from './mail.service';

@Controller('/mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Post()
  async save(@Body() body: SaveMailDto) {
    return this.mailService.save(body);
  }
}
