// import { Body, Controller, Get, Post } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { SendgridService } from './service/sendgrid.service';

@Controller('sendgrid')
export class SendgridController {
  constructor(private readonly sendgridService: SendgridService) {}
  // sendgridService: SendEmailInterface;
  // @Post()
  // sendEmail(@Body() body: SendEmailInterface) {
  //   return this.sendgridService.create(body);
  // }

  @Post()
  async create(@Body() body): Promise<boolean> {
    console.log(body);
    console.log(body.from);
    return await this.sendgridService.create(body);
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
