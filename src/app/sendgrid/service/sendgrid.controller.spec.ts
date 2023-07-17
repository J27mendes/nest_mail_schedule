import { Test, TestingModule } from '@nestjs/testing';
import { SendgridController } from '../sendgrid.controller';
import { SendgridService } from './sendgrid.service';
import { SendgridModule } from '../sendgrid.module';

describe('SendgridController', () => {
  let controller: SendgridController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SendgridModule],
      controllers: [SendgridController],
      providers: [SendgridService],
    }).compile();

    controller = module.get<SendgridController>(SendgridController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
