export interface ArticuloOrden {
    idArticulo: number;
    nombreArticulo: string;
    precio: number;
    cantidad: number;
}

export interface Orden {
    idOrder: number;
    fecha: string;  
    total: number;
    articulos: ArticuloOrden[];
}