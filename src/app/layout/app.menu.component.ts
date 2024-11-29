import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-chart-pie', routerLink: ['/gerenciador/dash'] }
                ]
            },
            {
                label: 'Gerenciador',
                items: [
                    { label: 'Saldo mensal', icon: 'pi pi-fw pi-money-bill', routerLink: ['/gerenciador/saldo'] },
                    { label: 'Gastos', icon: 'pi pi-fw pi-dollar', routerLink: ['/gerenciador/gasto'] },
                ]
            },
            {
                label: 'Documentação',
                items: [
                    {
                        label: 'Documentation', icon: 'pi pi-fw pi-file', url: ['https://gusty-hiss-dc9.notion.site/FinTrack-14d99493f780803ea819e1436d655df7'], target: '_blank'
                    },
                    {
                        label: 'Github', icon: 'pi pi-fw pi-github', url: ['https://github.com/pedroluizforlan/gerenciador'], target: '_blank'
                    }
                ]
            }
        ];
    }
}
