import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { interval } from 'rxjs';
import { CreateQuizService } from 'src/app/service/create-quiz.service';
import { UserValue } from 'src/app/shared/signup';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})

export class TakeQuizComponent implements OnInit {
   name: string= "";
   subscription!: any;
   routedData!: UserValue;

    questionList: any=[];
    currentQuestion: number =0;
    points: number=0;
   counter= 120;
   correctAnswer: number=0;
   inCorrectAnswer: number=0;
   interval: 0 | any;
   progress: string="0";
   isQuizCompleted: boolean= false;
  question: any;

  constructor(
    public createQuizService: CreateQuizService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ){
    this.routedData = new UserValue();
  }
  ngOnInit() {
    this.subscription = this._activatedRoute.params.subscribe((param: Params) => {
      this.routedData.id = parseInt(param['id']);
      console.log("routed data", this.routedData);
      console.log("paper name is", this.routedData.id)
    });
    
    this.createQuizService.getApiQuestion(this.routedData.id).subscribe(res => {
      console.log("res is ", res);

      for (let i = 0; i < res.length; i++) {
           this.questionList= res
           console.log("response array is", this.questionList);
      }
      console.log("question is ", this.questionList[0]);  
    })
   
      this.name= localStorage.getItem("name")!;
      this.startCounter();
  }


  nextQuestion(){
    this.currentQuestion++;
    if((this.currentQuestion+1) === this.questionList.length){
      this.isQuizCompleted= true;
      this.stopCounter();
    }
  }
  previousQuestion(){
    this.currentQuestion--;
  }

  answer(currentQues: number, selectedOption: any){
    if(currentQues === this.questionList[0].results.length -1){
      this.isQuizCompleted= true;
      this.stopCounter();
    }
    if(selectedOption=== this.questionList[0].results[currentQues].correct_answer){
      this.points+= 10;
      this.correctAnswer++;
      setTimeout(() =>{
        this.currentQuestion++;
        this.getProgressPercent();
      },1000)

     
    } else{
      setTimeout(() =>{
        this.points-= 10;
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.getProgressPercent();
      },1000)
    }
    
  }

  startCounter(){
    this.interval= interval(1000).subscribe(value =>{
      this.counter--;
      if(this.counter === 0 ){
        this.isQuizCompleted= true;
      }
    });
    setTimeout(() =>{
      this.interval.unsubscribe();
    }, 600000)
  }

  stopCounter(){
    this.interval.unsubscribe();
    this.counter=0;
  }

  resetCounter(){
    this.stopCounter();
    this.counter= 60;
    this.startCounter();
  }

  resetQuiz(){
    this.resetCounter();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress="0";
    this.correctAnswer=0;
  }

  getProgressPercent(){
    this.progress = ((this.currentQuestion / this.questionList[0].results.length)*100).toString();
    return this.progress;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
