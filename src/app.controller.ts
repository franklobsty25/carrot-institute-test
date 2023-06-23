import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseService } from './common/helpers/response.service';
import { Response, Express, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { FileUploadDTO } from './modules/auth/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('')
  @ApiOperation({ summary: 'Base url' })
  @ApiOkResponse({description: 'api base url'})
  @Get()
  index(@Req() req: Request, @Res() res: Response) {
    const url = this.appService.getUrl(req);
    res.send(url);
  }

  @ApiTags('Upload')
  @ApiOperation({ summary: 'Image upload' })
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOkResponse({ description: 'Uploaded successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDTO, description: 'File upload' })
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const data = this.appService.getFileName(file);

      ResponseService.json(res, HttpStatus.OK, 'Uploaded image name', data);
    } catch (error) {
      ResponseService.json(res, error);
    }
  }
}
