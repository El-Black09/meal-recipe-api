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
      const { userId, recipeId, title, image, cookTime, servings } = payload;

      if (!userId || !recipeId || !title) {
        throw new BadRequestException();
      }

      await this.prismaService.createFavorite(payload);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Favorite added successfully!',
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        this.logger.error('Invalid payload for adding favorite', error.message);
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            'Invalid payload. Please provide userId, recipeId, and title.',
        };
      } else {
        this.logger.error('Error adding favorite', error.message);
        throw error;
      }
    }
  }

  async getFavorite(id: number) {
    try {
      const favorite = await this.prismaService.getFavorite(id);

      if (!favorite) {
        throw new BadRequestException(`Favorite with id ${id} not found`);
      }
      return favorite;
    } catch (error) {
      if (error instanceof BadRequestException) {
        this.logger.error('Favorite not found', error.message);
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: `Favorite with id ${id} not found`,
        };
      }
      this.logger.error('Error retrieving favorite', error.message);
      throw error;
    }
  }

  async deleteFavorite(id: number) {
    try {
      const favorite = await this.prismaService.getFavorite(id);

      if (!favorite) {
        throw new BadRequestException(`Favorite with id ${id} not found`);
      }

      await this.prismaService.deleteFavorite(id);

      return {
        statusCode: HttpStatus.OK,
        message: `Favorite with id ${id} deleted successfully`,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        this.logger.error('Favorite not found', error.message);
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: `Favorite with id ${id} not found`,
        };
      }
      this.logger.error('Error deleting favorite', error.message);
      throw error;
    }
  }

  async getAllFavorites() {
    try {
      const favorites = await this.prismaService.getAllFavorites();

      if (!favorites || favorites.length === 0) {
        return {
          statusCode: HttpStatus.OK,
          message: 'No favorites found',
          data: [],
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Favorites retrieved successfully',
        data: favorites,
      };
    } catch (error) {
      this.logger.error('Error retrieving all favorites', error.message);
      throw error;
    }
  }
}
