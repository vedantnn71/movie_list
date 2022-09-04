import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { MoviesModule } from './movies/movies.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PrismaModule,
    MoviesModule,
    StorageModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class AppModule {}
