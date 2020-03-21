import { Component, OnInit } from '@angular/core';

import { EventService } from '../../services/event/event.service';
import { Event } from './../../models/models';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})

export class EditEventPage implements OnInit {

  public newEvent: Event = {
    id: null,
    imagem: null,
    titulo: "",
    local: "",
    categoria: null,
    palestrante: [""],
    data_horario: null, 
    carga_horaria:0, 
    criado_em: null,
    atualizado_em: null
 }

  constructor (
    private http:EventService,
    private route: ActivatedRoute,
    private location: Location,
    private toastController: ToastController
    
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        console.log(id);
        const event$ = this.http.loadByID(id);
        event$.subscribe (
          event => { 
            this.updateInput(event);
        });
      }
    );
  }

  updateInput(data){
    this.newEvent.id = data.id;
    this.newEvent.titulo = data.title;
    this.newEvent.local = data.local;
    this.newEvent.palestrante = data.palestrante;
    this.newEvent.carga_horaria = data.carga_horaria;
    this.newEvent.data_horario = data.data_horario; 
    this.newEvent.criado_em = data.criado_em;
    this.newEvent.atualizado_em = data.atualizado_em;
  }

  updateEvent(){
    this.http.updateEvent(this.newEvent).subscribe(
    );
    this.presentToast();
  }
  
  //Feedback positivo ao atualizar o evento.
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Evento atualizado!',
      position: 'middle',
      color:"dark",
      buttons: [ 
        {
          text: 'Fechar',
          role: 'cancel'
        }
      ],
      duration: 2000
    });
    toast.present();
    //Tem que garantir que o usuário veio de um tela anterior para usar a função abaixo
    this.location.back();
    
  }
  
}
