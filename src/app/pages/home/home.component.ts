import { Component, OnInit, effect, untracked } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  public olympicData = signal<any>(null); //change to undefined later

  constructor(private olympicService: OlympicService) {
    //handle chang in signals
    effect(() => {
      console.log("effect fired", this.olympicData());
    });
  }

  ngOnInit(): void {
    console.log("Home component initialized");
    
    //EXPL : on recupere directement l'obeserver depuis le service
    this.olympicService.loadInitialData().subscribe({
      complete: () => {
        console.info('data d');
        this.olympicData.set(this.olympicService.getOlympics()());
      }
    });
  }

}
