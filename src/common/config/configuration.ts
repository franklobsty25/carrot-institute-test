enum Environment {
  Production = 'production',
  Development = 'development',
}

export interface Configuration {
  env: Environment;
  port: number;
  database: { url: string };
  jwt: { secret: string; expiresIn: string | number };
  isDev(): boolean;
  isProd(): boolean;
}

export default (): Configuration => ({
  env: process.env.NODE_ENV as Environment,
  port: parseInt(process.env.PORT),
  database: { url: process.env.DATABASE_URL },
  jwt: { secret: process.env.JWT_SECRET, expiresIn: process.env.EXPIRES_IN },
  isDev(): boolean {
    return process.env.NODE_EN === 'development';
  },
  isProd(): boolean {
    return process.env.NODE_ENV === 'production';
  },
});
