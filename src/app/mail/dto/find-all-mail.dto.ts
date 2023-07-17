/* eslint-disable prettier/prettier */

import { MailStatusEnum } from '../enum/mail-status.enum';
/* eslint-disable prettier/prettier */
export class FindAllMailDto {
  dueDateLte: string;
  status: MailStatusEnum;
}
