import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SignupClass } from '../shared/signup';

import { SignupService } from './signup.service';

fdescribe('SignupService', () => {
  let service: SignupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers:[
        SignupService
      ]
    });
  });
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupService);
    httpMock = TestBed.inject(HttpTestingController); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should get signup from Api', ()=>{
    const mockData: any[]= [
      {
        email: "pratibhakamble@gmail.com",
        password: "Pratibha@1",
        usertype: "admin",
        id: 1
      },
      {
        email: "kashmira@gmail.com",
        password: "Kashmira@1",
        usertype: "user",
        id: 2
      }
    ];

    service.getData().subscribe(res =>{
      expect(res.length).toBe(2);
      expect(res).toEqual(mockData);
    });

    const request = httpMock.expectOne(`${service.apiUrl}`);
    expect(request.request.method).toBe('GET');
    
    request.flush(mockData);
  });

  it('Should find data by email from API via GET ', () => {
    const mockData: any[]= [
      {
        email: "pratibhakamble@gmail.com",
        password: "Pratibha@1",
        usertype: "admin",
        id: 1
      },
      {
        email: "kashmira@gmail.com",
        password: "Kashmira@1",
        usertype: "user",
        id: 2
      }
    ];

    service.find(mockData[0].email).subscribe(res =>{
      expect(res).toEqual(mockData);
    });

    const request = httpMock.expectOne(`${service.apiUrl}pratibhakamble@gmail.com`);
    expect(request.request.method).toBe('GET');
    
    request.flush(mockData);
  });

  it('Should post the data',()=>{
    const newData: any[] = [
      {
        id: 1,
        email: "pratibhakamble@gmail.com",
        password: "Pratibha@1",
        usertype: "admin"
       
      },
      {
        id:2,
        email: "kashmira@gmail.com",
        password: "Kashmira@1",
        usertype: "user",
      }
  ]

    service.postData(newData).subscribe(
      data => expect(data).toEqual(newData)
    );

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toEqual('POST');

    const expectedResponse = new HttpResponse({ status: 201, statusText: 'done', body: newData });
    req.event(expectedResponse);
  });
  
});
