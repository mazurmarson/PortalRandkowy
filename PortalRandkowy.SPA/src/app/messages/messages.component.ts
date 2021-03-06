import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationNumberLinkContext } from 'ngx-bootstrap/pagination';
import { Message } from '../_models/message';
import { Pagination, PaginationResult } from '../_models/pagination';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Nieprzeczytane';
  newMessage: any = {};
  flagaOutbox = false;

  constructor(private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data.messages.result;
      this.pagination = data.messages.pagination;
    });
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage,
                                  this.pagination.itemsPerPage, this.messageContainer)
        .subscribe((res: PaginationResult<Message[]>) => {
          this.messages = res.result;
          this.pagination = res.pagination;

          if (res.result[0].messageContainer === 'Outbox') {
            this.flagaOutbox = true;
          } else {
            this.flagaOutbox = false;
          }

        }, error => {
          this.alertify.error(error);
        });
  }

  deleteMessage(id: number)
  {
    this.alertify.confirm('Na pewno chcesz usunąć?', () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => 
      {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('Wiadomość została usunięta');
            }, error => {
              this.alertify.error('Nie udało się usunąć wiadomości');
            });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }


}
