import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Event } from './../models/models';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private events: Event[];

  constructor(private http: HttpService){
    
  }

  ngOnInit(){
    this.http.getEvents()
    .subscribe(data => this.events = data);
  }

}
