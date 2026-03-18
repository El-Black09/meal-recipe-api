import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FavoriteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "L'identifiant de l'utilisateur connecté",
    example: 'user-12345',
    required: true,
  })
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "L'identifiant de la recette à ajouter aux favoris",
    example: 123,
    required: true,
  })
  recipeId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Le titre de la recette à ajouter aux favoris',
    example: 'Spaghetti Carbonara',
    required: true,
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "L'URL de l'image de la recette à ajouter aux favoris",
    example: 'https://example.com/spaghetti-carbonara.jpg',
  })
  image: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Le temps de cuisson de la recette à ajouter aux favoris',
    example: '30 minutes',
  })
  cookTime: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Le nombre de portions de la recette à ajouter aux favoris',
    example: '4',
  })
  servings: string;
}
