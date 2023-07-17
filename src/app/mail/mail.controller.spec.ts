// import { Test, TestingModule } from '@nestjs/testing';
// import { MailController } from './mail.controller';
// import { MailService } from '@sendgrid/mail';
// import { SaveMailDto } from './dto/save-mail.dto';

// describe('MailController', () => {
//   let controller: MailController;
//   let mailService: MailService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [MailController],
//       providers: [
//         {
//           provide: MailService,
//           useValue: {
//             save: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     controller = module.get<MailController>(MailController);
//     mailService = module.get<MailService>(MailService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//     expect(mailService).toBeDefined();
//   });

//   describe('save', () => {
//     it('should save a new mail with sucess', async () => {
//       //Arrange
//       const body: SaveMailDto = {
//         nomeCompleto: 'nome completo',
//         email: 'ateliemariquefaz@gmail.com',
//         telefone: '81 98588-9888',
//         dataEntrega: '2022=05-01T12:00:00Z',
//         body: '<p>mensagem recebida</p>',
//         tamanho: '20',
//         status: 'ok',
//       };
//       //Act
//       const result = await controller.save(body);
//       //Assert
//       expect(result).toBeDefined();
//       expect(mailService.save).toBeCalledTimes(1);
//     });
//   });
// });

// import { Test, TestingModule } from '@nestjs/testing';
// import { MailController } from './mail.controller';
// import { MailService } from '@sendgrid/mail';
// import { SaveMailDto } from './dto/save-mail.dto';

// describe('MailController', () => {
//   let controller: MailController;
//   let mailService: MailService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [MailController],
//       providers: [
//         {
//           provide: MailService,
//           useValue: {
//             save: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     controller = module.get<MailController>(MailController);
//     mailService = module.get<MailService>(MailService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//     expect(mailService).toBeDefined();
//   });

//   describe('save', () => {
//     it('should save a new mail successfully', async () => {
//       // Arrange
//       const body: SaveMailDto = {
//         nomeCompleto: 'nome completo',
//         email: 'ateliemariquefaz@gmail.com',
//         telefone: '81 98588-9888',
//         dataEntrega: '2022-05-01T12:00:00Z',
//         body: '<p>mensagem recebida</p>',
//         tamanho: '20',
//         status: 'ok',
//       };

//       // Act
//       const result = await controller.save(body);

//       // Assert
//       expect(result).toBeDefined();
//       expect(mailService.save).toBeCalledTimes(1);
//     });
//   });
// });
import { Test, TestingModule } from '@nestjs/testing';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { SaveMailDto } from './dto/save-mail.dto';

describe('MailController', () => {
  let controller: MailController;
  let mailService: MailService;

  const mailServiceMock = {
    save: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [MailService],
    })
      .overrideProvider(MailService)
      .useValue(mailServiceMock)
      .compile();

    controller = module.get<MailController>(MailController);
    mailService = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(mailService).toBeDefined();
  });

  describe('save', () => {
    it('should save a new mail successfully', async () => {
      // Arrange
      const body: SaveMailDto = {
        nome: 'nome completo',
        email: 'ateliemariquefaz@gmail.com',
        telefone: '81 98588-9888',
        entrega: '2022-05-01T12:00:00Z',
        body: '<p>mensagem recebida</p>',
        tamanho: '20',
        status: 'ok',
      };

      // Act
      const result = await controller.save(body);

      // Assert
      expect(result).toBeDefined();
      expect(mailServiceMock.save).toBeCalledTimes(1);
    });
  });
});
