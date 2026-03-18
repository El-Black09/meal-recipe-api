import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  private readonly logger: Logger = new Logger(DatabaseService.name);

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error(
        'DATABASE_URL is not defined. Add it to your environment variables or .env file.',
      );
    }

    const pool = new Pool({ connectionString: databaseUrl });
    const adapter = new PrismaPg(pool);

    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Connexion à la base de données établie avec succès');
    } catch (error) {
      this.logger.error(
        'Erreur lors de la connexion à la base de données',
        error,
      );
    }
  }
}
