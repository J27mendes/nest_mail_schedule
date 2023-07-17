import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailEntity } from './mail.entity';
import { MailController } from './mail.controller';
import { MailCron } from './cron/mail.cron';
import { SendgridModule } from '../sendgrid/sendgrid.module';

@Module({
  imports: [TypeOrmModule.forFeature([MailEntity]), SendgridModule],
  providers: [MailService, MailCron],
  controllers: [MailController],
})
export class MailModule {}
