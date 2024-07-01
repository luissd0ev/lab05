import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import {
  AddToCarritoParams,
  ArticuloBusqueda,
  LoginForm,
  LoginResponse,
  RegisterForm,
  RequestGenerateOrder,
  ShoppingCartResponse,
  UserRegister,
} from './tienda-online';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class TiendaOnlineService {
  ////Propiedades
  url: string = 'https://localhost:7254/api/MarsystemsDemo';
  subjectUpdate = new Subject<any>();
  ///Los constructores se usan para agregar de forma privada a esta clase , ayuda a usar el http metod
  constructor(private http: HttpClient) {}

  addElementToCart(params: AddToCarritoParams): Observable<any> {
    let apiUrl = `${this.url}/AddToCarrito?idUsuario=${params.idUsuario}&idArticulo=${params.idArticulo}&price=${params.price}&cantidad=${params.cantidad}`;
    return this.http.post<any>(apiUrl, { headers: headers });
  }

  buscarProductos(): Observable<ArticuloBusqueda[]> {
    let apiUrl = `${this.url}/Articulos`;
    return this.http.get<any>(apiUrl, { headers: headers });
  }

  /////Carrito de compras

  fetchShoppingCartInfo(idUser: number): Observable<ShoppingCartResponse> {
    let apiUrl = `${this.url}/carrito/${idUser}`;
    return this.http.get<ShoppingCartResponse>(apiUrl, { headers: headers });
  }

  ///Este es el que está vigilando al objeto de cualquier tipo
  getActualizarServicio(): Observable<any> {
    return this.subjectUpdate.asObservable();
  }

  generateOrderArticles(request: RequestGenerateOrder): Observable<any> {
    let apiUrl = `${this.url}/orden`;
    return this.http.post<any>(apiUrl, request, { headers: headers });
  }

  iniciarSesion(requestLogin: LoginForm): Observable<LoginResponse> {
    console.log('EJecutando el objeto');
    console.log(requestLogin);
    let apiUrl = `${this.url}/login`;
    if (true) {
      return this.http.post<any>(apiUrl, requestLogin, { headers: headers });
    }
  }

  registroNuevoUsuario(
    requestRegister: RegisterForm
  ): Observable<RegisterForm> {
    let apiUrl = `${this.url}/register`;
    let requestRegisterRequired: UserRegister = {
      iduser: 0,
      nameuser: requestRegister.firstName,
      secondname: requestRegister.lastName,
      edad: requestRegister.age ?? 0,
      email: requestRegister.email,
      passworduser: requestRegister.password,
      carritoscompras: [],
      ordenes: [],
    };
    return this.http.post<any>(apiUrl, requestRegisterRequired, {
      headers: headers,
    });
  }

  /////Esto es lo que hará
  setActualizaServicio(esActualizado: boolean) {
    this.subjectUpdate.next(esActualizado);
  }
}
