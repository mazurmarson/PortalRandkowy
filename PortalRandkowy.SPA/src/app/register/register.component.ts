import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare let alertify: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  model: any = {};
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private authService: AuthService, private alertify: AlertifyService ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('Podaj nazwę użytkownika', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      confirmPassword: new FormControl('', Validators.required)
    },this.passwordMatchValidator);
  }

  passwordMatchValidator(fg: FormGroup){
    return fg.get('password').value === fg.get('confirmPassword').value ? null : { mismatch: true }
  }

  // tslint:disable-next-line: typedef
  register() {
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertify.success('Rejestracja udana');
    // }, error => {
    //   this.alertify.error(error);
    // }
    // );
     console.log(this.registerForm.value);
  }

  // tslint:disable-next-line: typedef
  cancel() {
    this.cancelRegister.emit(false);

  }

}
