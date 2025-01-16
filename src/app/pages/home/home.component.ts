import { Component, OnInit, effect } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { signal } from '@angular/core';
import { HomeChartComponent } from '../../components/home-chart/home-chart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [HomeChartComponent],
})

export class HomeComponent implements OnInit {

  public olympicData = signal<any>(null); //change to undefined later
  public nbrOfOlympicGames: number = 0;
  public nbrOfCountries: number = 0;
  

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    console.log("Home component initialized");
    console.log(this.olympicService.isDataLoaded);

    this.olympicService.asyncFailSafe(() => {
      this.olympicData.set(this.olympicService.getOlympics()());
      this.nbrOfOlympicGames = this.olympicService.getNbrOfParticipationsbyId(1);
      this.nbrOfCountries = this.olympicService.getOlympics()().length;
    });
    
  }

}
