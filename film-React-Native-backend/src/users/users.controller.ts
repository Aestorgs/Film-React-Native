import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUsersDto, UpdateUsersDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { AccessTokenGuard } from '../auth/common/guard/accessToken.guard';
//Importe un Request module du express package.
import { Request } from 'express';

// users controller pour utiliser les routes
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // cette route pour ajouter un l'utilisateur
  @Post('register')
  @UsePipes(ValidationPipe)
  postUsers(@Body() createUserDto: CreateUsersDto) {
    return this.usersService.createUsers(createUserDto);
  }

  // cette route pour afficher utilisateur avec c'est favoris
  @UseGuards(AccessTokenGuard)
  @Get('favoris')
  getUsersFavoris(@Req() req: Request) {
    //Je récupèrent l' authorizationen-tête de la requête entrante et lèvent un UnauthorizedExceptionsi l'en-tête est manquant.
    //Si l'en-tête est présent, le jeton en est extrait en divisant la chaîne au niveau du caractère espace et en prenant la deuxième partie.
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException(
        `Vous n'êtes pas autorisé à accéder à cette ressource.`,
      );
    }
    const token = authHeader.split(' ')[1];
    //J'appelle une méthode appelée findByFavorisId sur une instance de la usersService classe, en passant les paramètres token et req
    //Le findByFavorisIdprocédé récupère vrai semblablement des informations sur le compte d'utilisateur authentifié sur la base du jeton d'authentification et renvoie les données users.
    return this.usersService.findByFavorisId(token, req);
  }

  //Je définissent une nouvelle route pour qui CompteController gérera les requêtes POST vers le chemin d'URL de base défini dans le décorateur du contrôleur ( /users dans ce cas).
  // Le @UseGuards décorateur est utilisé pour spécifier que la route doit être gardée par le AccessTokenGuard.
  // Le @Put décorateur est utilisé pour spécifier que la route doit gérer les requêtes PUT.
  // Le @UsePipes décorateur est utilisé pour spécifier que les données de requête entrantes doivent être validées à l'aide de l'extension ValidationPipe.
  @UseGuards(AccessTokenGuard)
  @Put()
  @UsePipes(ValidationPipe)
  putUsers(@Body() updateUsersDto: UpdateUsersDto, @Req() req: Request) {
    //Je récupèrent l' authorizationen-tête de la requête entrante et lèvent un UnauthorizedExceptionsi l'en-tête est manquant.
    //Si l'en-tête est présent, le jeton en est extrait en divisant la chaîne au niveau du caractère espace et en prenant la deuxième partie.
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException(
        `Vous n'êtes pas autorisé à accéder à cette ressource.`,
      );
    }
    const token = authHeader.split(' ')[1];

    // J'appelle une méthode appelée updateusers sur une instance de la usersService classe, en passant les paramètres token, updateCompteDto et . req
    //Le updateCompte procédé met vrai semblablement à jour un compte compte existant sur la base des informations contenues dans le DTO et le jeton d'authentification, et renvoie les données cusers mises à jour.
    return this.usersService.updateUsers(token, updateUsersDto, req);
  }

  //Je définissent une nouvelle route pour qui CompteController gérera les requêtes POST vers le chemin d'URL de base défini dans le décorateur du contrôleur ( /users dans ce cas).
  // Le @UseGuards décorateur est utilisé pour spécifier que la route doit être gardée par le AccessTokenGuard.
  // Le @Get décorateur est utilisé pour spécifier que la route doit gérer les requêtes GET.
  // Le @UsePipes décorateur est utilisé pour spécifier que les données de requête entrantes doivent être validées à l'aide de l'extension ValidationPipe.
  @UseGuards(AccessTokenGuard)
  @Get()
  @UsePipes(ValidationPipe)
  getUsers(@Req() req: Request) {
    //Je récupèrent l' authorizationen-tête de la requête entrante et lèvent un UnauthorizedExceptionsi l'en-tête est manquant.
    //Si l'en-tête est présent, le jeton en est extrait en divisant la chaîne au niveau du caractère espace et en prenant la deuxième partie.
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException(
        `Vous n'êtes pas autorisé à accéder à cette ressource.`,
      );
    }
    const token = authHeader.split(' ')[1];
    //J'appelle une méthode appelée findoneCompte sur une instance de la usersService classe, en passant les paramètres token et req
    //Le findoneCompte procédé récupère vrai semblablement des informations sur le diplome d'utilisateur authentifié sur la base du jeton d'authentification et renvoie les données users.
    return this.usersService.findoneUsers(token, req);
  }

  //Je définissent une nouvelle route pour qui UsersController gérera les requêtes POST vers le chemin d'URL de base défini dans le décorateur du contrôleur ( /users dans ce cas).
  // Le @UseGuards décorateur est utilisé pour spécifier que la route doit être gardée par le AccessTokenGuard.
  // Le @Delete décorateur est utilisé pour spécifier que la route doit gérer les requêtes DELETE.
  // Le @UsePipes décorateur est utilisé pour spécifier que les données de requête entrantes doivent être validées à l'aide de l'extension ValidationPipe.
  @UseGuards(AccessTokenGuard)
  @Delete()
  DeleteUsers(@Req() req: Request) {
    //Je récupèrent l' authorizationen-tête de la requête entrante et lèvent un UnauthorizedExceptionsi l'en-tête est manquant.
    //Si l'en-tête est présent, le jeton en est extrait en divisant la chaîne au niveau du caractère espace et en prenant la deuxième partie.
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException(
        `Vous n'êtes pas autorisé à accéder à cette ressource.`,
      );
    }
    const token = authHeader.split(' ')[1];

    //J'appelle une méthode appelée deleteCompte sur une instance de la compteService classe, en passant les paramètres token et req
    //le deleteCompte récupère et supprime le compte authentifié en fonction du jeton d'authentification et renvoie les données du users .
    return this.usersService.deleteUsers(token, req);
  }
}
