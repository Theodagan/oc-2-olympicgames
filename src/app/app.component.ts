import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'myapp';

  constructor(private olympicService: OlympicService){}

  ngOnInit(): void {
    console.log('AppComponent initialized');
    this.olympicService.loadInitialData();
  }
}
