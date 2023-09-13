import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/users.entety';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { Favoris } from 'src/entities/favoris.entity';

// users module pour utiliser les controllers crée
@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Favoris]),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UsersModule {}
