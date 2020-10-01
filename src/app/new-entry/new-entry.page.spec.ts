import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewEntryPage } from './new-entry.page';

describe('NewEntryPage', () => {
  let component: NewEntryPage;
  let fixture: ComponentFixture<NewEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
