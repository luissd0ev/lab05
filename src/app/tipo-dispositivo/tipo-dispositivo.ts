export class TipoDispositivo{
////Signo de admiración se conoce como que puede ser undefined
///Se puede dar una asignación por default o indefinido
    tdiId! : number;
    tdiNombre!: string; 
}

// TiposDispositivosModel
export interface TiposDispositivosModel {
    tdi_id: number;
    tdi_name: string;
}

// EstacionesModel
export interface EstacionesModel {
    est_id: number;
    est_name: string;
}

// ResponseCatalog
export interface ResponseCatalog {
    tiposDispositivos: TiposDispositivosModel[];
    estaciones: EstacionesModel[];
}

export interface ResponseSearch {
    dis_id: number;
    tdi_nombre: string;
    dis_clave: string;
    dis_description: string;
    est_id: number;
    est_nombre: string;
    tdi_id: number;
  }