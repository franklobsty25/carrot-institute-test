import { Body, Controller, Res, Post, HttpStatus, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDTO } from '../user/dto';
import { ResponseService } from 'src/common/helpers/response.service';
import { LoginDTO } from './dto';
import { CurrentUser } from '../user/decoretors/current-user.decorator';
import { UserDocument } from '../user/schema/user.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async currentUser(
    @Res() res: Response,
    @CurrentUser() user: UserDocument,
  ): Promise<void> {
    try {
      ResponseService.json(res, HttpStatus.OK, 'Login user', user);
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @Post('signup')
  async signup(
    @Res() res: Response,
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<any> {
    try {
      const data = await this.authService.signup(createUserDTO);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'User account created successfully',
        data,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @Post('login')
  async login(@Res() res: Response, @Body() loginDTO: LoginDTO): Promise<any> {
    try {
      const data = await this.authService.login(loginDTO);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'User login successful',
        data,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }
}
