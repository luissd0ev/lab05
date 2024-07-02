import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddToCarritoParams } from '../tienda-online';
import { ShoppingCartResponse } from '../interfaces/Cart';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class CartService {
  private url: string = 'https://localhost:7254/api/Cart';

  constructor(private http: HttpClient) {}

  addElementToCart(params: AddToCarritoParams): Observable<any> {
    const apiUrl = `${this.url}/AddToCarrito?idUsuario=${params.idUsuario}&idArticulo=${params.idArticulo}&price=${params.price}&cantidad=${params.cantidad}`;
    return this.http.post<any>(apiUrl, { headers: headers });
  }

  fetchShoppingCartInfo(idUser: number): Observable<ShoppingCartResponse> {
    const apiUrl = `${this.url}/carrito/${idUser}`;
    return this.http.get<ShoppingCartResponse>(apiUrl, { headers: headers });
  }

  deleteArticleFromCart(idUser: number, articleId: number): Observable<ShoppingCartResponse> {
    const apiUrl = `${this.url}/carrito/${idUser}/${articleId}`;
    return this.http.delete<ShoppingCartResponse>(apiUrl, { headers: headers });
  }
}
