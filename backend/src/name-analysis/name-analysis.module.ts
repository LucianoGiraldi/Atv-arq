import { Module } from '@nestjs/common';
import { NameAnalysisService } from './name-analysis.service';
import { NameAnalysisController } from './name-analysis.controller';

@Module({
  controllers: [NameAnalysisController],
  providers: [NameAnalysisService],
  exports: [NameAnalysisService],
})
export class NameAnalysisModule {} 