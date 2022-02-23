import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateQuizService } from 'src/app/service/create-quiz.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  email: string= "";
  questionArray: any[]=[];
  constructor(
    private createQuizService: CreateQuizService,
    private router: Router
  ) { }

  ngOnInit(): void {
   this.getValue();
    this.getQuestion();
  }

  getValue(){
    return this.email= localStorage.getItem("email")!;
  }

  getQuestion(){
    this.createQuizService.getQuestions().subscribe((data) => {
      console.log(data);
      this.questionArray = data;
      console.log(this.questionArray);
    });
  }

  viewPaper(id: any){
    this.router.navigate(['/view/', id]);
  }
  
  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  deleteQuiz(id: number){
    this.createQuizService.deleteQuizPaper(id).subscribe(res =>{
      console.log(res);
      alert("Paper deleted Successfully");
      this.getQuestion()
    })
  }
}
