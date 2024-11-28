import {Routes} from '@angular/router';
import {AppLayoutComponent} from './layout/app.layout.component';
import {GerenciadorComponent} from './core/components/pages/gerenciador/gerenciador.component';
import {LandingComponent} from './core/components/pages/landing/landing.component';
import {DashComponent} from './core/components/pages/dash/dash.component';
import {SaldoComponent} from './core/components/pages/saldo/saldo.component';
import {AuthComponent} from "./core/components/pages/auth/auth.component";
import {authGuard} from "./auth.guard";
import {RegisterComponent} from "./core/components/pages/register/register.component";

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'gerenciador',
    component: AppLayoutComponent,
    canActivate: [authGuard],  // Protegendo a rota com AuthGuard
    children: [
      {
        path: 'gasto',
        component: GerenciadorComponent
      },
      {
        path: 'dash',
        component: DashComponent
      },
      {
        path: 'saldo',
        component: SaldoComponent
      }
    ]
  },

];
