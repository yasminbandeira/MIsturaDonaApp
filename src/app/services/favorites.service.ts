import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor(
    private db: DatabaseService,
    private auth: AuthService
  ) { }

  async getFavorites() {
    const user = this.auth.getCurrentUser();
    if (!user) return [];

    try {
      const response = await this.db.get(`favorites.php?userId=${user.id}`);
      return response.success ? response.favorites : [];
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
      return [];
    }
  }

  async addToFavorites(productId: number) {
    const user = this.auth.getCurrentUser();
    if (!user) return false;

    try {
      const response = await this.db.post('favorites.php', {
        userId: user.id,
        productId
      });
      return response.success;
    } catch (error) {
      console.error('Erro ao adicionar aos favoritos:', error);
      return false;
    }
  }

  async removeFromFavorites(productId: number) {
    const user = this.auth.getCurrentUser();
    if (!user) return false;

    try {
      const response = await this.db.post('favorites.php', {
        userId: user.id,
        productId,
        action: 'remove'
      });
      return response.success;
    } catch (error) {
      console.error('Erro ao remover dos favoritos:', error);
      return false;
    }
  }
}