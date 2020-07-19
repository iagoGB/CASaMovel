import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewSpeakerPage } from './new-speaker.page';

describe('NewSpeakerPage', () => {
  let component: NewSpeakerPage;
  let fixture: ComponentFixture<NewSpeakerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSpeakerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewSpeakerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
