//Import les dépendances nécessaires à l'implémentation de AccessTokenStrategy.
//Il inclut le Injectabledécorateur et PassportStrategy la classe du @nestjs/passport module,
//les classes ExtractJwt et Strategy du passport-jwtmodule, et un jwtConstantsobjet d'un fichier situé dans ../constants.
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

// Je définit un type TypeScript JwtPayload, qui est un objet contenant une subpropriété de type number.
// Ce type sera utilisé pour représenter la charge utile d'un JWT.
export type JwtPayload = {
  sub: number;
};

// Ce code définit une nouvelle AccessTokenStrategy classe et la marque comme un fournisseur injectable.
// Il étend la PassportStrategy classe et spécifie qu'elle utilise la 'jwt'stratégie d'authentification.
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  // Je définit un constructeur pour AccessTokenStrategyet transmet un objet options au PassportStrategyconstructeur parent.
  // Cet objet d'options inclut jwtFromRequest, qui spécifie comment extraire le JWT de la requête (dans ce cas, à partir de l' Authorizationen-tête en tant que jeton porteur), et secretOrKey, qui spécifie la clé secrète à utiliser pour vérifier la signature JWT (dans ce cas, le secret la clé est obtenue à partir de l' jwtConstants objet).
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  // Je définit une validate méthode pour AccessTokenStrategy, qui prend un JwtPayload objet en entrée et renvoie la subpropriété de la charge utile.
  // Cette méthode sera appelée par NestJS pour valider le JWT et extraire sa charge utile lorsque le AccessTokenStrategyest utilisé pour protéger une route.
  validate(payload: JwtPayload) {
    return payload.sub;
  }
}
