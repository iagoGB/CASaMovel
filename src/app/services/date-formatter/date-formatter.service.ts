import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {
  public months: string[] = [ 
    "Janeiro", "Fevereiro", "Março","Abril", "Maio", "Junho", "Julho","Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" 
  ]

  constructor() { }

  getDay( date:any ): string {
    return new Date(date).getDate().toString();
  }

  getMonth( date: any ): string {
    return this.months[ new Date(date).getMonth() ];
  }

  getYear( date: any ): string {
    return new Date(date).getFullYear().toString();
  }

  getHour (date:any ): string {
    console.log(new Date(date));
    return new Date(date).getHours().toString()+"h";
  }


  getMinutes( date: any ): string {
    return new Date(date).getMinutes().toString()+"m";
  }

  getData(data: any): string {
    return this.getDay(data) + " de "+ this.getMonth(data)+ " de "+this.getYear(data)+", " + this.getHour(data)+this.getMinutes(data);
  }
}
