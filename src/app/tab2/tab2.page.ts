import { Component } from '@angular/core';
import { User } from '../models/models';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  private user: User = {
    id: 1,
    nome: "Professor X",
    departamento:"STI",
    data_entrada: null,
    carga_horaria: 5
  }
}