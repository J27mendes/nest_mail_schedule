import { Body, Controller, Get, Post } from '@nestjs/common';
import { SendgridService } from './service/sendgrid.service';
import { MailDataRequired } from '@sendgrid/mail';

@Controller('sendgrid')
export class SendgridController {
  constructor(private readonly sendgridService: SendgridService) {}

  @Post()
  async create(@Body() data: MailDataRequired): Promise<string> {
    const emailData = {
      to: data.to,
      from: data.from,
      subject: data.subject,
      text: data.text,
    };
    await this.sendgridService.create(emailData);

    return 'Formulario correto';
  }

  @Get()
  findAll(): string {
    return 'Formulario localizado';
  }
}
