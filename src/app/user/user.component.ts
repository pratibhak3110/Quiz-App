import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateQuizService } from '../service/create-quiz.service';
import { UserValue } from '../shared/signup';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild('name') userName!: ElementRef<any>;
  subscription!: any;
  userValue!: UserValue
  routedData!: UserValue;
  userForm!: FormGroup;
  questionArray!: any[];
  constructor(
    private router: Router,
    private createQuizService: CreateQuizService
  ){
    this.userValue= new UserValue();
  }
  ngOnInit(): void {
       this.createQuizService.getQuestions().subscribe((data) => {
      console.log(data);
      this.questionArray = data;
      console.log(this.questionArray);
    });

    this.userForm= new FormGroup({
      id: new FormControl()
    })
  }

 startQuiz(){
   this.router.navigate(['/takeQuiz/',this.userValue.id]);
   localStorage.setItem("name", this.userName.nativeElement.value);
 }


}
