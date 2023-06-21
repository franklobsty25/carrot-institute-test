import { Injectable } from '@nestjs/common';
import * as argon2  from 'argon2';

@Injectable()
export class HelperService {
    static async hash(str: string): Promise<string> {
        return await argon2.hash(str);
    }

    static async verify(raw: string, hash: string): Promise<boolean> {
        return await argon2.verify(hash, raw);
    }
}
