import { DynamicModule, Module } from '@nestjs/common';
import { PlaceOrderController } from './controller';
import { PlaceOrderService } from './service';
import { TableModule } from '../table/module';
import { MenuModule } from '../menu/module';
import { MenuItemModule } from '../menuItem/module';
import { ItemModule } from '../item/module';
import { OrderMenuItemModule } from '../orderMenuItem/module';
import { OrderModule } from '../order/module';
import { OrderMenuModule } from '../orderMenu/module';

@Module({})
export class PlaceOrderModule {
  static register(): DynamicModule {
    return {
      module: PlaceOrderModule,
      imports: [
        TableModule.register(),
        MenuModule.register(),
        MenuItemModule.register(),
        ItemModule.register(),
        OrderModule.register(),
        OrderMenuModule.register(),
        OrderMenuItemModule.register(),
      ],
      controllers: [PlaceOrderController],
      providers: [PlaceOrderService],
    };
  }
}
