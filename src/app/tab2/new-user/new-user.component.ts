import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { User } from 'src/app/models/models';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {

  formulario: FormGroup;
  private t: string = '';

  private newUser: User = {
    usuario_id:null,
    avatar: null,
    nome: null,
    cpf:null,
    telefone: null,
    email: null,
    senha: null,
    departamento: null,
    eventos: [],
    carga_horaria: null,
    data_ingresso : null,
    criado_em: null,
    atualizado_em: null
  }

  constructor (
    private userService : UserService, 
    private alertService : AlertService
  ) { }

  ngOnInit() {
    
    //Construção do formulário reativo
      this.formulario = new FormGroup({
        nome: new FormControl(null, Validators.required),
        cpf: new FormControl(null, Validators.required),
        telefone:new FormControl(null, Validators.required),
        data_ingresso: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required),
        senha: new FormControl(null, Validators.required),
        departamento: new FormControl(null, Validators.required)
      });
  }

  //Checkar arquivos
  inputFileChange(event){
    if (event.target.files && event.target.files[0]){
      const img = event.taret.files[0];
    }
  }
  //Função para criação do usuário
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
      this.newUser = this.formulario.value;
      
      //Envie para o servidor
      this.userService.createUser(this.newUser).then(
        //Vai ter que esperar a resposta aqui para mostrar o present Toast;
        resp => {this.alertService.presentToast(resp,'dark')},
        erro => {this.alertService.presentToast(erro,'danger')}
      );
      console.log(this.formulario);
      //Informe ao usuário que o evento foi criado
      
      //Retorne pra tela de eventos
      
      /* Falta incluir  travativa de erros */
    }

  }

}
