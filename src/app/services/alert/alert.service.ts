import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';
import { text } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor( 
    private toastController: ToastController
  ) { }

   //Feedback de situação para o usuário
    async presentToast(
      msg : string,color : string,position? : string,
      closeButton?: boolean, duration?: number 
    ) 
    {
      const toast = await this.toastController.create({
        message: msg,
        position: 'middle',
        buttons: [ 
          {
            text: 'Fechar',
            role: 'cancel'
          }
        ],
        duration: 3000
      });
      toast.present();
    }
  
}
