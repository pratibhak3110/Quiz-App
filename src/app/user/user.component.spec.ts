import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CreateQuizService } from '../service/create-quiz.service';

import { UserComponent } from './user.component';

fdescribe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let createQuizService: CreateQuizService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports:[
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers:[
        CreateQuizService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    createQuizService= TestBed.inject(CreateQuizService);
    router= TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should take values for form',()=>{
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.userForm.value).toEqual({id:null});
  })

  it('Should call getQuestions method from service',() =>{
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
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('Should navigate to takeQuiz page', ()=>{
    let navigate= spyOn(router, 'navigate');
    component.startQuiz();
    expect(navigate.calls.first().args[0]).toContain('/takeQuiz/',0);
  });

  xit('Should set value',()=>{
    let navigate= spyOn(router, 'navigate');
    let key="name";
    let value= component.userName.nativeElement.value;
    localStorage.setItem(key, value);
    component.startQuiz();
    expect(navigate.calls.first().args[0]).toContain('/takeQuiz/',0);
    expect(component.startQuiz()).toEqual(value);

  })
});
