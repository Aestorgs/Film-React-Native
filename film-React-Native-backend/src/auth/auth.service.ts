// Import de la classe Injectable pour définir la classe comme un service injectable
import { Injectable } from '@nestjs/common';
// Import de la classe NotFoundException pour renvoyer une exception lorsque l'utilisateur demandé n'est pas trouvé
import { BadRequestException } from '@nestjs/common';
//Import du service NestJS JwtService pour la gestion des tokens JWT
import { JwtService } from '@nestjs/jwt';
//Import le module bcrypt ce module permet de sécuriser des mots de passe en les cryptant via des fonctions de hachage.
import * as bcrypt from 'bcrypt';
//Import du décorateur InjectRepository pour injecter les dépôts dans le constructeur
import { InjectRepository } from '@nestjs/typeorm';
//Import du type Repository pour la communication avec la base de données
import { Repository } from 'typeorm';
//Import de l'entité Compte pour la communication avec la base de données
import { Users } from 'src/entities/users.entety';
//Import la constante "jwtConstants" depuis le module "./constants". Cela signifie que le code dans le fichier "./constants.js" exporte un objet nommé "jwtConstants" qui peut être utilisé dans le fichier actuel.
import { jwtConstants } from './constants';

// Définit la classe comme un service injectable par NestJS
@Injectable()
// Définition de la classe AuthService
export class AuthService {
  // Ce code définit un constructeur pour une classe. Le constructeur prend en paramètres plusieurs services et un dépôt.
  constructor(
    // Injection du dépôt Compte pour la communication avec la base de données
    @InjectRepository(Users)
    private readonly users: Repository<Users>,
    // Injection du service JWT pour la gestion des tokens JWT
    private jwtService: JwtService,
  ) {}

  // Ce code semble être une fonction asynchrone qui prend deux paramètres d'entrée: email et password, qui représentent les identifiants d'un compte utilisateur. Cette fonction est chargée de vérifier si les informations d'identification sont valides ou non.
  async loginUsers(email: string, password: string): Promise<object> {
    // Je rechercher un compte utilisateur en utilisant l'adresse e-mail fournie. Il utilise l'objet compte pour appeler la méthode findOne() et spécifie les champs à sélectionner à l'aide de l'option select. La clause where est utilisée pour spécifier la condition de recherche qui correspond à l'adresse e-mail du compte.
    const user = await this.users.findOne({
      select: ['id', 'password'],
      where: { email },
    });
    //Si le mot de passe fourni correspond au mot de passe stocké pour le compte utilisateur. Cela est fait en utilisant la méthode compare() de la bibliothèque bcrypt, qui compare le mot de passe en clair avec le mot de passe chiffré stocké dans la base de données.
    //Si les mots de passe correspondent, la fonction appelle la méthode getTokens() pour récupérer les tokens d'authentification du compte utilisateur.
    //Ces tokens sont retournés en tant qu'objet JSON contenant le token d'accès et l'identifiant du compte.
    //Si le mot de passe fourni ne correspond pas au mot de passe stocké pour le compte utilisateur, la fonction lance une exception BadRequestException avec un message d'erreur "erreur email or password" et un objet d'erreur contenant la cause de l'erreur.
    if (await bcrypt.compare(password, user.password)) {
      const tokens = await this.getTokens(user.id);
      return {
        token: tokens.accessToken,
        users: user.id,
      };
    } else
      throw new BadRequestException('erreur email or password', {
        cause: new Error(),
      });
  }
  // Ce code semble être une fonction asynchrone qui prend un paramètre id pour renvoyer un objet JSON contenant un jeton d'accès.
  async getTokens(id: number) {
    // La Promise.all méthode est utilisée pour exécuter la signAsync méthode de manière asynchrone et attendre le résultat avant de renvoyer le jeton d'accès en tant qu'objet JSON avec une seule propriété, accessToken.
    const [accessToken] = await Promise.all([
      // Je utilise la signAsync méthode de l' jwtService objet pour générer un JWT (jeton Web JSON) en utilisant comme idrevendication "sous" (sujet) du jeton.
      // La signAsync méthode prend deux arguments : un objet représentant la charge utile JWT et un objet d'options avec deux propriétés : secret, qui est une chaîne représentant la clé secrète utilisée pour signer le JWT, et expiresIn, qui est une chaîne représentant le temps après lequel le JWT expirer.
      this.jwtService.signAsync(
        {
          sub: id,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: '1 days',
        },
      ),
    ]);

    return {
      accessToken,
    };
  }
}
