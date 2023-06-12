import { HttpService } from '@nestjs/axios/dist';
import { HttpStatus, Injectable } from '@nestjs/common';
import { SendEmailInterface } from '../interface/send-email,interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SendgridService {
  private readonly SENDGRID_API_URL = process.env.SENDGRID_API_URL;
  private readonly SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  // create(body: SendEmailInterface) {
  //   throw new Error('Method not implemented.');
  // }
  constructor(private readonly httpService: HttpService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: SendEmailInterface): Promise<boolean> {
    const url = `${this.SENDGRID_API_URL}/mail/send`;
    const config = {
      headers: {
        Authorization: `Bearer ${this.SENDGRID_API_KEY}`,
      },
    };
    const response = await lastValueFrom(this.httpService.post(url, data, config));
    console.log(response.data);
    console.log(response.status);
    return response.status === HttpStatus.ACCEPTED;
  }
}
