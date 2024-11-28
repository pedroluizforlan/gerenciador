import {Component, OnInit} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {DashService} from "../../../../services/dash.service";


@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponent implements OnInit{

  totalGastoLineData: any;
  saldoLineData: any;
  gastoSaldoBarData: any;
  categoriasPieData: any;

  lineOptions: any;
  barOptions: any;
  pieOptions: any;

  constructor(private dashService: DashService) {}

  ngOnInit() {
    this.initCharts();
    this.loadChartData();
  }

  initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.lineOptions = {
      plugins: {
        legend: { labels: { color: textColor } }
      },
      scales: {
        x: {
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder, drawBorder: false }
        },
        y: {
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder, drawBorder: false }
        },
      }
    };

    this.barOptions = {
      plugins: {
        legend: { labels: { color: textColor } }
      },
      scales: {
        x: {
          ticks: { color: textColorSecondary },
          grid: { display: false, drawBorder: false }
        },
        y: {
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder, drawBorder: false }
        },
      }
    };

    this.pieOptions = {
      plugins: {
        legend: { labels: { color: textColor } }
      }
    };
  }

  loadChartData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const currentDate = new Date();
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      return {
        month: date.getMonth() + 1, // Mês no formato 1-12
        year: date.getFullYear(),
        label: date.toLocaleString('default', { month: 'long', year: 'numeric' }) // Ex.: "November 2024"
      };
    }).reverse(); // Reverter para ficar em ordem cronológica

    const labels = last12Months.map(item => item.label);
    const monthsAndYears = last12Months.map(item => ({ month: item.month, year: item.year }));

    // Inicialização dos arrays de dados com zeros
    const emptyDataArray = Array(12).fill(0);

    // Line Chart - Total de Gasto x Últimos 12 Meses
    Promise.all(monthsAndYears.map(item => this.dashService.getTotalGastosPorMes(item.year, item.month).toPromise()))
      .then(results => {
        const gastos = emptyDataArray.slice(); // Copia inicial para zeros
        results.forEach((res: any, index) => {
          if (res && res.total !== undefined) {
            gastos[index] = res.total; // Substitui apenas se houver dado
          }
        });

        this.totalGastoLineData = {
          labels,
          datasets: [
            {
              label: 'Total Gasto',
              data: gastos,
              fill: false,
              borderColor: documentStyle.getPropertyValue('--primary-500'),
              tension: 0.4
            }
          ]
        };
      });

    // Line Chart - Saldo x Últimos 12 Meses
    Promise.all(monthsAndYears.map(item => this.dashService.getSaldoPorMes(item.year, item.month).toPromise()))
      .then(results => {
        const saldos = emptyDataArray.slice(); // Copia inicial para zeros
        results.forEach((res: any, index) => {
          if (res && res.valor !== undefined) {
            saldos[index] = res.valor; // Substitui apenas se houver dado
          }
        });

        this.saldoLineData = {
          labels,
          datasets: [
            {
              label: 'Saldo',
              data: saldos,
              fill: false,
              borderColor: documentStyle.getPropertyValue('--secondary-500'),
              tension: 0.4
            }
          ]
        };
      });

    // Bar Chart - Gasto e Saldo por Últimos 12 Meses
    Promise.all([
      Promise.all(monthsAndYears.map(item => this.dashService.getTotalGastosPorMes(item.year, item.month).toPromise())),
      Promise.all(monthsAndYears.map(item => this.dashService.getSaldoPorMes(item.year, item.month).toPromise()))
    ]).then(([gastosResults, saldosResults]) => {
      const gastos = emptyDataArray.slice();
      const saldos = emptyDataArray.slice();

      gastosResults.forEach((res: any, index) => {
        if (res && res.total !== undefined) {
          gastos[index] = res.total;
        }
      });

      saldosResults.forEach((res: any, index) => {
        if (res && res.valor !== undefined) {
          saldos[index] = res.valor;
        }
      });

      this.gastoSaldoBarData = {
        labels,
        datasets: [
          {
            label: 'Gasto',
            backgroundColor: documentStyle.getPropertyValue('--primary-500'),
            data: gastos
          },
          {
            label: 'Saldo',
            backgroundColor: documentStyle.getPropertyValue('--secondary-500'),
            data: saldos
          }
        ]
      };
    });

    // Pie Chart - Contagem por Categoria
    this.dashService.getContagemCategorias().subscribe((categorias: any[]) => {
      this.categoriasPieData = {
        labels: categorias.map(cat => cat._id),
        datasets: [
          {
            data: categorias.map(cat => cat.count),
            backgroundColor: categorias.map(() => this.randomColor()),
            hoverBackgroundColor: categorias.map(() => this.randomColor(true))
          }
        ]
      };
    });
  }





  private randomColor(light: boolean = false): string {
    const base = light ? 180 : 50;
    return `hsl(${Math.floor(Math.random() * 360)}, ${base}%, ${base}%)`;
  }
}
