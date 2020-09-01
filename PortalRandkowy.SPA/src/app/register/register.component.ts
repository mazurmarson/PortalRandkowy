import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() valuesFromHome: any;
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor() { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

  // tslint:disable-next-line: typedef
  register() {
    console.log(this.model);
  }

  // tslint:disable-next-line: typedef
  cancel() {
    this.cancelRegister.emit(false);
    console.log('Anulowane');
  }

}
