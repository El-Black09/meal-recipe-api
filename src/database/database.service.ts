import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { ENV } from 'src/config/env';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  private readonly logger: Logger = new Logger(DatabaseService.name);

  constructor() {
    const pool = new Pool({ connectionString: ENV.DATABASE_URL });
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
