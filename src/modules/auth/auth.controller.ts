import {
  Body,
  Controller,
  Res,
  Post,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDTO } from '../user/dto';
import { ResponseService } from 'src/common/helpers/response.service';
import { LoginDTO } from './dto';
import { CurrentUser } from '../user/decoretors/current-user.decorator';
import { UserDocument } from '../user/schema/user.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Authenticated user' })
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOkResponse({ description: 'User found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
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

  @ApiOperation({ summary: 'Sign up as a user' })
  @ApiResponse({ status: 201, description: 'Signup successful' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ type: CreateUserDTO })
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

  @ApiOperation({ summary: 'Login with credentials' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post('login')
  async login(@Res() res: Response, @Body() loginDTO: LoginDTO): Promise<any> {
    try {
      const data = await this.authService.login(loginDTO);

      ResponseService.json(res, HttpStatus.OK, 'User login successful', data);
    } catch (error) {
      ResponseService.json(res, error);
    }
  }
}
