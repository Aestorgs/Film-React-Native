// Import le Injectable décorateur du @nestjs/common module. Injectable est utilisé pour définir une classe qui peut être utilisée comme fournisseur, ce qui signifie qu'elle peut être injectée dans d'autres classes via l'injection de dépendances.
import { Injectable } from '@nestjs/common';
// Import la AuthGuardclasse du @nestjs/passportmodule. AuthGuardest un module NestJS qui fournit un moyen simple de protéger les routes à l'aide de diverses stratégies d'authentification.
import { AuthGuard } from '@nestjs/passport';

// Marque AccessTokenGuardclasse en tant que fournisseur injectable, ce qui signifie qu'elle peut être utilisée avec l'injection de dépendance dans d'autres classes.
@Injectable()
// Je définit la AccessTokenGuard classe, qui étend la AuthGuardclasse et spécifie la 'jwt'stratégie d'authentification.
// Cela signifie que toute route qui utilise cette protection nécessitera un jeton Web JSON (JWT) valide dans l'en-tête de la demande pour l'authentification.
// Si le jeton n'est pas présent ou invalide, l'utilisateur ne sera pas autorisé à accéder à la ressource protégée.
export class AccessTokenGuard extends AuthGuard('jwt') {}
