import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAndPasswordComponent } from './email-and-password.component';

describe('UsernameAndPasswordComponent', () => {
  let component: EmailAndPasswordComponent;
  let fixture: ComponentFixture<EmailAndPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailAndPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailAndPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
