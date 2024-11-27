import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { GerenciadorComponent } from './core/components/pages/gerenciador/gerenciador.component';

export const routes: Routes = [
    {
        path: '',
        component:AppLayoutComponent,
        children:[
            {
                path:'',
                component:GerenciadorComponent
            }
        ]
    }
];
