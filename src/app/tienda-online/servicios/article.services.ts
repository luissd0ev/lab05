import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticuloBusqueda } from '../tienda-online';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class ArticleService {
  private url: string = 'https://localhost:7254/api/Article';

  constructor(private http: HttpClient) {}

  searchArticles(): Observable<ArticuloBusqueda[]> {
    const apiUrl = `${this.url}/Articles`;
    return this.http.get<ArticuloBusqueda[]>(apiUrl, { headers: headers });
  }

  searchArticle(idArticle: number): Observable<ArticuloBusqueda>{
    const apiUrl = `${this.url}/Article/${idArticle}`;
    return this.http.get<ArticuloBusqueda>(apiUrl, {headers: headers}); 
  }
}