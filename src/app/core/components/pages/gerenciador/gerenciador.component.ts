import {Component, OnInit} from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import jwt_decode from "jwt-decode";
import {GastoService} from "../../../../services/gasto.service";
import {CurrencyPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-gerenciador',
  standalone: true,
  imports: [
    FormsModule,
    CalendarModule,
    InputTextModule,
    TableModule,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './gerenciador.component.html',
  styleUrl: './gerenciador.component.scss'
})
export class GerenciadorComponent implements OnInit{

  gasto = {
    titulo: '',
    valor: 0,
    data: new Date(),
    categoria: ''
  };

  gastos: any[] = [];

  constructor(private gastoService: GastoService, private router: Router) {
    this.carregarGastos();
  }

  ngOnInit(): void {}

  private getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const decoded: any = jwt_decode(token);
    return decoded.id;
  }

  salvarGasto() {
    if (!this.gasto.valor || !this.gasto.categoria || !this.gasto.data || !this.gasto.titulo) {
      console.log("Campos obrigatórios não preenchidos.");
      return;
    }

    const userId = this.getUserIdFromToken();
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    const gastoComUsuario = { ...this.gasto, userId };



    this.gastoService.createGasto(gastoComUsuario).subscribe(
      (response) => {
        this.gasto = { titulo:'', valor: 0, data: new Date(), categoria: '' };
        this.carregarGastos();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  carregarGastos() {
    const userId = this.getUserIdFromToken();

    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.gastoService.getGastos(userId).subscribe(
      (data) => {
        this.gastos = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
