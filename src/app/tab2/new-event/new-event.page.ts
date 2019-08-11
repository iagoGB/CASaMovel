import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { HttpService } from './../../services/http.service';
import { Event } from './../../models/models';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
})
export class NewEventPage implements OnInit {

  formulario: FormGroup;
  private t: string = '';

  private newEvent: Event = {
    evento_id: null,
    titulo: "",
    localizacao: "",
    palestrante: [""],
    data_horario: null,
    carga_horaria: 0,
    criado_em: null,
    atualizado_em: null
  }

  constructor (
    private http:HttpService, 
    private toastController:ToastController,
    private location: Location
  ) { }

  ngOnInit() {
    
    //Construção do formulário reativo
      this.formulario = new FormGroup({
        titulo: new FormControl(null, Validators.required),
        localizacao: new FormControl(null, Validators.required),
        palestrante:new FormControl(null, Validators.required),
        dataHorario: new FormControl(null, Validators.required),
        cargaHoraria: new FormControl(null, Validators.required)
      });

    /*
      this.formulario = this.formBuilder.group ({
        title: [null],
        location: [null],
        speakers:[ [null] ],
        date: [null],
        hour: [null],
        creatAt: [null],
        updateAt:[null]
      });
    */
  }

  //Função para criação do evento
  onSubmit(): void {
    if (this.formulario.status === "INVALID"){
      //Se o formulario estiver inválido, diga ao usuário
      console.log(this.formulario.status);
      console.log(this.formulario.value);
      console.log("Formulario invalido");
      this.presentToast("Formulário inválido, por favor preecha corretamente os campos",'danger');
    } 
    else {
      //Se o formulario estiver válido, mova para a variável evento 
      this.newEvent = this.formulario.value;
      this.newEvent.criado_em = this.newEvent.data_horario;
      this.newEvent.atualizado_em = this.newEvent.data_horario;
      //Envie para o servidor
      this.http.createEvent(this.newEvent).subscribe(
        //Vai ter que esperar a resposta aqui para mostrar o present Toast;
      );
      console.log(this.formulario);
      //Informe ao usuário que o evento foi criado
      this.presentToast('Novo evento criado!','dark');
      //Retorne pra tela de eventos
      this.location.back();
      /* Falta incluir  travativa de erros */
    }

  }


  //Feedback de situação para o usuário
  async presentToast(msg: string,c: string) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'middle',
      color: c,
      showCloseButton: true,
      closeButtonText:'x',
      duration: 2000
    });
    toast.present();
  }

}
