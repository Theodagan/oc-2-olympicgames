import { Component, OnInit, effect } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';

import { signal } from '@angular/core';

import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { CommonModule } from '@angular/common';
import type { EChartsCoreOption } from 'echarts/core';
import { Olympic } from '../../core/models/olympic';
import { Participation } from '../../core/models/participation';
echarts.use([BarChart, TitleComponent, GridComponent, CanvasRenderer, LegendComponent, TooltipComponent, PieChart]);

@Component({
  selector: 'app-home-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './home-chart.component.html',
  styleUrls: ['./home-chart.component.css'],
  providers: [
    provideEchartsCore({ echarts }),
  ]
})
export class HomeChartComponent implements OnInit{

  public olympicDataSignal = signal<any>(null);

  olympicChartData: object[] = [];
  olympicChartDataLegend: string[] = [];

  options: EChartsCoreOption = {};
  constructor(private olympicService: OlympicService) {
    //handle changes in signals
    effect(() => {
      console.log("effect fired 2", this.olympicDataSignal());
      let oDS = this.olympicDataSignal();

      //EXPL : DATA PARSING 
      if(oDS){ // EXPL : to avoid reading properties of null
        oDS.forEach((ol: Olympic) => {
          console.info(ol.country);
          let olympicDataObject = {value: 0, name:''};
          let totalOfMedals = 0;

          (ol.participations).forEach((pt: Participation) => {
            console.log(pt.medalsCount);
            totalOfMedals += pt.medalsCount;
          });

          console.log("Test 9 : Recap foreach dataparsing", ol.country, totalOfMedals);
          olympicDataObject.name = ol.country;
          olympicDataObject.value = totalOfMedals;

          this.olympicChartData.push(olympicDataObject);
          this.olympicChartDataLegend.push(ol.country);
        });
      }
    });
  }

  ngOnInit(): void {
    //EXPL : on recupere directement l'obeserver depuis le service pour subscribe au "complete"
    this.olympicService.loadInitialData().subscribe({
      complete: () => {
        this.olympicDataSignal.set(this.olympicService.getOlympics()());

        //EXPL : les options sont définies qu'à reception du "complete" sinon la librarie n'update pas le graph apparement 
        this.options = {
          title: {
            left: '50%',
            text: 'Nightingale Rose Diagram',
            subtext: 'Mocking Data',
            textAlign: 'center',
          },
          legend: {
            align: 'auto',
            bottom: 10,
            data: this.olympicChartDataLegend,
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          series: [
            {
              name: 'Pays',
              type: 'pie',
              center: ['50%', '50%'],
              radius: [10, 110],
              roseType: '', //change to '' for a look closer to the wireframe autres valeurs :[radius, area]
              data: this.olympicChartData,
            },
          ],
          animationEasing: 'elasticOut',
          animationDelayUpdate: idx => idx * 5,
        };
      }
    });
  }

  onChartClick(e:object) {
    console.log(typeof e, e);    
  }
  
}
