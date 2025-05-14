import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NameAnalysisModule } from './name-analysis/name-analysis.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    HttpModule,
    NameAnalysisModule,
    LocationModule,
  ],
})
export class AppModule {} 