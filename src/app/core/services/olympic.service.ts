import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Injectable({
  providedIn: 'root'
})
export class OlympicService {
  private olympicUrl = 'mock/olympic.json';
  private olympicData = signal<any>("service"); //change to undefined later
  
  constructor(private http: HttpClient) {}
  
  loadInitialData(){
    console.log("test 1", "loadInitialData", this.http.get<any>(this.olympicUrl));
    
    let data = this.http.get<any>(this.olympicUrl);

    data.subscribe({
      next: (v) => {
        console.log("test 2", v);
        this.olympicData.set(v);
        console.log("test 3", this.olympicData());
      },
      error: (e) => console.error(e),
      complete: () => console.info('data fetched') 
    });
    
    console.log("test 4", data);
    return data;
  }
  
  getOlympics() {
    return this.olympicData.asReadonly();
  }
}
