import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
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
  bsConfig: Partial<BsDatepickerConfig>;

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  this.bsConfig = {
    containerClass: 'theme-blue'
  },
  this.createRegisterForm();
  }

  createRegisterForm()
  {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      confirmPassword: ['', Validators.required],
      gender: ['female'],
      dateOfBirth: [null, Validators.required],
      zodiacSign: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(fg: FormGroup){
    return fg.get('password').value === fg.get('confirmPassword').value ? null : { mismatch: true };
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
