import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
