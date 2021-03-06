import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';
import { Event } from 'src/app/models/models';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.page.html',
  styleUrls: ['./detail-event.page.scss'],
})
export class DetailEventPage implements OnInit {

  private event: Event = {
    evento_id : null,
    titulo: '',
    data_horario: null,
    localizacao: '',
    palestrante: [],
    carga_horaria: 0,
    criado_em: null,
    atualizado_em: null,

  }

  constructor (
    private http: HttpService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe (
      (params: any) => {
        const id = params['id'];
        console.log(id);
        const event$ = this.http.loadByID(id);
        event$.subscribe (
          data => {
            this.event = data;
          }
        )
      }
    )
  }

}
