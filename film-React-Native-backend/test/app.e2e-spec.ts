import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

// app e2e est de tester chaque route si ca fonctione
describe('API endpoints testing (e2e)', () => {
  let app: INestApplication;
  let users: number;
  let token: string;
  let favorisId: number;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableShutdownHooks();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('App', () => {
    it('Post /Register a New User', async () => {
      const res = await request(app.getHttpServer())
        .post('/users/register')
        .send({
          firstname: 'jean',
          lastname: 'jaques',
          email: 'jean.jaques@gmail.com',
          password: 'jean35480',
        });
      try {
        expect(res.status).toBe(201);
      } catch (err) {
        console.log(err);
      }
    });

    it('Post /Connecter a User', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'jean.jaques@gmail.com', password: 'jean35480' });
      expect(res.status).toBe(200);
      try {
        expect(res.body).toHaveProperty('users');
        expect(res.body).toHaveProperty('token');
        users = res.body.users;
        token = res.body.token;
      } catch (err) {
        console.log(err);
      }
    });

    it('Get /users ', async () => {
      const res = await request(app.getHttpServer())
        .get(`/users`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('Get /users/favoris ', async () => {
      const res = await request(app.getHttpServer())
        .get(`/users/favoris`)
        .set('Authorization', `Bearer ${token}`);
      res.body.favoris.forEach((favoris) => {
        favorisId = favoris.id;
        expect(favorisId).toBeDefined();
      });
    });

    it('Put /users ', async () => {
      const res = await request(app.getHttpServer())
        .put(`/users/`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstname: 'jean',
          lastname: 'jaques',
          email: 'jaque@gmail.com',
          password: 'jean35480',
        });
      try {
        expect(res.status).toBe(200);
      } catch (err) {
        console.log(err);
      }
    });

    it('Delete /users ', async () => {
      const res = await request(app.getHttpServer())
        .delete(`/users`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('Post /favoris/show a New User', async () => {
      const res = await request(app.getHttpServer())
        .post('/favoris/shows')
        .set('Authorization', `Bearer ${token}`)
        .send({
          showsId: 34653,
          users: users,
        });
      try {
        expect(res.status).toBe(201);
      } catch (err) {
        console.log(err);
      }
    });

    it('Delete /favoris ', async () => {
      const res = await request(app.getHttpServer())
        .delete(`/favoris/shows/${favorisId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });
});
