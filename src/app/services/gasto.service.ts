import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  private apiUrl = 'http://localhost:5000/api/gastos';

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
    return headers;
  }

  createGasto(gasto: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.apiUrl, gasto, { headers });
  }

  getGastos(userId: string): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`, {headers});
  }

  editarGasto(id: string, gasto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, gasto);
  }

  excluirGasto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
