import { Component, OnInit } from '@angular/core';
import { SpeakerService } from 'src/app/services/speaker/speaker.service';
import { Palestrante } from 'src/app/models/models';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.page.html',
  styleUrls: ['./speaker.page.scss'],
})
export class SpeakerPage implements OnInit {
  public palestrantes: Palestrante[] = [];

  constructor(
    private speakerService: SpeakerService
  ) { }

  ngOnInit() {
    this.speakerService.getAll().subscribe(
      (data: Palestrante[]) => this.palestrantes = data,
      (error) => console.log(error)
    )
  }

}
