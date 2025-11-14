import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = environment.apiUrl; // Vamos configurar isso no environment

  constructor() { }

  async get(endpoint: string) {
    const response = await Http.get({
      url: `${this.apiUrl}/${endpoint}`,
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  }

  async post(endpoint: string, data: any) {
    const response = await Http.post({
      url: `${this.apiUrl}/${endpoint}`,
      headers: { 'Content-Type': 'application/json' },
      data: data
    });
    return response.data;
  }
}