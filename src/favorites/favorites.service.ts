import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { FavoriteDto } from 'src/dto/favorites.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class FavoritesService {
  private readonly logger: Logger = new Logger(FavoritesService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async addFavorite(payload: FavoriteDto) {
    try {
      return await this.prismaService.createFavorite(payload);
    } catch (error) {
      this.logger.error('Error adding favorite', error.message);
      throw error;
    }
  }

  async deleteFavorite(userId: string, recipeId: number) {
    try {
      return await this.prismaService.deleteFavorite(userId, recipeId);
    } catch (error) {
      this.logger.error('Error deleting favorite', error.message);
      throw error;
    }
  }

  async getOneFavorite(userId: string, recipeId: number) {
    try {
      const favorite = await this.prismaService.getOneFavorite(
        userId,
        recipeId,
      );
      if (!favorite) {
        this.logger.warn(
          `Favorite not found for userId: ${userId} and recipeId: ${recipeId}`,
        );
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: `Favorite not found for the given userId (${userId}) and recipeId (${recipeId}).`,
        };
      }

      return favorite;
    } catch (error) {
      this.logger.error('Error retrieving favorite', error.message);
      throw error;
    }
  }

  async getAllFavoritesByUserId(userId: string) {
    try {
      return await this.prismaService.getAllFavoritesByUserId(userId);
    } catch (error) {
      this.logger.error('Error retrieving favorites by userId', error.message);
      throw error;
    }
  }
}
