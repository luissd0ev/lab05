import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginForm, LoginResponse, RegisterForm, UserRegister } from '../tienda-online';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class UserService {
  private url: string = 'https://localhost:7254/api/User';

  constructor(private http: HttpClient) {}

  iniciarSesion(requestLogin: LoginForm): Observable<LoginResponse> {
    const apiUrl = `${this.url}/login`;
    return this.http.post<LoginResponse>(apiUrl, requestLogin, { headers: headers });
  }

  registroNuevoUsuario(requestRegister: RegisterForm): Observable<RegisterForm> {
    const apiUrl = `${this.url}/register`;
    const requestRegisterRequired: UserRegister = {
      iduser: 0,
      nameuser: requestRegister.firstName,
      secondname: requestRegister.lastName,
      edad: requestRegister.age ?? 0,
      email: requestRegister.email,
      passworduser: requestRegister.password,
      carritoscompras: [],
      ordenes: [],
    };
    return this.http.post<RegisterForm>(apiUrl, requestRegisterRequired, { headers: headers });
  }
}