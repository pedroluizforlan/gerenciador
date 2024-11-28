import { Component } from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {UsuarioService} from "../../../../services/usuario.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputTextModule, FormsModule, InputGroupAddonModule, InputGroupModule, PasswordModule, ButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  // Modelo para os dados do usuário
  usuario = {
    nome: '',
    email: '',
    senha: ''
  };

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  // Método para registrar o novo usuário
  registrarUsuario() {
    if (this.usuario.nome && this.usuario.email && this.usuario.senha) {
      this.usuarioService.registrar(this.usuario).subscribe(
        (response) => {
          console.log('Usuário registrado com sucesso!', response);
          this.router.navigate(['/auth']);// Redireciona para a página de login após o registro
        },
        (error) => {
          console.log('Erro ao registrar usuário', error);
        }
      );
    } else {
      console.log('Preencha todos os campos');
    }
  }
}
