import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { HomeChartComponent } from '../../components/home-chart/home-chart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [HomeChartComponent],
})

export class HomeComponent implements OnInit {
  public nbrOfOlympicGames: number = 0;
  public nbrOfCountries: number = 0;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.asyncFailSafe(() => {
      this.nbrOfOlympicGames = this.olympicService.getNbrOfParticipationsbyId(1);
      this.nbrOfCountries = this.olympicService.getOlympics()().length;
    }); 
  }

}
