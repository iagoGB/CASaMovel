import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { EventService } from '../../services/event/event.service';
import { Event, Categoria, Palestrante } from './../../models/models';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { UserService } from 'src/app/services/user/user.service';
import { SpeakerService } from 'src/app/services/speaker/speaker.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
})
export class NewEventPage implements OnInit {

  formulario: FormGroup;

  private categories: Categoria[];
  private speakers: Palestrante[];

  private newEvent: Event = {
    evento_id: null,
    imagem: "",
    titulo: "",
    local: "",
    categoria: null,
    palestrante: [""],
    data_horario: null,
    carga_horaria: 0,
    criado_em: null,
    atualizado_em: null
  }

  constructor (
    private formBuilder: FormBuilder,
    private http : EventService, 
    private alertService : AlertService,
    private eventService: EventService,
    private categoryService: CategoryService,
    private speakerService: SpeakerService,
    private location : Location
  ) { }

  ngOnInit() {
    //Pegue o token para quando for formar o header
    this.eventService.getToken();
    //Buscar a listagem de categoria
    this.categoryService.getAll().subscribe(
      (array)=> {   this.categories = array; this.categories.forEach ( c => console.log(c.id) )}, 
      (erro) =>{ this.alertService.presentToast(erro,'danger') }
    )
    
    this.speakerService.getAll().subscribe(
      (array) =>  { this.speakers = array; this.speakers.forEach ( c => console.log(c.nome)) },
      (erro) => this.alertService.presentToast(erro, 'danger')
    )
    
    //Construção do formulário reativo
      // this.formulario = new FormGroup({
      //   categoria: new FormControl(null, Validators.required),
      //   titulo: new FormControl(null, Validators.required),
      //   local: new FormControl(null, Validators.required),
      //   palestrante: new FormArray({
      //     FormControl(null)
      //   }),
      //   data_horario: new FormControl(null, Validators.required),
      //   carga_horaria: new FormControl(null, Validators.required)
      // });

    
      this.formulario = this.formBuilder.group({
        evento_id: [null],
        titulo: [null],
        local: [null],
        categoria: [null],
        palestrante: this.formBuilder.array([
          null
        ]),
        data_horario: [null],
        carga_horaria: [null],
      });
    
  }

  addPalestrante(){
    let palestrante = this.formulario.get('palestrante') as FormArray;
    palestrante.push(
      new FormControl(null)
    )

  }


  ngOnDestroy(){
    this.eventService.nullToken();
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
        sucess =>{ 
          this.alertService.presentToast('Novo evento criado!','dark');
          this.location.back();
        },
        error =>{ this.alertService.presentToast(error,'danger'); }

      );
      console.log(this.formulario);
      //Informe ao usuário que o evento foi criado
      
      //Retorne pra tela de eventos
      
      /* Falta incluir  travativa de erros */
    }

  }


 

}
