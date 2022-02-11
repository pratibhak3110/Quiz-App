import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../service/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  constructor(
    private signupService: SignupService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm= new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      usertype: new FormControl('user', Validators.required)
    })
  }

  submitForm(){
    console.log(this.signupForm.value);
    this.signupService.postData(this.signupForm.value).subscribe((respose: any) => {
      localStorage.clear();
      localStorage.setItem('participant', JSON.stringify(respose));
      alert("Registration Successful");
      this.signupForm.reset();
      this.router.navigate(['/login']);
    }, err =>{
      alert("Something went wrong");
    })
    
  }

}
