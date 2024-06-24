export interface RootObjectVentas {
  $id: string;
  $values: Venta[];
}

export interface Venta {
  $id: string;
  VenId: number;
  VenFecha: string;
  VenObservaciones: string | null;
  VenEstId: number;
  VenFolio: number | null;
  VenUsrId: number | null;
  VenUsrEncargado: number | null;
  TdEventosProgramados: TdEventosProgramados;
  TrVentasTanques: TrVentasTanques;
  VenUsr: any | null;
  VenUsrEncargadoNavigation: any | null;
  Tanque: any | TanqueModel;
  vtaLitros: number;
  vtaVolumenInicial: number;
  vtaVolumenFinal: number;
  vtaEvidencia: number;
  vtaEntradas: number;
}
export interface TanqueModel {
  vtaLitros: number;
  vtaVolumenInicial: number;
  vtaVolumenFinal: number;
  vtaEvidencia: number;
  vtaEntradas: number;
}
export interface TdEventosProgramados {
  $id: string;
  $values: any[];
}

export interface TrVentasTanques {
  $id: string;
  $values: VentaTanque[];
}

export interface VentaTanque {
  $id: string;
  VtaVenId: number;
  VtaDisId: number;
  VtaLitros: number;
  VtaVolumenInicial: number;
  VtaVolumenFinal: number;
  VtaEvidencia: number | null;
  VtaEntradas: number | null;
  VtaDis: any | null;
  VtaVen: VtaVen;
}

export interface VtaVen {
  $ref: string;
}

// venta.model.ts
export interface VentaModel {
  venFecha: string;
  venObservaciones: string;
  venEstId: number;
}

// tanque.model.ts
export interface TanqueModel {
  vtaDisId: number;
  vtaLitros: number;
  vtaVolumenInicial: number;
  vtaVolumenFinal: number;
  vtaEvidencia: number;
  vtaEntradas: number;
}

export interface VtaTanqueModel {
  ventaModel: VentaModel;
  tanqueModel: TanqueModel;
}
