import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { AccordionListComponent } from './accordion-list/accordion-list.component';

@NgModule({
    imports:[
        IonicModule,
        CommonModule,
        FormsModule
    ],
    declarations:[
        HeaderComponent,
        AccordionListComponent
    ],
    exports:[
        HeaderComponent,
        AccordionListComponent
    ]
})
export class SharedComponentModule{}