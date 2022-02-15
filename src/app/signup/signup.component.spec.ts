import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';
import { SignupService } from '../service/signup.service';
import { SignupClass } from '../shared/signup';

import { SignupComponent } from './signup.component';

fdescribe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let signupService: SignupService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: SignupComponent},
        ]),
        ReactiveFormsModule
      ],
      providers:[
        SignupService,
       // { provide: Router, useClass: { navigate:()=>{}}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    signupService= TestBed.inject(SignupService);
    router= TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call postData method', ()=>{
    let spy= spyOn(signupService, 'postData').and.returnValue(of({
      email: "prajkta@gmail.com",
      id: 11,
      password: "1234567890",
      usertype: "user"
    }));
    component.submitForm();
    expect(spy).toHaveBeenCalled();
  });

  it("should call alert while calling POST method", () => {

    spyOn(signupService, 'postData').and.returnValue(of({
      email: "prajkta@gmail.com",
      id: 11,
      password: "1234567890",
      usertype: "user"
    }))
    spyOn(window, "alert");
    component.submitForm();
    expect(window.alert).toHaveBeenCalledWith("Registration Successful");
 });  

 it('Should navigate to login page',()=>{
  spyOn(signupService, 'postData').and.returnValue(of({
    email: "prajkta@gmail.com",
    id: 11,
    password: "1234567890",
    usertype: "user"
  }));

  let navigate= spyOn(router,'navigate');
  component.submitForm();
  //expect(navigate).toHaveBeenCalled();
  expect(navigate.calls.first().args[0]).toContain('/login');
  });

  xit('Should call alert for error', ()=>{
    spyOn(signupService, 'postData').and.returnValue(of({Error}))
    spyOn(window, "alert");
    component.submitForm();
    expect(window.alert).toHaveBeenCalledWith("Something went wrong");
  })
});
