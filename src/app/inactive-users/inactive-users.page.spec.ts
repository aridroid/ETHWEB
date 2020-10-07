import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InactiveUsersPage } from './inactive-users.page';

describe('InactiveUsersPage', () => {
  let component: InactiveUsersPage;
  let fixture: ComponentFixture<InactiveUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveUsersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InactiveUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
