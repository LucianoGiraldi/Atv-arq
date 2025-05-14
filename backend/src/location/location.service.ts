import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LocationService {
  private readonly ibgeApiBaseUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor(private readonly httpService: HttpService) {}

  async getStates() {
    const response = await firstValueFrom(
      this.httpService.get(`${this.ibgeApiBaseUrl}/estados`)
    );
    return response.data.map(state => ({
      id: state.id,
      name: state.nome,
      uf: state.sigla
    }));
  }

  async getCitiesByState(stateId: number) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.ibgeApiBaseUrl}/estados/${stateId}/municipios`)
    );
    return response.data.map(city => ({
      id: city.id,
      name: city.nome
    }));
  }

  async getLocationName(locationId: number, type: 'state' | 'city') {
    const url = type === 'state' 
      ? `${this.ibgeApiBaseUrl}/estados/${locationId}`
      : `${this.ibgeApiBaseUrl}/municipios/${locationId}`;
    
    const response = await firstValueFrom(this.httpService.get(url));
    const data = response.data;
    
    return type === 'state' 
      ? `${data.nome} (${data.sigla})`
      : `${data.nome}/${data.microrregiao.mesorregiao.UF.sigla}`;
  }
} 