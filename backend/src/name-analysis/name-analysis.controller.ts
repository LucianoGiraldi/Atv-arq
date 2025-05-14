import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { NameAnalysisService } from './name-analysis.service';

@ApiTags('names')
@Controller('names')
export class NameAnalysisController {
  constructor(private readonly nameAnalysisService: NameAnalysisService) {}

  @Get('ranking')
  @ApiOperation({ summary: 'Get ranking evolution for a specific name' })
  @ApiQuery({ name: 'name', required: true })
  @ApiQuery({ name: 'startDecade', required: true, type: Number })
  @ApiQuery({ name: 'endDecade', required: true, type: Number })
  async getRankingEvolution(
    @Query('name') name: string,
    @Query('startDecade') startDecade: number,
    @Query('endDecade') endDecade: number,
  ) {
    return this.nameAnalysisService.getRankingEvolution(name, startDecade, endDecade);
  }

  @Get('location')
  @ApiOperation({ summary: 'Get top names for a specific location' })
  @ApiQuery({ name: 'location', required: true })
  async getTopNamesByLocation(@Query('location') location: string) {
    return this.nameAnalysisService.getTopNamesByLocation(location);
  }

  @Get('compare')
  @ApiOperation({ summary: 'Compare two names over time' })
  @ApiQuery({ name: 'name1', required: true })
  @ApiQuery({ name: 'name2', required: true })
  async compareNames(
    @Query('name1') name1: string,
    @Query('name2') name2: string,
  ) {
    return this.nameAnalysisService.compareNames(name1, name2);
  }
} 