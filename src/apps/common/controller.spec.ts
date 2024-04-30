import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule, TokenModule } from 'src/bases';
import { CommonController } from './controller';
import { CommonService } from './service';
import { UserModule } from '../user/module';

describe('CommonController', () => {
  let commonController: CommonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RedisModule.register({
          host: 'localhost',
          port: 6379,
          password: '',
          db: 0,
        }),
        TokenModule.register({}),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'menu_scan_order',
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
        }),
        UserModule.register(),
      ],
      controllers: [CommonController],
      providers: [CommonService],
    }).compile();

    commonController = module.get<CommonController>(CommonController);
  });

  describe('get', () => {
    it(`should has return value`, () => {
      expect(commonController.get()).toBeDefined();
    });
  });
});
