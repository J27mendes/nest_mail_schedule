import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class SendgridService {
  private readonly SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  constructor() {
    sgMail.setApiKey(this.SENDGRID_API_KEY);
  }
  async create(data: sgMail.MailDataRequired): Promise<void> {
    await sgMail.send(data);
  }
}
