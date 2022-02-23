import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CreateQuizService } from 'src/app/service/create-quiz.service';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { QuizData } from 'src/app/shared/questions.module';

fdescribe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let createQuizService: CreateQuizService;
  let router: Router;
 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardComponent ],
      imports:[
        HttpClientModule,
      ],
      providers:[
        CreateQuizService,
        {provide: Router, useValue: {navigate: () => {}}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    createQuizService= TestBed.inject(CreateQuizService);
    router= TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get value', ()=>{
    let key = "email";
    localStorage.getItem(key);
    let result = component.getValue();
    expect(result).toEqual(component.email);
  });

  it('Should call getQuestions() method from service',()=>{
   let spy= spyOn(createQuizService, 'getQuestions').and.returnValue(of({
    id:0,
    response_code: 0,
    results:[{
     category:'Sports',
     type: 'medium',
     difficulty: 'easy',
     question: 'Abc?',
     correct_answer: 'option 1',
     incorrect_answers: []
    }]
   }));
    component.getQuestion();
    expect(spy).toHaveBeenCalled();
  })

   it('Should call deleteQuizPaper method', () => {
    let spy= spyOn(createQuizService, 'deleteQuizPaper').and.returnValue(of({}));
    component.deleteQuiz(0);
    expect(spy).toHaveBeenCalled();
  });

  it("should call alert while calling Delete method", () => {

    spyOn(createQuizService, 'deleteQuizPaper').and.returnValue(of({}))
    spyOn(window, "alert");
    component.deleteQuiz(0);
    expect(window.alert).toHaveBeenCalledWith("Paper deleted Successfully");
 });  

 it('should clear everything', () => {
  component.logout();
  var result = localStorage.length;
  expect(result).toEqual(0);
});

it('should navigate to login page', () => {
  let navigate= spyOn(router, 'navigate');
  component.logout();
  var result = localStorage.length;
  expect(result).toEqual(0);
  expect(navigate.calls.first().args[0]).toContain('/login');
});

it('Should navigate to view page to view quiz details',()=>{
let navigate= spyOn(router,'navigate');
component.viewPaper(0);
expect(navigate.calls.first().args[0]).toContain('/view/', 1);
})

});
