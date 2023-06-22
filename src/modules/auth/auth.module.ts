import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { USER } from 'src/common/constants/schemas';
import { UserSchema } from '../user/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/common/config/configuration';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER, schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: configuration().jwt.secret,
        signOptions: { expiresIn: configuration().jwt.expiresIn },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
