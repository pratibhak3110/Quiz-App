import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SignupClass } from '../shared/signup';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  
  private apiUrl= "http://localhost:3000/signup";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(
    private http: HttpClient
  ) { }

  getData(){
    return this.http.get<any>(this.apiUrl)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  find(email: string){
    return this.http.get(this.apiUrl + email) 
    .pipe(
    catchError(this.errorHandler)
    )
  }


  postData(data: SignupClass){
    return this.http.post<any>(this.apiUrl, JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  login(){
    return this.http
  }
 

  errorHandler(error: any){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
     errorMessage = 'Error Code: ${error.status}\nMessage: ${error.message}';
    }

    return throwError(errorMessage);
  }
}
