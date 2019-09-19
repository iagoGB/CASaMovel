import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { EventService } from '../../services/event/event.service';
import { Event, Categoria } from './../../models/models';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
})
export class NewEventPage implements OnInit {

  formulario: FormGroup;
  private t: string = '';

  private categories: Categoria[];

  private newEvent: Event = {
    evento_id: null,
    imagem: "",
    titulo: "",
    localizacao: "",
    palestrante: [""],
    data_horario: null,
    carga_horaria: 0,
    criado_em: null,
    atualizado_em: null
  }

  constructor (
    private http : EventService, 
    private alertService : AlertService,
    private categoryService: CategoryService,
    private location : Location
  ) { }

  ngOnInit() {

    //Buscar a listagem de categoria
    this.categoryService.getAll().subscribe(
      (array)=> { this.categories = array; }, 
      (erro) =>{ this.alertService.presentToast(erro,'danger') }
    )
    
    //Construção do formulário reativo
      this.formulario = new FormGroup({
        imagem: new FormControl(null, Validators.required),
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

  //Checkar arquivos
  inputFileChange(event){
    if (event.target.files && event.target.files[0]){
      const img = event.taret.files[0];
    }
  }
  //Função para criação do evento
  onSubmit(): void {
    if (this.formulario.status === "INVALID"){
      //Se o formulario estiver inválido, diga ao usuário
      console.log(this.formulario.status);
      console.log(this.formulario.value);
      console.log("Formulario invalido");
      this.alertService.presentToast("Formulário inválido, por favor preecha corretamente os campos",'danger');
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
      this.alertService.presentToast('Novo evento criado!','dark');
      //Retorne pra tela de eventos
      this.location.back();
      /* Falta incluir  travativa de erros */
    }

  }


 

}
