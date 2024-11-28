import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppLayoutModule } from './layout/app.layout.module';
import {HttpClientModule} from "@angular/common/http";
import {SaldoService} from "./services/saldo.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AppLayoutModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'gerenciador';

  constructor(private saldoService: SaldoService){

  }
}
