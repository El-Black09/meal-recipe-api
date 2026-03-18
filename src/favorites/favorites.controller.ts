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

  @ApiOperation({ summary: 'Delete a favorite recipe by ID' })
  @Delete('delete/:id')
  async deleteFavorite(@Param('id', ParseIntPipe) id: number) {
    return this.favoritesService.deleteFavorite(id);
  }

  @ApiOperation({ summary: 'Get all favorite recipes' })
  @Get('all')
  async getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @ApiOperation({ summary: 'Get a favorite recipe by ID' })
  @Get(':id')
  async getFavorite(@Param('id', ParseIntPipe) id: number) {
    return this.favoritesService.getFavorite(id);
  }
}
