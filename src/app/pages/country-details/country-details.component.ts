import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private router = inject(Router)
  private countryId: number = parseInt(this.route.snapshot.paramMap.get('id')?? "0");

  public countryName: string | null = null;
  public countryMedalsTotal: number = 0;
  public countryAthleteTotal: number = 0;
  public countryNbrOfParticipations: number = 0;

  public isIdValid: boolean = false;

  constructor(private olympicService: OlympicService) {
    this.olympicService.asyncFailSafe(() => {
      if(!(this.olympicService.getAllIds().includes(this.countryId))){
        this.router.navigate(['/404']);
      }
      else{this.isIdValid = true;}
    });    
  }

  ngOnInit(): void {
    this.olympicService.asyncFailSafe(() => {
      this.countryName = this.olympicService.getCountryNameById(this.countryId)
      this.countryMedalsTotal = this.olympicService.getMedalsTotalById(this.countryId);
      this.countryAthleteTotal = this.olympicService.getAthleteTotalById(this.countryId);
      this.countryNbrOfParticipations = this.olympicService.getNbrOfParticipationsbyId(this.countryId);
    })

  }

}
