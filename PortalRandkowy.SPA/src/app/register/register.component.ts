import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

  // tslint:disable-next-line: typedef
  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('Rejestracja udana');
    }, error => {
      console.log(error);
    }
    );
    console.log(this.model);
  }

  // tslint:disable-next-line: typedef
  cancel() {
    this.cancelRegister.emit(false);
    console.log('Anulowane');
  }

}
