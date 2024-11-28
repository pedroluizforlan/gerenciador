import { Component } from '@angular/core';
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CheckboxModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  email: string = '';
  senha: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.senha) {
      return;
    }

    this.authService.login(this.email, this.senha).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);  // Armazene o token no localStorage
        this.router.navigate(['/gerenciador/dash']);  // Redireciona para o painel ou página desejada após login

      },
      (error) => {
        console.log("erro:", error)
      }
    );
  }
}
