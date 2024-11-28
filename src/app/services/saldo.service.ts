import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {
  private apiUrl = 'https://backfintrack.vercel.app/api/saldos'; // URL da API

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
    return headers;
  }

  getSaldos(userId: string): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}?usuarioId=${userId}`, { headers });
  }

  createSaldo(saldo: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.apiUrl, saldo, { headers });
  }

  updateSaldo(saldo: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/${saldo.id}`, saldo, { headers });
  }

  deleteSaldo(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }

  deleteMultipleSaldos(ids: number[]): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}/bulk-delete`, { ids }, { headers });
  }
}
