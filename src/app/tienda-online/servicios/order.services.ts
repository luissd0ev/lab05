import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  RequestGenerateOrder } from '../tienda-online';
import { Orden } from '../interfaces/Orders';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class OrderService {
  private url: string = 'https://localhost:7254/api/Order';

  constructor(private http: HttpClient) {}

  generateOrderArticles(request: RequestGenerateOrder): Observable<any> {
    const apiUrl = `${this.url}/orden`;
    return this.http.post<any>(apiUrl, request, { headers: headers });
  }

  getOrdersUser(idUser: number): Observable<Orden[]> {
    const apiUrl = `${this.url}/ordenes/${idUser}`;
    return this.http.get<Orden[]>(apiUrl, { headers: headers });
  }
}
