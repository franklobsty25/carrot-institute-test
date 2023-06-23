import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongoosePopulate from 'mongoose-autopopulate';
import * as mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { MenuModule } from './modules/menu/menu.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { TableModule } from './modules/table/table.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    UserModule,
    MenuModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRoot(configuration().database.url, {
      connectionFactory: (connection) => {
        connection.plugin(mongoosePaginate);
        connection.plugin(mongoosePopulate);
        connection.plugin(mongooseAggregatePaginate);

        return connection;
      },
    }),
    AuthModule,
    RestaurantModule,
    TableModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
