import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { AdminComponent } from './admin.component';

fdescribe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let route : ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports:[
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
        // CreateQuizService,
        //  {provide: Router, useValue: {navigate: () => {}}},
        // {
        //   provide: ActivatedRoute,
        //   useValue: {
        //     params: of([{id: 1}]),
        //   },
        // },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    route= new ActivatedRoute();
    route.params = of({id:"testId"});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
