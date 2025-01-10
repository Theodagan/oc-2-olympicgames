import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OlympicService {
  private olympicUrl = 'mock/olympic.json';
  private olympicData = signal<any>(undefined);

  private observable = new Observable<any>();
  private hasBeenCalled : boolean = false;
  
  constructor(private http: HttpClient) {}
  
  loadInitialData(){
    //console.log("test 1", "loadInitialData", this.http.get<any>(this.olympicUrl));
    
    //EXPL : check si la fonciton a déjà été appellée pour ne pas créer 50 observables pour rien
    if(!this.hasBeenCalled){
      console.info('loadInitialData if')
      
      this.hasBeenCalled = true;
      this.observable = this.http.get<any>(this.olympicUrl);

      this.observable.subscribe({
        next: (v) => {
          console.log("test 2", v);
          this.olympicData.set(v);
          console.log("test 3", this.olympicData());
        },
        error: (e) => console.error(e),
        complete: () => console.info('data fetched') 
      });
    }
    
    //V2 faire du return une fonction séparée ?

    //EXPL : renvoit l'observable pour pouvoir subscribe au complete de n'importe où
    //console.log("test 4", this.observable);
    return this.observable;
  }
  
  getOlympics() {
    return this.olympicData.asReadonly();
  }
}
