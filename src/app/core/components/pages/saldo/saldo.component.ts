import {Component, OnInit} from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {SaldoService} from "../../../../services/saldo.service";
import jwt_decode from 'jwt-decode';
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {Router} from "@angular/router";
import {CurrencyPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-saldo',
  standalone: true,
  imports: [
    FormsModule,
    CalendarModule,
    InputTextModule,
    TableModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './saldo.component.html',
  styleUrl: './saldo.component.scss'
})
export class SaldoComponent implements OnInit {

  ngOnInit(): void {

  }

  saldo = {
    valor: null,
    mes: null,
  };

  saldos: any[] = [];

  constructor(private saldoService: SaldoService, private router: Router) {
    this.carregarSaldos();
  }

  private getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const decoded: any = jwt_decode(token);
    return decoded.id;
  }

  salvarSaldo() {
    if (!this.saldo.valor || !this.saldo.mes) {
      return;
    }

    // Garantir que 'mes' seja um objeto Date
    const mes = new Date(this.saldo.mes);
    mes.setDate(1);  // Setar o dia como o primeiro do mês para padronizar

    const userId = this.getUserIdFromToken();

    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    const saldoComUsuario = { ...this.saldo, mes, userId };

    this.saldoService.createSaldo(saldoComUsuario).subscribe(
      (response) => {
        this.saldo = { valor: null, mes: null };
        this.carregarSaldos();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  carregarSaldos() {
    const userId = this.getUserIdFromToken();

    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }
    this.saldoService.getSaldos(userId).subscribe(
      (data) => {
        this.saldos = data;
      },
      (error) => {
        if (error.status === 401) {
          console.log(error)
          this.router.navigate(['/auth']);
        }
      }
    );
  }
}
