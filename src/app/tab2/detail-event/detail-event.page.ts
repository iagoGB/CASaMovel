import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';
import { Event } from 'src/app/models/models';
import { UserService } from 'src/app/services/user/user.service';
import { AlertService, ToastColor } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';



@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.page.html',
  styleUrls: ['./detail-event.page.scss'],
})
export class DetailEventPage implements OnInit {


  public subscribed: boolean;
  public actualRole: string;

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
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private alertService: AlertService,
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.authService.checkRole().then((value)=>{
      this.actualRole = value;
    });
    this.route.params.subscribe (
      (params: any) => {
        const id = params['id'];
        console.log(id);
        const event$ = this.eventService.loadByID(id);
        event$.subscribe (
          data => {
            this.event = data.body;
            this.userService.loadUser().subscribe( (resp)=>{
              this.subscribed = resp.body.eventos.some(event => event.id === this.event.id);
            })
          }
        );
        
      }
    );

  }

  subscribeToEvent(id: number) : void {
    this.eventService.subscribeToEvent(id)
      .subscribe ((value) => {
        this.alertService.presentToast("Você foi inserido na lista de participantes",ToastColor.PRI);
        this.subscribed = true;
      },
      (erro) => {
        this.alertService.presentToast(erro, ToastColor.DAN)
      }
    );
  }

  unsubscribeToEvent(id: number) : void {
    this.eventService.unsubscribeToEvent(id)
      .subscribe ((value) => {
        this.alertService.presentToast("Você não está mais inscrito no evento",ToastColor.DARK);
        this.subscribed = false;
      },
      (erro) => {
        this.alertService.presentToast("Ocorreu um erro ao solicitar remoção do evento. Tente novamente", ToastColor.DAN)
      }
    );
  }

  openInputFile(): void {
    document.getElementById('image').click()
  }

  updateEventImage(event: any): void {
      if (event.target.files && event.target.files[0]) {
        const selectedFiles = <FileList> event.srcElement.files;
        this.eventService.updateImageEvent(this.event.id,selectedFiles[0]).subscribe((value:any)=>{
          this.previewImage(selectedFiles[0]);
        },
        (err)=>{console.log(err)});
      }
  }

  previewImage(file: any){
    const image = document.getElementById('foto') as HTMLImageElement;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function (e) {
      image.src = e.target.result as string;
    };
  }
}
