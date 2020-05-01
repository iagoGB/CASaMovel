import { Component } from '@angular/core';
import { User } from '../models/models';
import { UserService } from '../services/user/user.service';
import { AlertService, ToastColor } from '../services/alert/alert.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public user: any;
  public profileUser: User = {
    usuario_id: null,
    avatar: null,
    nome: null,
    cpf: null,
    telefone: null,
    email: null,
    senha: null,
    departamento: null,
    eventos: [],
    carga_horaria: null,
    data_ingresso: null,
    criado_em: null,
    atualizado_em: null
  }

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {
    //this.userService.getId();
    
  }

  ngOnInit(){
    this.userService.loadUser()
    .subscribe( 
      resp => { this.profileUser = resp.body;  console.log(resp); },
      erro => { this.alertService.presentToast(erro.message, ToastColor.DAN);}
    );
  }
}