// Importation de la classe Module depuis le module common de NestJS
import { Module } from '@nestjs/common';
// Importation des classes AuthService et AuthController depuis leurs fichiers respectifs dans le même répertoire
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
//Importation deux éléments du module @nestjs/jwt. Le premier élément importé est JwtModule, qui est probablement utilisé pour configurer le module d'authentification JWT (JSON Web Token) dans une application NestJS.
import { JwtModule } from '@nestjs/jwt';
//Importation de AccessTokenStrategy, qui est probablement une stratégie d'authentification personnalisée utilisée dans l'application pour vérifier la validité des jetons d'accès JWT.
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
//Importation l'entité Compte depuis son fichier dans le répertoire
import { Users } from '../entities/users.entety';
//Importation le TypeOrmModule du module NestJS
import { TypeOrmModule } from '@nestjs/typeorm';

//Est un décorateur qui ajoute des métadonnées à la classe AuthModule
@Module({
  //Importation et configure TypeOrmModule et MailjetModule avec leurs configurations respectives
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([Users])],
  //Je précise que la classe AuthController est un contrôleur au sein de ce module controllers
  controllers: [AuthController],
  //Je précise que les classes AuthService et AccessTokenStrategy sont des fournisseurs au sein de ce module fournisseurs
  providers: [AuthService, AccessTokenStrategy],
})
//Exporte la classe AuthModule
export class AuthModule {}
