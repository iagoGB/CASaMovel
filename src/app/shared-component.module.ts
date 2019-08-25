import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';

@NgModule({
    imports:[
        IonicModule,
        CommonModule,
        FormsModule
    ],
    declarations:[
        HeaderComponent
    ],
    exports:[
        HeaderComponent
    ]
})
export class SharedComponentModule{}