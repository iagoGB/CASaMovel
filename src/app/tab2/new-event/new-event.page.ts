import { HttpService } from './../../services/http.service';
import { Event } from './../../models/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
})
export class NewEventPage implements OnInit {

  private t: string = '';

  private newEvent: Event = {
    id: null,
    title: "",
    location: "",
    speakers: [],
    date: null,
    hour: 0,
    createAt: null,
    updateAt: null
  }

  constructor(private http:HttpService) { }

  ngOnInit() {
  
  }

  create(): void {
    this.http.createEvent(this.newEvent).subscribe(
    );
    console.log(this.newEvent);
  }

}
