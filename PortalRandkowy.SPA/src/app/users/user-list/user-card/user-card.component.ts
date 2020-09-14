import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) 
  {

   }

   sendLike(id: number) {
      this.userService.sendLike(this.authService.decodedToken.nameid, id)
      .subscribe( data => {
        this.alertify.success('Polubiłeś: ' + this.user.username);
      }, error => {
        this.alertify.error(error);
      });
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

}
