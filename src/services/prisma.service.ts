import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { FavoriteCreateInput } from 'generated/prisma/models';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PrismaService {
  private readonly logger: Logger = new Logger(PrismaService.name);
  constructor(private readonly prisma: DatabaseService) {}

  async createFavorite(data: FavoriteCreateInput) {
    try {
      return await this.prisma.favorite.create({ data });
    } catch (error) {
      this.logger.error(
        'Prisma error for creating new favorite',
        error.message,
      );
      throw error;
    }
  }

  async deleteFavorite(id: number) {
    try {
      return await this.prisma.favorite.delete({ where: { id } });
    } catch (error) {
      this.logger.error('Prisma error for deleting favorite', error.message);
      throw error;
    }
  }

  async getFavorite(id: number) {
    try {
      return await this.prisma.favorite.findUnique({ where: { id } });
    } catch (error) {
      this.logger.error('Prisma error for retrieving favorite', error.message);
      throw error;
    }
  }

  async getAllFavorites() {
    try {
        const favorites = await this.prisma.favorite.findMany();
        
        this.logger.log(`Retrieved ${favorites.length} favorites from the database`);
        
        return favorites;
    } catch (error) {
      this.logger.error(
        'Prisma error for retrieving all favorites',
        error.message,
      );
      throw error;
    }
  }
}
