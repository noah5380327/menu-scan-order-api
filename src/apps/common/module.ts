import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule, TokenModule, MainModule } from 'src/bases';
import { CommonController } from './controller';
import { CommonService } from './service';
import { UserModule } from '../user/module';
import { TableModule } from '../table/module';
import { StaffModule } from '../staff/module';

@Module({
  imports: [
    MainModule.register({}),
    RedisModule.register({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB),
    }),
    TokenModule.register({
      secret: process.env.TOKEN_SECRET,
    }),
    TypeOrmModule.forRoot({
      // @ts-ignore
      type: process.env.SQL_TYPE,
      host: process.env.SQL_HOST,
      port: parseInt(process.env.SQL_PORT),
      username: process.env.SQL_USERNAME,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE,
      autoLoadEntities: true,
      synchronize: Boolean(process.env.SQL_SYNCHRONIZE),
      logging: Boolean(process.env.SQL_LOG),
    }),
    UserModule.register(),
    TableModule.register(),
    StaffModule.register(),
  ],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
