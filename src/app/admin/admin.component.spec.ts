import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CreateQuizService } from '../service/create-quiz.service';

import { AdminComponent } from './admin.component';

fdescribe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let router: Router;
  let createQuizService: CreateQuizService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports:[
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers:[
        {provide: CreateQuizService, useValue: {selectedData: () => of({}), postApiQuestions: () => of({}) }},
        //{provide: Router, useValue: {navigate: () => {}}}
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({amount: 123})
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    createQuizService= TestBed.inject(CreateQuizService);
    //router= TestBed.inject(Router);
    // route= new ActivatedRoute();
    // route.params = of({id:"testId"});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should call selectedData method from service", ()=>{
    let spy= spyOn(createQuizService, 'selectedData').and.returnValue(of({
      amount:0, category: 'sports', difficulty: 'easy', type:'multiple', paper:'paper 1'
    }));
    component.saveSelection();
    expect(spy).toHaveBeenCalled();
  });

  
  xit("Should call postApiQuestions method from service", ()=>{
    let spy= spyOn(createQuizService, 'postApiQuestions').and.returnValue(of({
      amount:0, category: 'sports', difficulty: 'easy', type:'multiple', paper:'paper 1'
    }));
    component.saveSelection();
    expect(spy).toHaveBeenCalled();
  });

  xit("Should navigate to login", ()=>{
    // let spy= spyOn(createQuizService, 'postApiQuestions').and.returnValue(of({
    //   amount:0, category: 'sports', difficulty: 'easy', type:'multiple', paper:'paper 1'
    // }));
    let navigate= spyOn(router, 'navigate');
    component.saveSelection();
    component.saveSelection();
    //expect(spy).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalled();
    expect(navigate.calls.first().args[0]).toContain('/admin-dashboard');
  });
});
