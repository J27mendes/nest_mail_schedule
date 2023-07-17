/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
// /* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import { MailService } from '../mail.service';
// import { MailStatusEnum } from '../enum/mail-status.enum';
// import { SendgridService } from 'src/app/sendgrid/service/sendgrid.service';
// import { MailDataRequired } from '@sendgrid/mail';

// @Injectable()
// export class MailCron {
//   constructor(private readonly mailService: MailService, private readonly sendGridService: SendgridService){}
//   @Cron(CronExpression.EVERY_10_SECONDS)
//   //https://crontab.guru/
//    async handler() {
//     const mailList = await this.mailService.findAll({ dueDateLte: new Date().toISOString(), status: MailStatusEnum.WAITING});
//     console.log('~handeler ~mailList', mailList);

//     for (const mail of mailList){
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const data: MailDataRequired = {
//       to: 'jessemendesudemy@gmail.com',
//       from: mail.email,
//       subject: `Informações do Pedido - ${mail.tamanho}`,
//       html: `<p>Nome Completo: ${mail.nomeCompleto}</p>
//              <p>Data de Entrega: ${mail.dataEntrega}</p>
//              <p>Mensagem Recebida: ${mail.body}</p>`
//     };
//   }

//   // const data: SaveMailDto = {
//   //   nomeCompleto: 'nome completo',
//   //   email: 'ateliemariquefaz@gmail.com',
//   //   telefone: '81 98588-9888',
//   //   dataEntrega: '2022=05-01T12:00:00Z',
//   //   body: '<p>mensagem recebida</p>',
//   //   tamanho: '20',
//   //   status: 'ok',
//   // };

//     await this.sendGridService.create(data)
//     return null;
//   }
// }


// import { Injectable, Logger } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import { MailService } from '../mail.service';
// import { MailStatusEnum } from '../enum/mail-status.enum';
// import { SendgridService } from '../../sendgrid/service/sendgrid.service';
// import { MailDataRequired } from '@sendgrid/mail';

// @Injectable()
// export class MailCron {
//   private logger = new Logger(MailCron.name)
//   constructor(
//     private readonly mailService: MailService,
//     private readonly sendGridService: SendgridService
//   ) {}

//   @Cron(CronExpression.EVERY_10_MINUTES)
//   async handler() {
//     const mailList = await this.mailService.findAll({
//       dueDateLte: new Date().toISOString(),
//       status: MailStatusEnum.WAITING
//     });
//     // console.log('~handler ~mailList', mailList);

//     for (const mail of mailList) {
//       const data: MailDataRequired = {
//         to: 'ateliemariquefaz@gmail.com',
//         from: mail.email,
//         subject: `Informações do Pedido - ${mail.body}`,
//         html: `<p>Nome Completo: ${mail.nomeCompleto}</p>
//                <p>Data de Entrega: ${mail.dataEntrega}</p>
//                <p>Tamanho: ${mail.tamanho}</p>`
//       };

//       await this.sendGridService.create(data);
//       await this.mailService.updateStatus(mail.id, MailStatusEnum.SENT);
//       this.logger.log('e-mail enviado com sucesso');
//     }
//      return null;
//   }
// }

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailService } from '../mail.service';
import { MailStatusEnum } from '../enum/mail-status.enum';
import { SendgridService } from '../../sendgrid/service/sendgrid.service';
import { MailDataRequired } from '@sendgrid/mail';

@Injectable()
export class MailCron {
  private logger = new Logger(MailCron.name);

  constructor(
    private readonly mailService: MailService,
    private readonly sendGridService: SendgridService,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handler(): Promise<void> {
    try {
      const mailList = await this.mailService.findAll({
        dueDateLte: new Date().toISOString(),
        status: MailStatusEnum.WAITING,
      });

      for (const mail of mailList) {
        const data: MailDataRequired = {
          to: 'ateliemariquefaz@gmail.com',
          from: mail.email,
          subject: `Informações do Pedido - ${mail.body}`,
          html: `<p>Nome Completo: ${mail.nome}</p>
               <p>Data de Entrega: ${mail.entrega}</p>
               <p>Tamanho: ${mail.tamanho}</p>`,
        };

        await this.sendGridService.create(data);
        await this.mailService.updateStatus(mail.id, MailStatusEnum.SENT);
        this.logger.log('E-mail enviado com sucesso');
      }
    } catch (error) {
      this.logger.error('Ocorreu um erro ao processar os e-mails pendentes', error);
      // Lógica adicional de tratamento de erro, se necessário
    }
  }
}

