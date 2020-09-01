import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/'; // To jest adres serwera i kontrolera jakiego chcemy uzyc
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { } // Konsturktor pobiera adres klienta

// tslint:disable-next-line: typedef
login(model: any) // Model przyjmuje dane jakiekolwiek
{
  return this.http.post(this.baseUrl + 'login', model)  // Zwraca adres baseUrl + login uzytkownika + metoda Post
  .pipe(map((respone: any) => {
    const user = respone; // user rowna sie odpowiedz
    if (user) // Jeśli zwraca użytkownika wtedy udostepnia mu tokena
    {
      localStorage.setItem('token', user.token); // Przyznanie tokena
    }
  }) );
}

// tslint:disable-next-line: typedef
register(model: any)
{
  return this.http.post(this.baseUrl + 'register', model);
}

// tslint:disable-next-line: typedef
loggedIn()
{
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}
