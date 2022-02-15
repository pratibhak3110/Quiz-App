import { HttpClientModule } from '@angular/common/http';
import { WriteKeyExpr } from '@angular/compiler';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CreateQuizService } from 'src/app/service/create-quiz.service';
import { QuizData } from 'src/app/shared/questions.module';

import { TakeQuizComponent } from './take-quiz.component';

fdescribe('TakeQuizComponent', () => {
  let component: TakeQuizComponent;
  let fixture: ComponentFixture<TakeQuizComponent>;
  let createQuizService: CreateQuizService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeQuizComponent ],
      imports:[
        HttpClientModule,
        RouterTestingModule,
      ],
      providers:[
        {provide: CreateQuizService, useValue:{ getApiQuestion:()=> of({id: 0})}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeQuizComponent);
    component = fixture.componentInstance;
    createQuizService= TestBed.inject(CreateQuizService);
    router= TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call getApiQuestion method from service',()=>{
    let spy= spyOn(createQuizService, 'getApiQuestion').and.returnValue(of({id:0}));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  xit('Check nextQuestion method',()=>{
    component.currentQuestion++;
    let currentQuestion= component.currentQuestion + 1;
    let questionList= component.questionList.length;
    let quizCompleted= component.isQuizCompleted;
    let result= currentQuestion === questionList;
    
    component.nextQuestion();
    expect(quizCompleted).toEqual(result);
  });

  it('should navigate to login page', () => {
    let navigate= spyOn(router, 'navigate');
    component.logout();
    var result = localStorage.length;
    expect(result).toEqual(0);
    //expect(navigate).toHaveBeenCalled();
    expect(navigate.calls.first().args[0]).toContain('/login');
  });

  xit('intervalValue should be 0 without fakeAsync and tick', () => {
    fixture.detectChanges();
    expect(component.interval).toBe(0);
    let counter=0;
    let count= counter--;
    count ===0;
    let quizCompleted= component.isQuizCompleted;
    expect( count ===0).toBe(!quizCompleted);
    
    //component.ngOnDestroy();
  });
  xit('intervalValue should be 1 with fakeAsync and tick',fakeAsync(() => {
    component.startCounter();
    fixture.detectChanges();
    tick(2000);
    fixture.detectChanges();
    expect(component.interval).toBe(1);
    // tick(1000);
    // fixture.detectChanges();
    // expect(component.interval).toBe(2);
    //component.ngOnDestroy();
  }));

  xit('Check answer method',()=>{
    const questionList: QuizData[]= [
      { id:0,
        paper: '',
        questionSet:[{
         category:'Sports',
         type: 'medium',
         difficulty: 'easy',
         question: 'Abc?',
         correct_answer: 'option 1',
         incorrect_answers: []
        }]}
    ];

    let currentQues = 0;
    let selectedOption= questionList[0].questionSet[0].correct_answer;
    component.answer(currentQues, selectedOption);
    let result= currentQues === questionList[0].questionSet.length-1;
    console.log(result);
    let quizCompleted= component.isQuizCompleted;
    expect(quizCompleted).toEqual(result);

  });

  xit('Should check method with interval', ()=>{
    let obsv= component.startCounter();
    let currentVal= undefined;
    const sub= currentVal= obsv;
    tick(1000);
    expect(sub).toEqual();
  });

 
});
