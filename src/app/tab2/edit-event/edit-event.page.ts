import { Event } from './../../models/models';
import { Component, OnInit } from '@angular/core';

import { HttpService } from './../../services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})

export class EditEventPage implements OnInit {

  private newEvent: Event = {
    id: null,
    title: "",
    location: "",
    speakers: [""],
    date: null, 
    hour: 4, 
    createAt: null,
    updateAt: null
 }

  constructor (
    private http:HttpService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        console.log(id);
        const event$ = this.http.loadByID(id);
        event$.subscribe (
          event => { this.updateInput(event);
        });
      }
    );
  }

  updateInput(data){
    this.newEvent.id = data.id;
    this.newEvent.title = data.title;
    this.newEvent.location = data.location;
    this.newEvent.speakers = data.speakers;
    this.newEvent.date = data.date; 
    this.newEvent.hour = data.hour;
    this.newEvent.createAt = data.createAt;
    this.newEvent.updateAt = data.updateAt;
  }

  updateEvent(){
    this.http.updateEvent(this.newEvent).subscribe(
    );
  }
}
