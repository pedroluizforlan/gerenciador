import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api'

  constructor(private http: HttpClient) { }
  
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Métodos para gastos
  getGastos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/gastos`, { headers: this.getHeaders() });
  }

  criarGasto(gasto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/gastos`, gasto, { headers: this.getHeaders() });
  }

  getSaldos():Observable<any> {
    return this.http.get(`${this.apiUrl}/saldos`, { headers: this.getHeaders()} );
  }

  criarSaldo(saldo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/saldos`, saldo, { headers: this.getHeaders() });
  }
}
