import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { LocationService } from './location.service';

@ApiTags('locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('states')
  @ApiOperation({ summary: 'Get all Brazilian states' })
  async getStates() {
    return this.locationService.getStates();
  }

  @Get('cities')
  @ApiOperation({ summary: 'Get cities by state' })
  @ApiQuery({ name: 'stateId', required: true, type: Number })
  async getCitiesByState(@Query('stateId') stateId: number) {
    return this.locationService.getCitiesByState(stateId);
  }

  @Get('name')
  @ApiOperation({ summary: 'Get location name by ID and type' })
  @ApiQuery({ name: 'locationId', required: true, type: Number })
  @ApiQuery({ name: 'type', required: true, enum: ['state', 'city'] })
  async getLocationName(
    @Query('locationId') locationId: number,
    @Query('type') type: 'state' | 'city',
  ) {
    return this.locationService.getLocationName(locationId, type);
  }
} 