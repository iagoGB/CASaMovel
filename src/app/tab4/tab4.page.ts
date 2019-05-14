import { Component, OnInit } from '@angular/core';
import { User } from '../models/models';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  private user: User = {
    id: 1,
    name: "Professor X",
    departament:"STI",
    dateEntrace: null,
    ch: 5
  }
  constructor() { }

  ngOnInit( ) {

  }

}
