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
  

  constructor(private olympicService: OlympicService) {
    //handle changes in signals
    effect(() => {
      console.log("effect fired", this.olympicData());
    });
  }

  ngOnInit(): void {
    console.log("Home component initialized");
    
    //EXPL : on recupere directement l'obeserver depuis le service pour subscribe au "complete"
    this.olympicService.loadInitialData().subscribe({
      complete: () => {
        this.olympicData.set(this.olympicService.getOlympics()());
      }
    });
  }

}
