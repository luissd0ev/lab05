import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseCatalog, ResponseSearch, TipoDispositivo } from './tipo-dispositivo';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class TipoDispositivoService {
  url: string = 'https://localhost:7299/api/TiposDispositivos';
  urlTabla: string =  'https://localhost:7299/api/BusquedaDis';
  ///Los constructores se usan para agregar de forma privada a esta clase , ayuda a usar el http metod
  constructor(private http: HttpClient) {}
  ////Traer catalogo y TABLA
  traerCatalogo(): Observable<ResponseCatalog>{
    console.log("HOLA DESDE TRAER CATALOGO:"); 
    let urlFormat = this.urlTabla + '/Catalog'
    return this.http.get<ResponseCatalog>(urlFormat, { headers: headers });
  }

  traerResultadosTabla(tdi_id: number, dis_est_id: number): Observable<ResponseSearch[]>{
    let urlFormat = this.urlTabla + `?tdi_id=${tdi_id}&dis_est_id=${dis_est_id}`
    return this.http.get<ResponseSearch[]>(urlFormat, {headers: headers})
  }
/////FIN DE LA TABLA
  //// Los datos observable, reacciona cuando algo sucede
  buscar(): Observable<TipoDispositivo[]> {
    return this.http.get<TipoDispositivo[]>(this.url, { headers: headers });
  }



  borrar(id: number): Observable<number> {
    const deleteUrl = `${this.url}?registroIdBorrar=${id}`;
    return this.http.delete<number>(deleteUrl);
  }

  actualizar(dispositivo: TipoDispositivo): Observable<any> {
    const updateUrl = `${this.url}`;
    // Preparar headers si es necesario
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(updateUrl, dispositivo, { headers: headers });
  }
  // Método para insertar un nuevo dispositivo
  insertar(dispositivo: TipoDispositivo): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url, dispositivo, { headers: headers });
  }

  /////////////////En esta parte se trabaja la construcción de la tabla:


}
