import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { ResponseCatalog, ResponseSearch, TipoDispositivo } from './tipo-dispositivo';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class TipoDispositivoService {
  ////Variables
  url: string = 'https://localhost:7299/api/TiposDispositivos';
  urlTabla: string =  'https://localhost:7299/api/BusquedaDis';
  subjectUpdate = new Subject<any>() ;
  

  ///Los constructores se usan para agregar de forma privada a esta clase , ayuda a usar el http metod
  constructor(private http: HttpClient) {}
 
  

  ////CONSTRUIDO EN CLASE PRESENCIAL

  /**ACCESOS */

  ///Este es el que está vigilando al objeto de cualquier tipo
  getActualizarServicio(): Observable<any>{
    return this.subjectUpdate.asObservable(); 
  }

  /////ESto es lo que hará
  setActualizaServicio(esActualizado: boolean){
    this.subjectUpdate.next(esActualizado);
  }


    guardar(tdi: TipoDispositivo): Observable<any>{
      let apiUrl =  `${this.url}`;
      if(tdi.tdiId){
        return this.http.put<TipoDispositivo>(apiUrl, tdi, {headers: headers})
      }else{
        return this.http.post<TipoDispositivo>(apiUrl, tdi, {headers: headers})
      }
    }

    borrrar(tdi: TipoDispositivo): Observable<any>{
      const deleteUrl = `${this.url}?registroIdBorrar=${tdi.tdiId}`;
      if(tdi.tdiId){
        return this.http.delete<number>(deleteUrl);
      }else{
        return EMPTY; 
      }
    }
    
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
