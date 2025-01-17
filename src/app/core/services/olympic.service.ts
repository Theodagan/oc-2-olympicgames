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
  //private olympicData = signal<any>(undefined);
  public olympicData = signal<Olympic[]>([{id: 0, country: "", participations: []}]);

  private observable = new Observable<Olympic[]>();
  private hasBeenCalled : boolean = false;
  public isDataLoaded : boolean = false;
  
  constructor(private http: HttpClient) {}
  
  loadInitialData(){
    
    //EXPL : check si la fonciton a déjà été appellée pour ne pas créer 50 observables pour rien
    if(!this.hasBeenCalled){
      
      this.hasBeenCalled = true;
      this.observable = this.http.get<Olympic[]>(this.olympicUrl);

      this.observable.subscribe({
        next: (v) => {
          this.olympicData.set(v);
        },
        error: (e) => console.error(e),
        complete: () => {
          console.info('data loaded');
          this.isDataLoaded = true;
          //V2 unsubscribe observable here 
        }
      });
    }
    //EXPL(v1) : renvoit l'observable pour pouvoir subscribe au complete de n'importe où
    return this.observable;
  }
  
  getOlympics() {
    return this.olympicData.asReadonly();
  }

  getMedalsById(id: number | null = null){
    let parsed: DataT[] = [];
    let olympicDataElement = this.olympicData().find((element: Olympic) => element.id == id);

    if(id && olympicDataElement){
      //return parsed data 
      olympicDataElement.participations.forEach((element: Participation) => {
        let object: DataT = {name: "", value: ["", 0]};
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
    let olympicDataElement = this.olympicData().find((element: Olympic) => element.id == id);

    if(id && olympicDataElement){
      olympicDataElement.participations.forEach((element: Participation) => {
        medalsTotal += element.medalsCount;
      });
    }
    return medalsTotal;
  }

  getAthleteTotalById(id: number | null = null){
    let athleteTotal = 0;
    let olympicDataElement = this.olympicData().find((element: Olympic) => element.id == id);

    if(id && olympicDataElement){
      olympicDataElement.participations.forEach((element: Participation) => {
        athleteTotal += element.athleteCount;
      });
    }
    return athleteTotal;
  }

  getNbrOfParticipationsbyId(id: number | null = null){
    let nbrParticipations = 0;
    let olympicDataElement = this.olympicData().find((element: Olympic) => element.id == id);

    if(id && olympicDataElement){
      nbrParticipations = olympicDataElement.participations.length;
    }
    return nbrParticipations;
  }

  getCountryNameById(id: number | null = null){
    let olympicDataElement = this.olympicData().find((element: Olympic) => element.id == id);

    if(id && olympicDataElement){
      return olympicDataElement.country;
    }
    else{return "Pays"}
  }

  getAllIds(){
    let ids: number[] = [];
    this.olympicData().forEach((element: Olympic) => {
      ids.push(element.id);
    });
    return ids;
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

//data structure for echarts 
type DataT = {
  name: string,
  value: [string, number]
};