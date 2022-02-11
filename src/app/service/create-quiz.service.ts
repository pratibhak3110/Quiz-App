import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { QuizData } from '../shared/questions.module';
import { AdminValue, UserValue } from '../shared/signup';
import { UserComponent } from '../user/user.component';

@Injectable({
  providedIn: 'root'
})
export class CreateQuizService {
  seconds!: number;
  questionSet:QuizData[]=[];
  adminValue!: AdminValue;
  
  private generalKnowledgeUrl= "https://opentdb.com/api.php";
  private quizDataUrl= "http://localhost:3000/quizData";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  selectedData(amount?: number, category?: number, diff?: string, type?: string, paper?: any): Observable<any>{
    //  params= {
    //   amount: 0,
    //   category: 0,
    //   difficulty: "",
    //   type: ""
    // }

    //https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
     return this.http.get<any>(this.generalKnowledgeUrl + `?amount=${amount}&category=${category}&difficulty=${diff}&type=${type}&paper=${paper}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  postApiQuestions(data: QuizData){
    // let paperName = data.pop();
    // console.log(paperName);
    // data.splice(0,0, paperName)
  //data.push(pap)
 // this.questionSet.push(data);
    return this.http.post<QuizData>(this.quizDataUrl, JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getApiQuestion(id: number): Observable<any>{
    return this.http.get<any>(this.quizDataUrl + `?id=${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getQuestions():Observable<any>{
    return this.http.get<any>(this.quizDataUrl)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  findQuestionPaper(id: number): Observable<any> {
    return this.http.get(this.quizDataUrl +"/" + id) 
    .pipe(
    catchError(this.errorHandler)
    )
  }

  deleteQuizPaper(id: number): Observable<any>{
    return this.http.delete(this.quizDataUrl+"/" + id)
    .pipe(
      catchError(this.errorHandler)
      )
  }



  displayTimeElapsed(){
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
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
