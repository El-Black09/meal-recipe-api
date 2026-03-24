import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CronJobService {
  private readonly logger = new Logger(CronJobService.name);

  constructor(private readonly httpService: HttpService) {}

  @Cron('*/14 * * * *')
  async handleCron() {
    try {
      if (process.env.NODE_ENV === 'production') {
        await lastValueFrom(
          this.httpService.get(`${process.env.API_URL}/api/health`),
        );
        this.logger.log('Cron job executed successfully. Request sent to API.');
      } else {
        return;
      }
    } catch (error) {
      this.logger.error('Error executing cron job', error);
    }
  }
}
