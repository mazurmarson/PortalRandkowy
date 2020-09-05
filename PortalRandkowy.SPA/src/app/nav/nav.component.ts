import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
declare let alertify: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  // tslint:disable-next-line: no-shadowed-variable
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }
  // tslint:disable-next-line: typedef
  ngOnInit() {
  }
  // tslint:disable-next-line: typedef
  login()
  {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Zalogowałeś się do aplikacji');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/uzytkownicy']);
    });
  }

  // tslint:disable-next-line: typedef
  loggedIn()
  {
    return this.authService.loggedIn();
  }

  // tslint:disable-next-line: typedef
  logout()
  {
    localStorage.removeItem('token');
    this.alertify.message('Zostałeś wylogowany');
    this.router.navigate(['/home']);
  }
}
