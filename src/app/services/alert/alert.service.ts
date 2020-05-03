import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

export enum ToastColor {
  PRI = "primary", 
  SEC = "secondary", 
  TER = "tertiary", 
  SUC = "success", 
  WAR = "warning", 
  DAN ="danger", 
  LIGHT = "light", 
  MD = "medium", 
  DARK = "dark"
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor( 
    private toastController: ToastController
  ) { }

   //Feedback de situação para o usuário
    async presentToast(
      msg : string,color : ToastColor ,position? : string,
      closeButton?: boolean, duration: number = 3000
    ) 
    {
      const toast = await this.toastController.create({
        message: msg,
        color: color,
        position: 'middle',
        buttons: [ 
          {
            text: 'Fechar',
            role: 'cancel'
          }
        ],
        duration: duration
      });
      toast.present();
    }
  
}
