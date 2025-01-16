import { Component, OnInit, inject } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';

import { NgxEchartsDirective } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { CommonModule } from '@angular/common';
import type { EChartsCoreOption } from 'echarts/core';
import { ActivatedRoute } from '@angular/router';
echarts.use([BarChart, TitleComponent, GridComponent, CanvasRenderer, LegendComponent, TooltipComponent, PieChart]);


@Component({
  selector: 'app-country-chart',
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './country-chart.component.html',
  styleUrl: './country-chart.component.css',
  standalone: true,
})
export class CountryChartComponent implements OnInit {

  options: EChartsCoreOption = {};

  private data: DataT[] = [];
  private route = inject(ActivatedRoute);
  private countryId: number | null = null;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.countryId = params['id'];

    });    

    // initialize chart options:
    this.olympicService.asyncFailSafe(() => {
      this.data = this.olympicService.getMedalsById(this.countryId);
      this.options = {
        title: {
          text: '',
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params: any) => {
            params = params[0];
            const date = new Date(params.name);
            return (
              date.getFullYear() +
              ' : ' +
              params.value[1]
            );
          },
          axisPointer: {
            animation: false,
          },
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: 'Mocking Data',
            type: 'line',
            showSymbol: false,
            data: this.data,
          },
        ],
      };
    })


  }
}

type DataT = {
  name: string,
  value: [string, number]
};