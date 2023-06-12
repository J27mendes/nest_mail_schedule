import { HttpService } from '@nestjs/axios/dist/http.service';
import { Test, TestingModule } from '@nestjs/testing';
import { SendgridService } from './sendgrid.service';
import { SendEmailInterface } from '../interface/send-email,interface';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

describe('SendgridService', () => {
  let sendGridservice: SendgridService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendgridService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    sendGridservice = module.get<SendgridService>(SendgridService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(sendGridservice).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('create', () => {
    it('should send an email with success', async () => {
      // Arrange
      const data: SendEmailInterface = {
        personalizations: [
          {
            from: {
              name: 'Jesse',
              email: 'mendez27junder@gmail.com',
            },
            to: [
              {
                name: 'Cliente',
                email: 'mendes_j27@hotmail.com',
              },
            ],
          },
        ],
        reply_to: {
          email: 'jessemendesudemy@gmail.com',
          name: 'Jesse',
        },
        subject: 'Sua fatura chegou!',
        content: [
          {
            type: 'text/html',
            value: '<p>Sua fatura chegou!</p>',
          },
        ],
        from: {
          name: 'Jesse',
          email: 'mendez27junder@gmail.com',
        },
      };
      jest.spyOn(httpService, 'post').mockReturnValueOnce(
        of<AxiosResponse<unknown, any>>({
          status: 202,
          statusText: 'ACCEPTED',
          config: { headers: {} as any },
          headers: {},
          data: '',
        })
      );
      // jest
      //   .spyOn(httpService, 'post')
      //   .mockReturnValueOnce(of<any>({ status: 202, statusText: 'ACCEPTED', config: {}, headers: {}, data: '' }));
      //Act
      const result = await sendGridservice.create(data);
      expect(result).toBeTruthy();
      expect(httpService.post).toBeCalledTimes(1);
    });
  });
});
