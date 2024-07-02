export interface Article {
  idart: number;
  nameart: string;
  priceart: number;
  quantityart: number;
// Aquí podrías definir una interfaz específica si conoces la estructura
}

export interface AddArticleBody {
  idUsuario: number;
  idArticulo: number;
  price: number;
  cantidad: number;
}
