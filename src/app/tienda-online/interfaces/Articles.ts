export interface Article {
  idart: number;
  nameart: string;
  priceart: number;
  quantityart: number;
  carritoscompras: any[]; // Aquí podrías definir una interfaz específica si conoces la estructura
  ordenesArticulos: any[]; // Aquí podrías definir una interfaz específica si conoces la estructura
}

export interface AddArticleBody {
  idUsuario: number;
  idArticulo: number;
  price: number;
  cantidad: number;
}
