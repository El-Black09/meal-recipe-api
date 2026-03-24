import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PrismaService {
  private readonly logger: Logger = new Logger(PrismaService.name);
  constructor(private readonly prisma: DatabaseService) {}

  async createFavorite(data: Prisma.FavoriteCreateInput) {
    try {
      const existingFavorite = await this.getOneFavorite(
        data.userId,
        data.recipeId,
      );

      const { userId, recipeId, title, image, cookTime, servings } = data;

      if (!userId || !recipeId || !title) {
        this.logger.warn(
          `Invalid payload for creating favorite: ${JSON.stringify(data)}`,
        );
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            'Invalid payload. Please provide userId, recipeId, and title.',
        };
      }

      if (existingFavorite) {
        this.logger.warn(
          `Attempted to create duplicate favorite for userId: ${data.userId} and recipeId: ${data.recipeId}`,
        );
        return {
          statusCode: HttpStatus.CONFLICT,
          message: `Favorite already exists for the given userId (${data.userId}) and recipeId (${data.recipeId}).`,
        };
      }

      await this.prisma.favorite.create({ data });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Favorite added successfully!',
      };
    } catch (error) {
      this.logger.error(
        'Prisma error for creating new favorite',
        error.message,
      );
      throw error;
    }
  }

  async deleteFavorite(userId: string, recipeId: number) {
    try {
      const existingFavorite = await this.getOneFavorite(userId, recipeId);

      if (!existingFavorite) {
        this.logger.warn(
          `Attempted to delete non-existent favorite for userId: ${userId} and recipeId: ${recipeId}`,
        );
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: `Favorite not found for the given userId (${userId}) and recipeId (${recipeId}).`,
        };
      }

      await this.prisma.favorite.delete({
        where: {
          userId_recipeId: {
            userId,
            recipeId,
          },
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Favorite deleted successfully!',
      };
    } catch (error) {
      this.logger.error('Prisma error for deleting favorite', error.message);
      throw error;
    }
  }

  async getOneFavorite(userId: string, recipeId: number) {
    try {
      return await this.prisma.favorite.findUnique({
        where: {
          userId_recipeId: {
            userId,
            recipeId,
          },
        },
      });
    } catch (error) {
      this.logger.error('Prisma error for retrieving favorite', error.message);
      throw error;
    }
  }

  async getAllFavoritesByUserId(userId: string) {
    try {
      const favorites = await this.prisma.favorite.findMany({
        where: {
          userId: userId,
        },
      });

      if (favorites.length === 0) {
        this.logger.warn(`No favorites found for userId: ${userId}`);
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: `No favorites found for the given userId (${userId}).`,
        };
      }

      return {
        statusCode: HttpStatus.OK,
        data: favorites,
      };
    } catch (error) {
      this.logger.error(
        'Prisma error for retrieving favorites by userId',
        error.message,
      );
      throw error;
    }
  }
}
