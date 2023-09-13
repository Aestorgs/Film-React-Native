//Importe divers modules et dépendances NestJS, notamment Body, Controller, Post , HttpCode @nestjs/commonpackage.
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
//Importe un AuthService module depuis un fichier nommé utilisateur.service situé dans le même répertoire que le fichier courant.
import { AuthService } from './auth.service';

//Ce AuthController ce @Controller décorateur @Controller décorateur 'auth' passé
@Controller('auth')
export class AuthController {
  // Ce Auth Controller avec authService AuthService classe private readonly mots clés
  constructor(private readonly authService: AuthService) {}

  // La méthode est décorée avec l'annotation @Post('connecter'), ce qui signifie que la méthode sera exécutée lorsque l'API recevra une requête POST à l'URL /connecter.
  // La méthode est également décorée avec @HttpCode(200), qui définit le code HTTP de la réponse retournée par la méthode à 200.
  // La méthode prend un objet compte en entrée, qui est envoyé dans le corps de la requête POST. La méthode appelle ensuite la méthode loginCompte de authService avec les propriétés email et password de l'objet compte en tant que paramètres.
  // En fin de compte, la méthode renvoie la valeur retournée par authService.loginCompte.
  @Post('login')
  @HttpCode(200)
  loginCompte(@Body() user: any) {
    return this.authService.loginUsers(user.email, user.password);
  }
}
