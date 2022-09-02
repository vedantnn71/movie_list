import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
import * as pactum from 'pactum';
import { UpdateUserDto } from '../src/user/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(8080);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();

    pactum.request.setBaseUrl('http://localhost:8080')
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: "example@gmail.com",
      password: "a_example1",
    }

    describe('/auth/signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: "a_example1",
          })
          .expectStatus(400);
      })

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: "example@gmail.com",
          })
          .expectStatus(400);
      })

      it('should throw if body empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(400);
      })

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      })
    });

    describe('/auth/login', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            password: "a_example1",
          })
          .expectStatus(400);
      })

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: "example@gmail.com",
          })
          .expectStatus(400);
      })

      it('should throw if body empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .expectStatus(400);
      })

      it('should login', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      })
    });
  });

  describe('User', () => {
    describe('/user [GET]', () => {
      it('should get the current user', () => {
        return pactum
          .spec()
          .get('/user')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200);
      })
    });

    describe('/user [PATCH]', () => {
      it('should update the current user', () => {
        const dto: UpdateUserDto = {
          name: "Vedant Nandwana",
          password: "a_example2",
        };

        return pactum
          .spec()
          .patch('/user')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto).inspect()
          .expectStatus(200)
          .expectBodyContains(dto.name);
      });
    })
  });

  describe('Movie', () => {
    describe('/movies', () => { });

    describe('/movies/:id', () => { });

    describe('/movies/add', () => { });

    describe('/movies/edit', () => { });

    describe('/movies/delete', () => { });
  });

  afterAll(() => {
    app.close();
  });
});
