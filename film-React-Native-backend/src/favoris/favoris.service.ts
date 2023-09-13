import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favoris } from '../entities/favoris.entity';
import { Repository } from 'typeorm';
import { CreateFavorisDto } from './dto/favoris.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/strategies/accessToken.strategy';
//Import du type Request pour obtenir les informations de la requête HTTP
import { Request } from 'express';
import { Users } from 'src/entities/users.entety';

// favoris service pour crée les fonctions
@Injectable()
export class FavorisService {
  constructor(
    @InjectRepository(Favoris) private readonly favoris: Repository<Favoris>,
    private readonly jwtService: JwtService,
    @InjectRepository(Users)
    private readonly users: Repository<Users>,
  ) {}

  // cette fonction pour crée un favoris
  async createFavoris(
    createFavorisDto: CreateFavorisDto,
    req: Request,
    // Chaîne de caractères représentant le token JWT utilisé pour authentifier la demande
    token: string,
  ) {
    const authHeader = req.headers.authorization;

    // Vérification si l'en-tête d'autorisation est présent
    if (!authHeader) {
      throw new UnauthorizedException(
        `Vous n'êtes pas autorisé à accéder à cette ressource.`,
      );
    }
    // Décodage du token JWT
    const decodedToken = this.jwtService.decode(token) as JwtPayload;

    // Récupération de l'ID de l'utilisateur à partir du token
    const id = decodedToken.sub;

    // Vérification si le user existe
    const users = await this.users.findOne({ where: { id } });
    if (!users) {
      throw new NotFoundException(`Le compte avec l'ID ${id} n'existe pas.`);
    }
    // Vérification si l'ID du compte correspond à l'ID de l'utilisateur dans le token JWT
    if (decodedToken.sub !== users.id) {
      throw new UnauthorizedException(
        `Vous n'êtes pas autorisé à accéder à cette ressource.`,
      );
    }

    const favoris = this.favoris.create(createFavorisDto);
    return this.favoris.save(favoris);
  }

  // cette fonction pour suprimer un film
  async deleteFavoris(
    // Chaîne de caractères représentant le token JWT utilisé pour authentifier la demande
    token: string,
    // Nombre  représentant le showId
    showsId: number,
    // Objet contenant les informations sur la requête HTTP
    req: Request,
  ) {
    const authHeader = req.headers.authorization;

    // Vérification si l'en-tête d'autorisation est présent
    if (!authHeader) {
      throw new UnauthorizedException(
        `Vous n'êtes pas autorisé à accéder à cette ressource.`,
      );
    }

    // Décodage du token JWT
    const decodedToken = this.jwtService.decode(token) as JwtPayload;

    // Récupération de l'ID de l'utilisateur à partir du token
    const id = decodedToken.sub;

    // Recherche du compte correspondant à l'ID
    const user = await this.users.findOne({ where: { id } });

    // Vérification si le compte existe
    if (!user) {
      throw new NotFoundException(`Le compte avec l'ID ${id} n'existe pas.`);
    }

    const favoris = await this.favoris.findOne({
      where: { id: showsId, users: user },
    });

    //Si le diplôme n'existe pas pour ce compte, une erreur est levée.
    if (!favoris) {
      throw new NotFoundException(
        `Le show avec l'ID ${showsId} n'existe pas pour ce compte.`,
      );
    }
    // Ce code supprime favoris objet de la base de données.
    await this.favoris.remove(favoris);

    //et renvoie un message de réussite incluant le showsId paramètre.
    return "L'élément avec l'ID " + showsId + ' le show a été supprimé.';
  }
}
