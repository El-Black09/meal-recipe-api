import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from './database/database.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobService } from './services/cron-job/cron-job.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    HttpModule,
    DatabaseModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService, CronJobService],
})
export class AppModule {}
