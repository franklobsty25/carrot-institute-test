import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AppService {
  getUrl(req: Request): string {
    return `Food delivery platform api baseurl: ${req.protocol}://${req.get('host')}`;
  }

  getFileName(file: Express.Multer.File) {
    const { filename, path } = file;

    return { filename, path };
  }
}
