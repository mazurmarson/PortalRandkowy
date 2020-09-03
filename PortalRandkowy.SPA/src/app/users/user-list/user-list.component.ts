import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService, private alerify: AlertifyService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.loadUsers();
  }

  // tslint:disable-next-line: typedef
  loadUsers()
  {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      this.alerify.error(error);
    });
  }

}
