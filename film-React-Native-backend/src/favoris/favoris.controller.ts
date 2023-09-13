import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FavorisService } from './favoris.service';
import { CreateFavorisDto } from './dto/favoris.dto';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/common/guard/accessToken.guard';

// favoris controller pour utiliser les routes
@Controller('favoris')
export class FavorisController {
  constructor(private readonly favorisService: FavorisService) {}

  // cette route pour ajouter un film en favoris
  @UseGuards(AccessTokenGuard)
  @Post('shows')
  @UsePipes(ValidationPipe)
  postFavoris(@Body() createFavorisDto: CreateFavorisDto, @Req() req: Request) {
    //Je récupèrent l' authorizationen-tête de la requête entrante et lèvent un UnauthorizedExceptionsi l'en-tête est manquant.
    // Si l'en-tête est présent, le jeton en est extrait en divisant la chaîne au niveau du caractère espace et en prenant la deuxième partie.
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException(
        `Vous n'êtes pas autorisé à accéder à cette ressource.`,
      );
    }
    const token = authHeader.split(' ')[1];
    //J'appelle une méthode appelée createActiviter sur une instance de la favorisService classe, en passant les paramètres CreateFavorisDto , req et token
    //La  CreateFavorisDto méthode crée vrai semblablement une nouvelle favoris favrois basé sur les informations contenues dans le DTO et le jeton d'authentification,
    //Et renvoie les données activiter créées.
    return this.favorisService.createFavoris(createFavorisDto, req, token);
  }

  @UseGuards(AccessTokenGuard)
  // cette route pour suprimer un film en favoris
  @Delete('shows/:id')
  getDeleteFavoris(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException(
        `Vous n'êtes pas autorisé à accéder à cette ressource.`,
      );
    }
    const token = authHeader.split(' ')[1];
    //J'appelle une méthode appelée deleteFavoris sur une instance de la favorisService classe, en passant les paramètres token et req
    //le deleteFavoris récupère et supprime le favoris de favoris authentifié en fonction du jeton d'authentification et renvoie les données du favoris.
    return this.favorisService.deleteFavoris(token, id, req);
  }
}
