import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';

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
        color: color,
        showCloseButton: true,
        closeButtonText:'x',
        duration: 3000
      });
      toast.present();
    }
  
}
