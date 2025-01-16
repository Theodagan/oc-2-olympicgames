import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Olympic Games Tracker';

  constructor(private olympicService: OlympicService){this.olympicService.loadInitialData();}

}
