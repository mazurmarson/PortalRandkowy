import {Injectable} from '@angular/core';
import { User } from '../_models/user';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Route } from '@angular/compiler/src/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { error } from 'protractor';

@Injectable()
export class LikesResolver implements Resolve<User[]>
{
    pageNumber = 1;
    pageSize = 12;
    likesParam = 'UserLikes';

    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParam).pipe(
            catchError( error => {
                this.alertify.error('Problem z pobraniem danych');
                this.router.navigate(['']);
                return of(null);
            })
        );
    }




}
