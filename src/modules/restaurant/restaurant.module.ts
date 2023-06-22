import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RESTAURANT, USER } from 'src/common/constants/schemas';
import { RestaurantSchema } from './schema/restaurant.schema';
import { UserSchema } from '../user/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RESTAURANT, schema: RestaurantSchema },
      { name: USER, schema: UserSchema },
    ]),
  ],
  providers: [RestaurantService],
  controllers: [RestaurantController],
  exports: [RestaurantService],
})
export class RestaurantModule {}
