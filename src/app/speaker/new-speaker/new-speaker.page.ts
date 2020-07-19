import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpeakerService } from 'src/app/services/speaker/speaker.service';
import { AlertService, ToastColor } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-new-speaker',
  templateUrl: './new-speaker.page.html',
  styleUrls: ['./new-speaker.page.scss'],
})
export class NewSpeakerPage implements OnInit {
  formulario: FormGroup;

  constructor(
    private speakerService: SpeakerService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.formulario = new FormGroup({
      foto: new FormControl(null,Validators.required),
      nome: new FormControl(null, Validators.required),
      descricao: new FormControl(null, Validators.required)
    })
  }

  getFile(event){
    if (event.target.files && event.target.files[0]) {
      const selectedFiles = <FileList> event.srcElement.files;
      this.formulario.controls['foto'].setValue(selectedFiles[0]);
      this.previewImage(selectedFiles[0]);
    }
  
  }

  previewImage(file: File){
    const image = document.getElementById('foto') as HTMLImageElement;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function (e) {
      image.src = e.target.result as string;
    };
  }

  onSubmit(){
    console.log(this.formulario);
    this.speakerService.save(this.formulario).subscribe(
      (sucess) => {
        this.alertService.presentToast("Usuário criado com sucesso",ToastColor.SUC);
      },
      (error) => this.alertService.presentToast("Erro ao cadastrar palestrante", ToastColor.DAN)
    );
  }



}
