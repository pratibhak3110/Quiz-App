import { TestBed } from '@angular/core/testing';

import { CreateQuizService } from './create-quiz.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { QuizData } from '../shared/questions.module';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

fdescribe('CreateQuizService', () => {
  let service: CreateQuizService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers:[
        CreateQuizService
      ]
    });
  });
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateQuizService);
    httpMock = TestBed.inject(HttpTestingController); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('Should retrive quiz paper from API via GET ', () => {
    const dummyQuestion: any[]= [
     {
        id: 1,
        paper: 'Paper 1',
        questionSet:[{
          category: 'General Knowledge',
          type: 'multiple',
          difficulty: 'easy',
          question: 'Abc abc abc?',
          correct_answer: 'abc',
          incorrect_answers: []
      }]
    },
    {
      id: 1,
      paper: 'Paper 1',
      questionSet:[{
        category: 'General Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question: 'Abc abc abc?',
        correct_answer: 'abc',
        incorrect_answers: []
    }]
  }
    ];

    service.selectedData(10, 21, 'easy','multiple','paper 1').subscribe(response =>{
      expect(response.length).toBe(2);
      expect(response).toEqual(dummyQuestion);
    });

    const request = httpMock.expectOne(`${service.generalKnowledgeUrl}?amount=10&category=21&difficulty=easy&type=multiple&paper=paper 1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyQuestion);
  });

  it('Should find question paper by ID from API via GET ', () => {
    const dummyQuestion: any[]= [
      {  id: 1,
              paper: 'Paper 1',
              questionSet:[{
                category: 'General Knowledge',
                type: 'multiple',
                difficulty: 'easy',
                question: 'Abc abc abc?',
                correct_answer: 'abc',
                incorrect_answers: []
            }]},
      {  id: 1,
              paper: 'Paper 1',
              questionSet:[{
                category: 'General Knowledge',
                type: 'multiple',
                difficulty: 'easy',
                question: 'Abc abc abc?',
                correct_answer: 'abc',
                incorrect_answers: []
            }]}
    ];

    service.findQuestionPaper(1).subscribe(res =>{
      expect(res.length).toBe(2);
      expect(res).toEqual(dummyQuestion);
    });

    const request = httpMock.expectOne(`${service.quizDataUrl}/1`);
    expect(request.request.method).toBe('GET');
    
    request.flush(dummyQuestion);
  });

  it('Should get question by Id', () => {
    const dummyQuestion: any[]= [
      {  id: 1,
              paper: 'Paper 1',
              questionSet:[{
                category: 'General Knowledge',
                type: 'multiple',
                difficulty: 'easy',
                question: 'Abc abc abc?',
                correct_answer: 'abc',
                incorrect_answers: []
            }]},
      {  id: 1,
              paper: 'Paper 1',
              questionSet:[{
                category: 'General Knowledge',
                type: 'multiple',
                difficulty: 'easy',
                question: 'Abc abc abc?',
                correct_answer: 'abc',
                incorrect_answers: []
            }]}
    ];

    service.getApiQuestion(1).subscribe(res =>{
      expect(res.length).toBe(2);
      expect(res).toEqual(dummyQuestion);
    });

    const request = httpMock.expectOne(`${service.quizDataUrl}?id=1`);
    expect(request.request.method).toBe('GET');
    
    request.flush(dummyQuestion);
  });

  it('Should get questions from Api', ()=>{
    const dummyQuestion: any[]= [
      {  id: 1,
              response_code:0,
              results:[{
                category: 'General Knowledge',
                type: 'multiple',
                difficulty: 'easy',
                question: 'Abc abc abc?',
                correct_answer: 'abc',
                incorrect_answers: []
            }]},
      {  
        id: 1,
        response_code:0,
        results:[{
          category: 'General Knowledge',
          type: 'multiple',
          difficulty: 'easy',
          question: 'Abc abc abc?',
          correct_answer: 'abc',
          incorrect_answers: []
            }]}
    ];

    service.getQuestions().subscribe(response =>{
      expect(response.length).toBe(2);
      expect(response).toEqual(dummyQuestion);
    });

    const request = httpMock.expectOne(`${service.quizDataUrl}`);
    expect(request.request.method).toBe('GET');
    
    request.flush(dummyQuestion);
  });

  it('Should delete paper from Api', ()=>{
    const dummyQuestion: any[]= [
      {  id: 1,
        response_code:0,
        results:[{
          category: 'General Knowledge',
          type: 'multiple',
          difficulty: 'easy',
          question: 'Abc abc abc?',
          correct_answer: 'abc',
          incorrect_answers: []
            }]},
      { 
         id: 1,
         response_code:0,
         results:[{
           category: 'General Knowledge',
           type: 'multiple',
           difficulty: 'easy',
           question: 'Abc abc abc?',
           incorrect_answers: []
            }]}
    ];

    service.deleteQuizPaper(1).subscribe(books =>{
      expect(books.length).toBe(2);
      expect(books).toEqual(dummyQuestion);
    });

    const request = httpMock.expectOne(`${service.quizDataUrl}/1`);
    expect(request.request.method).toBe('DELETE');
    
    request.flush(dummyQuestion);
  });

  it('Should post the data',()=>{
    const newData: QuizData[] = [
    {
      id:1,
      paper:"Paper 1",
      questionSet:[{
      category:"General Knowledge",
      type:"multiple",
      difficulty:"easy",
      question:"Abc abc abc?",
      correct_answer:"abc",
      incorrect_answers:[]
      }]
    },
    { 
        id: 1,
        paper: 'Paper 1',
        questionSet:[{
          category: 'General Knowledge',
          type: 'multiple',
          difficulty: 'easy',
          question: 'Abc abc abc?',
          correct_answer: 'abc',
          incorrect_answers: []
        }]
      }
  ]

    service.postApiQuestions(newData).subscribe(
      data => expect(data).toEqual(newData)
    );

    const req = httpMock.expectOne(service.quizDataUrl);
    expect(req.request.method).toEqual('POST');

    const expectedResponse = new HttpResponse({ status: 201, statusText: 'done', body: newData });
    req.event(expectedResponse);
  })

});
