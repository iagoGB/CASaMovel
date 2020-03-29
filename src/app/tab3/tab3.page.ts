import { Component } from '@angular/core';

import { EventService } from '../services/event/event.service';
import { Event } from './../models/models';
import { AlertController } from '@ionic/angular';
import { AlertService } from '../services/alert/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public events: Event[];
  public error: boolean;
  private subscribe: Subscription;

  constructor ( 
    //Injeção das dependências 
    private http: EventService, 
    private alertController: AlertController,
    private alertService: AlertService, 
  ) { };

  ngOnInit(){
    //Função para se inscrever na função http que requer atualização
    this.error = false;
    this.refresh();
    this.getEvents();
  }

  ngOnDestroy(){
    this.subscribe.unsubscribe();
  }

  //Refresh
  refresh() {
    this.http.refreshNeeded().
      subscribe(() => {
        this.getEvents();
        console.log("fez o refresh");
      });
  }
  //Função que Solicita a listagem de eventos
  private getEvents(): void {
    this.http.getEvents().subscribe ( (data) => {
      this.events = data.body;
    },(error) => {
      this.alertService.presentToast(error, 'danger');
    })
    //Subscribe dentro da promise - foi refatorado
    // this.http.getEvents().then ( (value) =>
    // {
      
    //   this.subscribe = value.subscribe(
    //     (data) => 
    //     { 
    //       this.events = data.body; 
    //     }, 
    //     (erro) => 
    //     {
    //       this.error = true;
    //       this.alertService.presentToast(erro.message, 'danger');
    //     });
    // }) 
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
