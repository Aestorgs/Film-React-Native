import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entety';
import { Repository } from 'typeorm';
import { CreateUsersDto, UpdateUsersDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/auth/strategies/accessToken.strategy';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Favoris } from 'src/entities/favoris.entity';

// users service pour crée les fonctions
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly users: Repository<Users>,
    private readonly jwtService: JwtService,
    @InjectRepository(Favoris)
    private readonly favoris: Repository<Favoris>,
  ) {}

  // cette fonction pour crée un utilisateur
  async createUsers(createUserDto: CreateUsersDto) {
    const users = this.users.create(createUserDto);
    users.password = await bcrypt.hash(users.password, 10);
    return this.users.save(users);
  }

  // Ce code est une méthode asynchrone pour mettre à jour un users avec les informations fournies dans l'objet updateUsersDto,
  // pour cela, elle prend en paramètres updateUsersDto, req, et token
  async updateUsers(
    // Chaîne de caractères représentant le token JWT utilisé pour authentifier la demande
    token: string,
    // Objet contenant les informations à utiliser pour mettre à jour le compte
    updateUsersDto: UpdateUsersDto,
    // Objet contenant les informations sur la requête HTTP
    req: Request,
  ) {
    // Récupération de l'en-tête d'autorisation dans la requête HTTP
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

    // Recherche du users correspondant à l'ID
    const users = await this.users.findOne({ where: { id } });

    // Vérification si le users existe
    if (!users) {
      throw new NotFoundException(`Le compte avec l'ID ${id} n'existe pas.`);
    }

    // Vérification si l'ID du users correspond à l'ID de l'utilisateur dans le token JWT
    if (decodedToken.sub !== users.id) {
      throw new UnauthorizedException(
        `Vous n'êtes pas autorisé à accéder à cette ressource.`,
      );
    }
    //si la propriété "password" de l'objet "updateUsersDto" est définie et non nulle.
    if (updateUsersDto.password) {
      //Si la propriété "password" est définie, cette ligne utilise la fonction "hash" fournie par le module "bcrypt" pour hasher le mot de passe fourni dans l'objet "updateCompteDto". Cette fonction prend deux arguments : le premier est la chaîne de caractères à hasher, et le deuxième est le nombre de tours de calcul à effectuer pour renforcer la sécurité de la fonction de hachage. Le résultat du hash est stocké dans la propriété "password" de l'objet "updateCompteDto".
      updateUsersDto.password = await bcrypt.hash(updateUsersDto.password, 10);
    }

    // Mettre à jour le users dans la base de données
    return await this.users.update(id, updateUsersDto);
  }

  // cette fonction pour afficher un utilisateur et c'est favoris
  async findByFavorisId(token: string, req: Request) {
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

    // Recherche du user correspondant à l'ID
    const users = await this.users.findOne({ where: { id } });

    // Vérification si le user existe
    if (!users) {
      throw new NotFoundException(`Le compte avec l'ID ${id} n'existe pas.`);
    }

    // Vérification si l'ID du user correspond à l'ID de l'utilisateur dans le token JWT
    if (decodedToken.sub !== users.id) {
      throw new UnauthorizedException(
        `Vous n'êtes pas autorisé à accéder à cette ressource.`,
      );
    }

    return this.users.findOne({
      relations: { favoris: true },
      where: { id },
    });
  }

  // Ce code est une méthode asynchrone pour rechercher un compte de utilisateur pour cela, elle prend en paramètres req, et token.
  async findoneUsers(
    // Chaîne de caractères représentant le token JWT utilisé pour authentifier la demande
    token: string,
    // Objet contenant les informations sur la requête HTTP
    req: Request,
  ) {
    // Récupération de l'en-tête d'autorisation dans la requête HTTP
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

    // Recherche du users correspondant à l'ID
    const users = await this.users.findOne({ where: { id } });

    // Vérification si le compte existe
    if (!users) {
      throw new NotFoundException(`Le compte avec l'ID ${id} n'existe pas.`);
    }

    // Vérification si l'ID du compte correspond à l'ID de l'utilisateur dans le token JWT
    if (decodedToken.sub !== users.id) {
      throw new UnauthorizedException(
        `Vous n'êtes pas autorisé à accéder à cette ressource.`,
      );
    }
    // Recherche un users qui conresponds à l'ID
    return this.users.findOne({
      where: { id },
    });
  }

  // Ce code est une méthode asynchrone deleteCompte permet de supprimer tout les données du users.
  async deleteUsers(
    // Chaîne de caractères représentant le token JWT utilisé pour authentifier la demande
    token: string,
    // Objet contenant les informations sur la requête HTTP
    req: Request,
  ) {
    // Récupération de l'en-tête d'autorisation dans la requête HTTP
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
    const usersId = decodedToken.sub;

    // Recherche du compte correspondant à l'ID
    const users = await this.users.findOne({ where: { id: usersId } });

    // Vérification si le users existe
    if (!users) {
      throw new NotFoundException(
        `Le compte avec l'ID ${usersId} n'existe pas.`,
      );
    }

    // Vérification si l'ID du compte correspond à l'ID de l'utilisateur dans le token JWT
    if (decodedToken.sub !== usersId) {
      throw new UnauthorizedException(
        `Vous n'êtes pas autorisé à accéder à cette ressource.`,
      );
    }

    // Je recherche toutes les favoris associées au compte spécifié en utilisant la méthode "find" du service "favoris".
    const favoris = await this.favoris.find({ where: { users: users } });
    // si la variable "favoris" existe. Si elle existe, le code continue à s'exécuter.
    if (favoris) {
      //une boucle "for", qui va parcourir tous les éléments de la variable "favoris" à l'aide d'un favoris "i".
      for (let i = 0; i < favoris.length; i++) {
        // Je utilise la méthode "remove" de la classe "favoris", qui va supprimer l'élément de diplôme correspondant à "favoris[i]".
        await this.favoris.remove(favoris[i]);
      }
    }

    // Je utilise la méthode "remove" de la classe "users", qui va supprimer l'élément de users correspondant à "users".
    await this.users.remove(users);

    // Je retourne une chaîne de caractères qui indique que le users ayant l'identifiant "compteId" a été supprimé, ainsi que toutes les entrées liées.
    return (
      "Le compte avec l'ID " +
      usersId +
      ' a été supprimé, ainsi que toutes les entrées liées.'
    );
  }
}
