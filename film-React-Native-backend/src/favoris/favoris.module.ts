import { Module } from '@nestjs/common';
import { FavorisService } from './favoris.service';
import { FavorisController } from './favoris.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favoris } from '../entities/favoris.entity';
import { Users } from 'src/entities/users.entety';
import { JwtService } from '@nestjs/jwt';

// favoris module pour utiliser les controllers crée
@Module({
  imports: [
    TypeOrmModule.forFeature([Favoris]),
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [FavorisController],
  providers: [FavorisService, JwtService],
})
export class FavorisModule {}
