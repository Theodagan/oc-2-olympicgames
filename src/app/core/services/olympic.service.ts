import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Olympic } from '../models/olympic';
import { Participation } from '../models/participation';

@Injectable({
  providedIn: 'root'
})
export class OlympicService {
  private olympicUrl = 'mock/olympic.json';
  private olympicData = signal<any>(undefined);

  private observable = new Observable<any>();
  private hasBeenCalled : boolean = false;
  public isDataLoaded : boolean = false;
  
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
        complete: () => {
          console.info('data loaded');
          this.isDataLoaded = true;
        }
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

  getMedalsById(id: number | null = null){
    let parsed: DataT[] = [];
    if(id){
      //return parsed data 
      this.olympicData().find((element: Olympic) => element.id == id).participations.forEach((element: Participation) => {
        let object: DataT = {name: "", value: ["", 0]};
        console.log(element.year, element.medalsCount);
        object.name = element.year.toString();
        object.value[0] = element.year.toString();
        object.value[1] = element.medalsCount;
        parsed.push(object);
      });
    }
    return parsed;
  }
  
  getMedalsTotalById(id: number | null = null){
    let medalsTotal = 0;
    if(id){
      this.olympicData().find((element: Olympic) => element.id == id).participations.forEach((element: Participation) => {
        medalsTotal += element.medalsCount;
      });
    }
    return medalsTotal;
  }
  getAthleteTotalById(id: number | null = null){
    let athleteTotal = 0;
    if(id){
      this.olympicData().find((element: Olympic) => element.id == id).participations.forEach((element: Participation) => {
        athleteTotal += element.athleteCount;
      });
    }
    return athleteTotal;
  }

  getNbrOfParticipationsbyId(id: number | null = null){
    //QRK : bizzarement ici impossible d'acceder à .length sur l'array de participations, d'où le foreach
    let nbrParticipations = 0;
    if(id){
      this.olympicData().find((element: Olympic) => element.id == id).participations.forEach((element: Participation) => {
        nbrParticipations ++;
      });
    }
    return nbrParticipations;
  }

  getCountryNameById(id: number | null = null){
    if(id){
      return this.olympicData().find((element: Olympic) => element.id == id).country;
    }
    else{return "Pays"}
  }

  asyncFailSafe(callback: Function){
    if(this.isDataLoaded){
      callback();
    }else{
      this.observable.subscribe({
        complete: () => {callback()}
      });
    }
  }

}


type DataT = {
  name: string,
  value: [string, number]
};