import { Articulo } from "../tienda-online";

export interface ShoppingCartResponse {
    isSuccessful: boolean;
    message: string | null;
    items: ShoppingCartItem[];
  }

export interface ShoppingCartItem {
    idArticulo: number;
    nombreArticulo: string;
    precio: number;
    cantidad: number;
}

export interface ShoppingCartPago {
    idUsuario: number;
    articulos: Articulo[];
  }
  