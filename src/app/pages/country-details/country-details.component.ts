import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from '../../core/services/olympic.service';
import { CountryChartComponent } from '../../components/country-chart/country-chart.component';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
echarts.use([LineChart]);


@Component({
  selector: 'app-country-details',
  imports: [CountryChartComponent],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.css',
  providers: [
    provideEchartsCore({ echarts }),
  ]
})
export class CountryDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private countryId: number | null = null;

  public countryName: string | null = null;
  public countryMedalsTotal: number = 0;
  public countryAthleteTotal: number = 0;
  public countryNbrOfParticipations: number = 0;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      // TO DO : checker si les datas sont bien load$
      this.countryId = params['id'];
      //this.countryName = this.olympicService.getCountryNameById(params['id']);
    });

    this.olympicService.asyncFailSafe(() => {
      this.countryName = this.olympicService.getCountryNameById(this.countryId)
      this.countryMedalsTotal = this.olympicService.getMedalsTotalById(this.countryId);
      this.countryAthleteTotal = this.olympicService.getAthleteTotalById(this.countryId);
      this.countryNbrOfParticipations = this.olympicService.getNbrOfParticipationsbyId(this.countryId);
    })

  }

}

// function test (callback: Function){
//   if(1){callback}
// }