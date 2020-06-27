import { Component } from '@angular/core';

import { EventService } from '../services/event/event.service';
import { Event } from './../models/models';
import { AlertController, Platform } from '@ionic/angular';
import { AlertService, ToastColor } from '../services/alert/alert.service';
import { Subscription } from 'rxjs';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public events: Event[];
  public error: boolean;
  private subscribe: Subscription;
  private data: any;
  months: string[] = [ 
    "Jan", "Fev", "Mar","Abr", "Mai", "Jun", "Jul","Ago", "Set", "Out", "Nov", "Dez" 
  ]

  constructor ( 
    private eventService: EventService, 
    private alertController: AlertController,
    private alertService: AlertService, 
    private barcodeScanner: BarcodeScanner,
    private plataform: Platform
  ) { };

  ngOnInit(){
    //Função para se inscrever na função http que requer atualização
    this.error = false;
    this.refresh();
  }

  ionViewWillEnter(){
    this.getEvents();
  }

  ngOnDestroy(){
    this.subscribe.unsubscribe();
  }

  //Refresh
  refresh() {
    this.eventService.refreshNeeded().
      subscribe(() => {
        this.getEvents();
        console.log("fez o refresh");
      });
  }
  //Função que Solicita a listagem de eventos
  private getEvents(): void {
    this.eventService.getEvents().subscribe ( (data) => {
      this.events = data.body;
    },(error) => {
      this.alertService.presentToast(error, ToastColor.DAN);
    })
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
    this.eventService.removeEvent(event).subscribe();
  }

  startScan(): void {
    if (this.plataform.is("desktop")) {
      this.registerPresence("jk2222kAABc-33");
    } else {
      this.data = null;
      this.barcodeScanner.scan().then(barcodeData => {
        this.data = barcodeData;
        if (barcodeData.cancelled || barcodeData.format != 'QR_CODE'){
          this.alertService.presentToast("Você cancelou, ou tentou scannear algo que não seja QRCode",ToastColor.DARK);
        } else {
          this.registerPresence(barcodeData.text);
        }
      
      }).catch(err => {
        this.alertService.presentToast(err,ToastColor.DARK);
      });
    }
  }

  registerPresence(barcodeData: string){
    this.eventService.registerPresence(barcodeData).subscribe( (value) => {
      if (value.status === 200)
        this.alertService.presentToast("Presença registrada com sucesso",ToastColor.SUC);
      else
      this.alertService.presentToast("Presença registrada com sucesso",ToastColor.SUC);  
    },
    (err)=>{
      if (err.status === 400) 
        this.alertService.presentToast(err.error.erro || err.error.mensagem || err.error.message ,ToastColor.WAR);
      else 
        this.alertService.presentToast(err.body.mensagem || err.body.message || err.body.erro,ToastColor.DAN);
    })
  }
  
  getDay( date:any ): string {
    return new Date(date).getDate().toString();
  }

  getMonth( date: any ): string {
    return this.months[ new Date(date).getMonth() ];
  }

  getHour (date:any ): string {
    console.log(new Date(date));
    return new Date(date).getHours().toString()+"h";
  }
  
}
