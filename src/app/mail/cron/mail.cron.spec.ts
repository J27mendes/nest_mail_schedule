/* eslint-disable prettier/prettier */
import { MailService } from '../mail.service';
import { MailCron } from './mail.cron';
import { Test, TestingModule } from '@nestjs/testing';
import { SendgridService }  from '../../sendgrid/service/sendgrid.service';
import { MailEntity } from '../mail.entity';

describe('mailCron', () => {
  let mailCron: MailCron;
  let mailService: MailService;
  let sendGridService: SendgridService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailCron,
        {
          provide: MailService,
          useValue: {
            findAll: jest.fn(),
            updateStatus: jest.fn(),
          },
        },
        {
          provide: SendgridService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    mailCron = module.get<MailCron>(MailCron);
    mailService = module.get<MailService>(MailService);
    sendGridService = module.get<SendgridService>(SendgridService);
  });

  it('should be defined', () => {
    expect(mailCron).toBeDefined();
    expect(mailService).toBeDefined();
    expect(sendGridService).toBeDefined();
  });

  describe('handler', () => {
    it('should send mail every 10 seconds', async () => {
      //Arrange
      const mailEntityMockList = [
        {id: '1', entrega: '2022-04-01T12:00:00Z'},
        {id: '2', entrega: '2022-04-01T12:00:00Z'},
      ] as MailEntity[];
      jest.spyOn(mailService, 'findAll').mockResolvedValueOnce(mailEntityMockList);
      jest.spyOn(sendGridService, 'create').mockResolvedValueOnce();
      jest.spyOn(mailService, 'updateStatus').mockResolvedValueOnce();
      //Act
      const result = await mailCron.handler();
      //Assert
      expect(result).toBeUndefined();
      expect(mailService.findAll).toBeCalledTimes(1);
      expect(sendGridService.create).toBeCalledTimes(2);
      expect(mailService.updateStatus).toBeCalledTimes(2);
    })
  })
});


