import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
import { UpdateUserDto } from '../src/user/dto';
import * as FormData from 'form-data-lite';
import * as pactum from 'pactum';
import * as fs from 'fs';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(() => {
    jest.setTimeout(10000);
  });

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

    pactum.request.setBaseUrl('http://localhost:8080');
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'example@gmail.com',
      password: 'a_example1',
    };

    describe('/auth/signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: 'a_example1',
          })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: 'example@gmail.com',
          })
          .expectStatus(400);
      });

      it('should throw if body empty', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('/auth/login', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            password: 'a_example1',
          })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: 'example@gmail.com',
          })
          .expectStatus(400);
      });

      it('should throw if body empty', () => {
        return pactum.spec().post('/auth/login').expectStatus(400);
      });

      it('should login', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
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
      });
    });

    describe('/user [PATCH]', () => {
      it('should update the current user', () => {
        const dto: UpdateUserDto = {
          name: 'Vedant Nandwana',
          password: 'a_example2',
        };

        return pactum
          .spec()
          .patch('/user')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.name);
      });
    });
  });

  describe('Movie', () => {
    const movieDto = {
      title: 'The founder',
      description: 'The founder is a movie about the founder of McDonalds',
      releasedAt: '1662223306425',
      watched: 'true',
      rating: '4.6',
      genre: 'Entrepreneurship',
      trailer: 'https://www.youtube.com/watch?v=AX2uz2XYkbo',
    };

    const img = __dirname + '/assets/the-founder.jpg';

    describe('/movies/add', () => {
      const data = new FormData();

      data.append("thumbnail", fs.readFileSync(img), { filename: "the-founder.jpg" });
      data.append("title", movieDto.title);
      data.append("description", movieDto.description);
      data.append("releasedAt", movieDto.releasedAt);
      data.append("rating", movieDto.rating);
      data.append("watched", movieDto.watched);
      data.append("genre", movieDto.genre);
      data.append("trailer", movieDto.trailer);

      it('should add the movie', () => {
        return pactum
          .spec()
          .post('/movies/add')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withMultiPartFormData(data)
          .expectStatus(201)
          .expectBodyContains(movieDto.title)
          .stores('movieId', 'id')
      });

      it('should throw if body empty', () => {
        return pactum
          .spec()
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .post('/movies/add')
          .expectStatus(400);
      });

      it('should throw if file empty', () => {
        const data = new FormData();

        data.append("title", movieDto.title);
        data.append("description", movieDto.description);
        data.append("releasedAt", movieDto.releasedAt);
        data.append("rating", movieDto.rating);
        data.append("watched", movieDto.watched);
        data.append("genre", movieDto.genre);

        return pactum
          .spec()
          .post('/movies/add')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withMultiPartFormData(data)
          .expectStatus(400)
      });

      it('should throw if title and description empty', () => {
        const data = new FormData()

        data.append("thumbnail", fs.readFileSync(img), { filename: "the-founder.jpg" });
        data.append("releasedAt", movieDto.releasedAt);
        data.append("rating", movieDto.rating);
        data.append("watched", movieDto.watched);
        data.append("genre", movieDto.genre);

        return pactum
          .spec()
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .post('/movies/add')
          .withMultiPartFormData(data)
          .expectStatus(400);
      });
    });

    describe('/movies/:id GET', () => {
      it('should get the movie', () => {
        return pactum
          .spec()
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .get('/movies/{id}')
          .withPathParams('id', '$S{movieId}')
          .withBody(movieDto)
          .expectStatus(200)
          .expectBodyContains(movieDto.title)
          .expectBodyContains(movieDto.description)
          .expectBodyContains(movieDto.watched)
          .expectBodyContains(movieDto.rating)
          .expectBodyContains(movieDto.genre)
          .expectBodyContains(movieDto.trailer);
      });
    })

    describe('/movies/ GET', () => {
      it('should get all the movies', () => {
        return pactum
          .spec()
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .get('/movies/')
          .withBody(movieDto)
          .expectStatus(200)
          .expectBodyContains(movieDto.title)
          .expectBodyContains(movieDto.description)
          .expectBodyContains(movieDto.watched)
          .expectBodyContains(movieDto.rating)
          .expectBodyContains(movieDto.genre)
          .expectBodyContains(movieDto.trailer);
      });
    })

    describe('/movies/:id PATCH', () => {
      it('should update the movie', () => {
        const dto = {
          title: 'The founder - how macdonalds was found',
          description:
            'The founder is an amazing movie about the founder of McDonalds',
          watched: 'false',
          rating: '5.0',
          genre: 'Business',
          releasedAt: '1662223306425',
          trailer: 'https://www.youtube.com/watch?v=oprJX5BomEc',
        };

        const data = new FormData();

        data.append("thumbnail", fs.readFileSync(img), { filename: "the-founder.jpg" });
        data.append("title", dto.title);
        data.append("description", dto.description);
        data.append("rating", dto.rating);
        data.append("genre", dto.genre);
        data.append("watched", dto.watched);
        data.append("releasedAt", dto.releasedAt);
        data.append("trailer", dto.trailer);

        return pactum
          .spec()
          .patch('/movies/{id}')
          .withPathParams('id', '$S{movieId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withMultiPartFormData(data)
          .expectStatus(200)
          .inspect()
          .expectBodyContains(dto.title)
          .expectBodyContains(dto.description)
          .expectBodyContains(dto.watched)
          .expectBodyContains(+dto.rating)
          .expectBodyContains(new Date(+dto.releasedAt))
          .expectBodyContains(dto.genre)
          .expectBodyContains(dto.trailer);
      });

      it('should throw if body empty', () => {
        return pactum
          .spec()
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .patch('/movies/{id}')
          .withPathParams('id', '$S{movieId}')
          .expectStatus(400);
      });
    });

    describe('/movies/:id DELETE', () => {
      it('should delete the movie', () => {
        return pactum
          .spec()
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .delete('/movies/{id}')
          .withPathParams('id', '$S{movieId}')
          .expectStatus(200);
      });

      it('should throw if id invalid', () => {
        return pactum
          .spec()
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .delete('/movies/{id}')
          .withPathParams('id', 'asdjsakdj')
          .expectStatus(403);
      });
    });
  });

  afterAll(() => {
    app.close();
  });
});
