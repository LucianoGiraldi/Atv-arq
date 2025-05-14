import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NameAnalysisService {
  private readonly ibgeApiBaseUrl = 'https://servicodados.ibge.gov.br/api/v2/censos/nomes';

  constructor(private readonly httpService: HttpService) {}

  async getRankingEvolution(name: string, startDecade: number, endDecade: number) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.ibgeApiBaseUrl}/${name}`)
    );
    
    const data = response.data;
    return this.filterAndFormatRankingData(data, startDecade, endDecade);
  }

  async getTopNamesByLocation(location: string) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.ibgeApiBaseUrl}/ranking?localidade=${location}`)
    );
    
    return this.formatTopNamesData(response.data);
  }

  async compareNames(name1: string, name2: string) {
    const [data1, data2] = await Promise.all([
      firstValueFrom(this.httpService.get(`${this.ibgeApiBaseUrl}/${name1}`)),
      firstValueFrom(this.httpService.get(`${this.ibgeApiBaseUrl}/${name2}`))
    ]);

    return this.formatComparisonData(data1.data, data2.data);
  }

  private filterAndFormatRankingData(data: any[], startDecade: number, endDecade: number) {
    return data
      .filter(item => {
        const decade = parseInt(item.periodo.split('-')[0]);
        return decade >= startDecade && decade <= endDecade;
      })
      .map(item => ({
        decade: item.periodo,
        frequency: item.frequencia,
        ranking: item.ranking
      }));
  }

  private formatTopNamesData(data: any[]) {
    return data.slice(0, 3).map(item => ({
      name: item.nome,
      frequency: item.frequencia,
      ranking: item.ranking
    }));
  }

  private formatComparisonData(data1: any[], data2: any[]) {
    const decades = new Set([
      ...data1.map(item => item.periodo),
      ...data2.map(item => item.periodo)
    ]);

    return Array.from(decades).map(decade => {
      const name1Data = data1.find(item => item.periodo === decade);
      const name2Data = data2.find(item => item.periodo === decade);

      return {
        decade,
        name1: name1Data ? {
          frequency: name1Data.frequencia,
          ranking: name1Data.ranking
        } : null,
        name2: name2Data ? {
          frequency: name2Data.frequencia,
          ranking: name2Data.ranking
        } : null
      };
    });
  }
} 