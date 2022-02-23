import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { SignupService } from '../service/signup.service';

import { LoginComponent } from './login.component';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let signupService: SignupService;
  let auth: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        RouterTestingModule,
        HttpClientModule, 
        ReactiveFormsModule
      ],
      providers:[
        {provide: SignupService, useValue: {getData: ()=> of({})}},
        AuthService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    signupService= TestBed.inject(SignupService);
    auth= TestBed.inject(AuthService);
    router= TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call getData method from service', ()=>{
    const dummyData=[
      {
        email: 'pratibha@gmail.com',
        id:1,
        password:1234567890,
        usertype:'admin'
      },
      {
        email: 'p@gmail.com',
        id:1,
        password:1234567890,
        usertype:'user'
      }
    ];
    let spy= spyOn(signupService, 'getData').and.returnValue(of([dummyData]));
    component.login();
    expect(spy).toHaveBeenCalled();
  });



  it('Should login to admin if user is admin', ()=>{
    const dummyData1={
      email: 'pratibha@gmail.com',
      id:1,
      password:1234567890,
      usertype:"admin"
    }
    
    const loginFormAdmin= new FormGroup({
      email: new FormControl('pratibha@gmail.com'),
      id:new FormControl(1),
      password:new FormControl(1234567890),
      usertype:new FormControl("admin")
    });
  

    component.loginForm = loginFormAdmin;
    let spy= spyOn(signupService, 'getData').and.returnValue(of([dummyData1]));

    let key="name";
    let value= dummyData1.email;
    localStorage.setItem(key, value);

    let spyAuth= spyOn(auth, 'login').and.returnValue(of({
      response_code: 0,
      response_message: "Token Generated Successfully!",
      token: "4b43b011145b687d0a6b8c56c1eb96f81"
    }));
    let navigate= spyOn(router, 'navigate');
    component.login();

    expect(spyAuth).toHaveBeenCalled();
    expect(navigate.calls.first().args[0]).toContain('/admin-dashboard');
    expect(spy).toHaveBeenCalled();
  });


  it('Should login to user if user is user', ()=>{
    const dummyData2={
      email: 'pratibha@gmail.com',
      id:1,
      password:1234567890,
      usertype:"user"
    }
    
    const loginFormUser= new FormGroup({
      email: new FormControl('pratibha@gmail.com'),
      id:new FormControl(1),
      password:new FormControl(1234567890),
      usertype:new FormControl("admin")
    });
  

    component.loginForm = loginFormUser;
    let spy= spyOn(signupService, 'getData').and.returnValue(of([dummyData2]));

    let navigate= spyOn(router, 'navigate');
    component.login();

    expect(navigate.calls.first().args[0]).toContain('/user');
    expect(spy).toHaveBeenCalled();
  });


});
