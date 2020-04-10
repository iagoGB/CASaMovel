import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';
import { Event } from 'src/app/models/models';
import { UserService } from 'src/app/services/user/user.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.page.html',
  styleUrls: ['./detail-event.page.scss'],
})
export class DetailEventPage implements OnInit {

  public event: Event = {
    id : null,
    imagem: null,
    foto: '',
    titulo: '',
    data_horario: null,
    local: '',
    categoria: null,
    palestrante: [""],
    carga_horaria: 0,
    criado_em: null,
    atualizado_em: null,

  }

  constructor (
    private eventService: EventService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.route.params.subscribe (
      (params: any) => {
        const id = params['id'];
        console.log(id);
        const event$ = this.eventService.loadByID(id);
        event$.subscribe (
          data => {
            this.event = data.body;
          }
        )
      }
    )
  }

  subscribeToEvent(id: number) : void {
    this.eventService.subscribeToEvent(id)
      .subscribe ((value) => {
        this.alertService.presentToast("Funcionou, "+ value,'sucess')
      },
      (erro) => {
        this.alertService.presentToast("Deu erro kkkkj: "+ erro, 'danger')
      }
    );
  }
}
