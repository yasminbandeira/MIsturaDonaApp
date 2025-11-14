import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

export interface Product {
  id: number;
  name: string;
  description: string;
  components: string;
  warnings: string;
}

export interface MixResult {
  safe: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: DatabaseService) {}

  async getProducts(): Promise<Product[]> {
    try {
      const response = await this.db.get('products.php');
      return response.success ? response.products : [];
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return [];
    }
  }

  async checkMixture(product1Id: number, product2Id: number): Promise<MixResult> {
    try {
      const response = await this.db.post('products.php', {
        product1Id,
        product2Id
      });
      return response.success ? response.result : {
        safe: false,
        message: 'Erro ao verificar a mistura'
      };
    } catch (error) {
      console.error('Erro ao verificar mistura:', error);
      return {
        safe: false,
        message: 'Erro ao verificar a mistura'
      };
    }
  }
}
