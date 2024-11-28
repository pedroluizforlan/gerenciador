import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashService {


  private readonly API_URL = 'https://backfintrack.vercel.app/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
    return headers;
  }


  getSaldoPorMes(ano: number, mes: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.API_URL}/saldos/${ano}/${mes}`, {headers});
  }


  getTotalGastosPorMes(ano: number, mes: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.API_URL}/gastos/${ano}/${mes}`, {headers});
  }


  getContagemCategorias(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.API_URL}/gastos/categorias`, {headers});
  }
}
