import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SignupService } from '../service/signup.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let signupService: SignupService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        RouterTestingModule,
        HttpClientModule, 
      ],
      providers:[
        {provide: SignupService, useValue: {getData: ()=> of({})}},
        SignupService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    signupService= TestBed.get(SignupService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call getData method from service', ()=>{
    let spy= spyOn(signupService, 'getData').and.returnValue(of({}));
    component.login();
    expect(spy).toHaveBeenCalled();
  })

});
