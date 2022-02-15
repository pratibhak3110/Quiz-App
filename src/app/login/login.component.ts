import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from '../service/signup.service';
import { AuthService } from '../service/auth.service';
import { SignupClass } from '../shared/signup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  email!: string;
  signupClass!: SignupClass;
  id!: number;
  @ViewChild('email') userEmail!: ElementRef;

  constructor(
    public signupService: SignupService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      usertype: new FormControl('user', Validators.required)
    })

  }

  login(){
   
    this.signupService.getData().subscribe(res =>{
    const user= res.find((response: any) =>{
    
      if("admin" == response.usertype && response.email=== this.loginForm.value.email && response.password === this.loginForm.value.password){
        localStorage.setItem("email", this.userEmail.nativeElement.value); 
          let Form = JSON.stringify(this.loginForm.value);
          this.auth.login(Form).subscribe(
            res =>{
              if(res.response_code==0){
                console.log(res);
                localStorage.setItem("token", res.token);
                alert(res.response_message);
              } else{
                alert("Something went wrong");
              }
            }
          )
        
       this.router.navigate(['/admin-dashboard']);
      }
      if("user" == response.usertype && response.email=== this.loginForm.value.email && response.password === this.loginForm.value.password){
        let Form = JSON.stringify(this.loginForm.value);
        this.auth.login(Form).subscribe(
          res =>{
           console.log(res);
          }
        )
        this.router.navigate(['/user']);
       }
       else{
      console.log("User Not Found");
       }
    })
    }, 
    err =>{
      alert("Something went Wrong");
    })
  }

}
