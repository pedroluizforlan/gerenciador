import { Component } from '@angular/core';
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CheckboxModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    InputTextModule,
    NgIf
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  email: string = '';
  senha: string = '';
  mensagemErro: string = ''; // Armazena a mensagem de erro

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
        if (error.status === 401) {
          this.mensagemErro = 'Senha incorreta. Por favor, tente novamente.';
        } else if (error.status === 404) {
          this.mensagemErro = 'Usuário não encontrado.';
        } else {
          this.mensagemErro = 'Erro ao tentar fazer login. Tente novamente mais tarde.';
        }
      }
    );
  }
}
