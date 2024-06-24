import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { RootObjectVentas, Venta, VtaTanqueModel } from './venta';

// import { ResponseCatalog, ResponseSearch, TipoDispositivo } from './tipo-dispositivo';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class VentasService {
  ////Variables:
  url: string = 'https://localhost:7299/api/ventas/Values';
  urlTabla: string = 'https://localhost:7299/api/ventas/Values';

  subjectUpdate = new Subject<any>();

  displayedColumns: string[] = ['Venta'];

  ///Los constructores se usan para agregar de forma privada a esta clase , ayuda a usar el http metod
  constructor(private http: HttpClient) {}

  ///Este es el que está vigilando al objeto de cualquier tipo
  getActualizarServicio(): Observable<any> {
    return this.subjectUpdate.asObservable();
  }

  /////Esto es lo que hará
  setActualizaServicio(esActualizado: boolean) {
    this.subjectUpdate.next(esActualizado);
  }

  //// Los datos observable, reacciona cuando algo sucede
  buscar(): Observable<RootObjectVentas> {
    let formatUrl: string = this.url + '/ListarVentass';
    return this.http.get<RootObjectVentas>(formatUrl, { headers: headers });
  }

  eliminarVenta(idVenta: number): Observable<number> {
    let formatUrl: string = this.url + `/EliminarPruebasVentas?id=${idVenta}`;
    return this.http.delete<number>(formatUrl, { headers: headers });
  }

  upCreate(vtaTanque: any): Observable<any> {
    let formatUrl: string = this.url + `/InsertarPruebasVentas`;
    return this.http.post(formatUrl, vtaTanque, { headers: headers });
  }
  update(vtaTanque: any, idVenta: number): Observable<any> {
    let formatUrl: string = this.url + `/ActualizarPruebasVentas?id=${idVenta}`;
    return this.http.put(formatUrl, vtaTanque, { headers: headers });
  }

  newUpdateDMehod(request: any, id_venta: number): Observable<any> {
    console.log('Se visualiza la actualización, borrado, guardado.');
    const formatUrl = this.url + `/ModificarPruebasVentas?id=${id_venta}`;
    return this.http.put(formatUrl, request, { headers: headers });
  }
}
