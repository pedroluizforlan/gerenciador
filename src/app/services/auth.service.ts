import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://backfintrack.vercel.app/api';  // A URL da sua API

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha });
  }

  register(nome: string, email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios`, { nome, email, senha });
  }
}
