import { Injectable } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getFileName(file: Express.Multer.File) {
    const { filename, path } = file;

    return { filename, path };
  }
}
