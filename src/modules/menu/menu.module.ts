import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuSchema } from './schema/menu.schema';
import { MENU } from 'src/common/constants/schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: MENU, schema: MenuSchema }])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
