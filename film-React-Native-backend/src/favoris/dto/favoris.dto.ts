import { IsNotEmpty } from 'class-validator';
import { Users } from '../../entities/users.entety';
import { Column } from 'typeorm';

// favoris dto pour donnez des conditions au utilisateur
export class CreateFavorisDto {
  @IsNotEmpty()
  @Column()
  showsId: number;

  @IsNotEmpty()
  users: Users;
}
