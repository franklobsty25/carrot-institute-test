import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongoosePopulate from 'mongoose-autopopulate';
import * as mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRoot(configuration().database.url, {
      connectionFactory: (connection) => {
        connection.plugin(mongoosePaginate);
        connection.plugin(mongoosePopulate);
        connection.plugin(mongooseAggregatePaginate);

        return connection;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
