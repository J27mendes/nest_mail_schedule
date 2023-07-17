import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailEntity } from './mail.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveMailDto } from './dto/save-mail.dto';
import { FindAllMailDto } from './dto/find-all-mail.dto';
import { MailStatusEnum } from './enum/mail-status.enum';

describe('MailService', () => {
  let mailService: MailService;
  let mailRepository: Repository<MailEntity>;
  const getMany = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: getRepositoryToken(MailEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnThis(),
            andWhere: jest.fn(),
            getMany,
            findOneOrFail: jest.fn(),
            merge: jest.fn(),
          },
        },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
    mailRepository = module.get<Repository<MailEntity>>(getRepositoryToken(MailEntity));
  });

  afterEach(() => {
    getMany.mockRestore();
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
    expect(mailRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a mail list with sucess', async () => {
      //Arrange
      const MailEntityMockList = [
        { id: '1', entregantrega: '2022-04-01T12:00:00Z' },
        { id: '2', entrega: '2022-04-01T12:00:00Z' },
      ] as MailEntity[];
      getMany.mockResolvedValueOnce(MailEntityMockList);
      //Act
      const result = await mailService.findAll();
      //Assert
      expect(result).toHaveLength(2);
    });

    it('should return a filtered mail list with dueDateLte', async () => {
      const MailEntityMockList = [{ id: '2', entrega: '2022-04-01T12:00:00Z' }] as MailEntity[];
      const params: Partial<FindAllMailDto> = { dueDateLte: '2022-04-01T12:00:00Z' };
      getMany.mockResolvedValueOnce(MailEntityMockList);
      const result = await mailService.findAll(params);
      expect(result).toHaveLength(1);
    });

    it('should return a filtered mail list with WAITING status', async () => {
      const MailEntityMockList = [{ id: '1', entrega: '2022-04-01T12:00:00Z' }] as MailEntity[];
      const params: Partial<FindAllMailDto> = { status: MailStatusEnum.WAITING };
      getMany.mockResolvedValueOnce(MailEntityMockList);
      const result = await mailService.findAll(params);
      expect(result).toHaveLength(1);
    });
  });
  describe('save', () => {
    it('should save a new mail with succes', async () => {
      //Arrange
      const data: SaveMailDto = {
        nome: 'nome completo',
        email: 'ateliemariquefaz@gmail.com',
        telefone: '81 98588-9888',
        entrega: '2022=05-01T12:00:00Z',
        body: '<p>mensagem recebida</p>',
        tamanho: '20',
        status: 'ok',
      };
      const mailEntityMock = {
        nome: 'nome completo',
        email: 'ateliemariquefaz@gmail.com',
        telefone: '81 98588-9888',
        entrega: '2022=05-01T12:00:00Z',
        body: '<p>mensagem recebida</p>',
        tamanho: '20',
        status: 'ok',
      } as MailEntity;
      jest.spyOn(mailRepository, 'create').mockReturnValueOnce(mailEntityMock);
      jest.spyOn(mailRepository, 'save').mockResolvedValueOnce(mailEntityMock);
      //Act
      const result = await mailService.save(data);
      //Assert
      expect(result).toBeDefined();
      expect(mailRepository.create).toBeCalledTimes(1);
      expect(mailRepository.save).toBeCalledTimes(1);
    });
  });
  describe('updateStatus', () => {
    it('should update mail status with sucess', async () => {
      //Arrange
      const id = '1';
      //Act
      const result = await mailService.updateStatus(id, MailStatusEnum.SENT);
      //ASSERT
      expect(result).toBeUndefined();
    });
  });
});
