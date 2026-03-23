import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FavoriteDto } from 'src/dto/favorites.dto';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({ summary: 'Add a recipe to favorites' })
  @Post('add')
  async addFavorite(@Body() payload: FavoriteDto) {
    return this.favoritesService.addFavorite(payload);
  }

  @ApiOperation({
    summary: 'Delete a favorite recipe by user ID and recipe ID',
  })
  @Delete('delete/:userId/:recipeId')
  async deleteFavorite(
    @Param('userId') userId: string,
    @Param('recipeId', ParseIntPipe) recipeId: number,
  ) {
    return this.favoritesService.deleteFavorite(userId, recipeId);
  }

  @ApiOperation({ summary: 'Get all favorite recipes by user ID' })
  @Get('user/:userId')
  async getAllFavoritesByUserId(@Param('userId') userId: string) {
    return this.favoritesService.getAllFavoritesByUserId(userId);
  }

  @ApiOperation({ summary: 'Get a favorite recipe by user ID and recipe ID' })
  @Get('getOne/:userId/:recipeId')
  async getOneFavorite(
    @Param('userId') userId: string,
    @Param('recipeId', ParseIntPipe) recipeId: number,
  ) {
    return this.favoritesService.getOneFavorite(userId, recipeId);
  }
}
