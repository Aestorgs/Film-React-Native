import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Users } from './users.entety';

// pour crée la table favoris et crée les colonnes
@Entity('favoris')
export class Favoris {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  showsId: number;

  @ManyToOne(() => Users, (users) => users.id)
  users: Users;
}
