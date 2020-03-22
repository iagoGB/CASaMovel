import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';
import { Event } from 'src/app/models/models';

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
    private http: EventService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe (
      (params: any) => {
        const id = params['id'];
        console.log(id);
        const event$ = this.http.loadByID(id);
        event$.subscribe (
          data => {
            this.event = data.body;
          }
        )
      }
    )
  }

}
