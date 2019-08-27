import { Component } from '@angular/core';

import { EventService } from '../services/event/event.service';
import { Event } from './../models/models';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private events: Event[];
  public error: boolean;

  constructor ( 
    //Injeção das dependências 
    private http: EventService, 
    private alertController: AlertController,
    private alertService: AlertService,
    private  location: Location 
  ) { };

  ngOnInit(){
    //Função para se inscrever na função http que requer atualização
    this.error = false;
    this.http.refreshNeeded().
    subscribe( () => { 
      this.getEvents();
      console.log("fez o refresh");
    });
    this.getEvents();
  }

  ngOnDestroy(){
  }
  //Função que Solicita a listagem de eventos
  private getEvents(): void {
    this.http.getEvents()
    .subscribe(
      data => this.events = data,
      (erro: HttpErrorResponse) => {
        this.error = true;
        this.alertService.presentToast(erro.message, 'danger');
      });
  }

  //Evento assincrono para exibir modal ao clicar em deletar 
  async onDeleteConfirm ( event: Event ) {
    
    const alert = await this.alertController.create({
      header: 'Confirmar!',
      message: 'Tem certeza que deseja excluir o evento: <strong>' + event.titulo + '</strong>',
      buttons: [
        {
          //Botão de cancelar
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, 
        {
          //Botão de confirmar
          text: 'Sim',
          handler: ( ) => {
            this.remove(event);
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  //Evento para solicitar a ação de delete ao serviço http.
  remove( event: Event ): void {
    this.http.removeEvent(event).subscribe();
  }
  
}
