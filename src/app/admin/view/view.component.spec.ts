import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, from } from 'rxjs';
//import { from } from 'rxjs/Observable';
import { CreateQuizService } from 'src/app/service/create-quiz.service';

import { ViewComponent } from './view.component';


fdescribe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let createQuizService: CreateQuizService;
  let router: Router;
 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewComponent ],
      imports:[
        HttpClientModule,
        RouterTestingModule,
      ],
      providers:[
        {provide: CreateQuizService, useValue: {findQuestionPaper: () => of({})}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    createQuizService= TestBed.inject(CreateQuizService);
    router= TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call findQuestionPaper method from service', ()=>{
    let spy= spyOn(createQuizService, 'findQuestionPaper').and.returnValue(of({
      paper: 'paper 1', 
      questionSet:[{
        category: 'Sports',
        type: 'multiple',
        difficulty: 'easy',
        question: 'Abc wertyu',
        correct_answer: 'abc',
        incorrect_answers: []
      }]
    }));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to dashboard', () => {
    let navigate= spyOn(router, 'navigate');
    component.backToHome();
    //expect(navigate).toHaveBeenCalled();
    expect(navigate.calls.first().args[0]).toContain('/admin-dashboard');
  });
  
});
