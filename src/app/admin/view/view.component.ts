import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateQuizService } from 'src/app/service/create-quiz.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  id!: number;
  quizData!: any[];
  constructor(
    private createQuizService: CreateQuizService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id= this.route.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.createQuizService.findQuestionPaper(this.id).subscribe(data => {
      this.quizData= data.results;
      console.log(this.quizData);
    });
  }
  
  backToHome(){
    this.router.navigate(['/admin-dashboard']);
  }

}
