import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
declare let alertify: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private authService: AuthService, private alertify: AlertifyService ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

  // tslint:disable-next-line: typedef
  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Rejestracja udana');
    }, error => {
      this.alertify.error(error);
    }
    );
    console.log(this.model);
  }

  // tslint:disable-next-line: typedef
  cancel() {
    this.cancelRegister.emit(false);

  }

}
