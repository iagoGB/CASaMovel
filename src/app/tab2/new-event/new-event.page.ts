import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { HttpService } from './../../services/http.service';
import { Event } from './../../models/models';
import { ToastController } from '@ionic/angular';

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

  constructor (
    private http:HttpService, 
    private toastController:ToastController,
    private location: Location
  ) { }

  ngOnInit() {
  
  }

  create(): void {
    this.http.createEvent(this.newEvent).subscribe(
    );
    console.log(this.newEvent);
    this.presentToast();
    /* Falta incluir refresh e travativa de erros */

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Novo evento criado!',
      position: 'middle',
      color:"dark",
      showCloseButton: true,
      closeButtonText:'x',
      duration: 2000
    });
    toast.present();
    this.location.back();
  }

}
