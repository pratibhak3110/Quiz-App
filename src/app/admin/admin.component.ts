
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CreateQuizService } from '../service/create-quiz.service';
import { QuizData } from '../shared/questions.module';
import { AdminValue } from '../shared/signup';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  generalKnowledgeArr!: any[];
  selectedCategory: string = '';
  adminvalue!: AdminValue;
  adminForm!: FormGroup;
  quizDataArr: QuizData[]=[];
  subscription!: any;
  routedData!: AdminValue;

  constructor(
    private router: Router,
    private createQuizService: CreateQuizService,
    private _activatedRoute: ActivatedRoute
  ) { 
  }

  ngOnInit(): void {
    this.adminForm= new FormGroup({
      amount: new FormControl(),
      category: new FormControl(),
      difficulty: new FormControl(),
      type: new FormControl(),
      paper: new FormControl()
    }) 
  }

  saveSelection(){
    this.subscription = this._activatedRoute.params.subscribe((res: any) => {
      for(let i=0; i<=res.length-1;i++)
          {
           const control = <FormArray>this.adminForm.get('this.adminForm.value');
            let item =control.at(i);
            item.patchValue({
              amount: res[i].amount,
              category:res[i].category,
              diffuculty: res[i].difficulty,
              type: res[i].type,
              paper: res[i].paper
           });
          }
    });
    this.createQuizService.selectedData(this.adminForm.value.amount, this.adminForm.value.category, this.adminForm.value.difficulty, this.adminForm.value.type, this.adminForm.value.paper).subscribe(
      res =>{
        console.log(res);
        this.quizDataArr.push(res.results);
        console.log(this.quizDataArr);

        this.createQuizService.postApiQuestions(res).subscribe(res =>{
          console.log(res); 
          this.router.navigate(['/admin-dashboard']);
        });
      })
      this.adminForm.reset();
     
  }

}
