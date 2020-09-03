import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './_services/alertify.service';
import { UserService } from './_services/user.service';
import { UserListComponent } from './users/user-list/user-list.component';
import { fromEventPattern } from 'rxjs';
import { JwtModule } from '@auth0/angular-jwt';

// tslint:disable-next-line: typedef
export function tokenGetter()
{
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
      HomeComponent,
      RegisterComponent,
      UserListComponent

   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
         tokenGetter,
         allowedDomains: ['localhost:5000'],
         disallowedRoutes: ['localhost:5000/api/auth']
      }
   })


  ],
  providers: [
    AuthService,
    AlertifyService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
