import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://backfintrack.vercel.app/api/usuarios';  // URL do seu backend

  constructor(private http: HttpClient) {}

  registrar(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }
}
