export interface LoginForm {
  email: string;
  passworduser: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  age: number | null;
  email: string;
  password: string;
}
 

 export interface UserRegister {
    iduser: number;
    nameuser: string;
    secondname: string;
    edad: number;
    email: string;
    passworduser: string;
    carritoscompras: CarritoCompra[];
    ordenes: Orden[];
  }
  
  export interface CarritoCompra {
    idcarrito: number;
    idarticulo: number;
    price: number;
    cantidad: number;
    idarticuloNavigation: Articulo;
    idcarritoNavigation: string; // Puede que deba ser de tipo CarritoCompra, pero depende de la estructura real
  }
  
  export interface Articulo {
    idart: number;
    nameart: string;
    priceart: number;
    quantityart: number;
    carritoscompras: string[]; // Revisar la estructura real, podría ser CarritoCompra[]
    ordenesArticulos: OrdenArticulo[];
  }
  
  export interface Orden {
    idorder: number;
    iduser: number;
    fecha: Date;
    total: number;
    iduserNavigation: string; // Puede que deba ser de tipo User, depende de la estructura real
    ordenesArticulos: OrdenArticulo[];
  }
  
  export interface OrdenArticulo {
    idorder: number;
    idarticulo: number;
    cantidad: number;
    idarticuloNavigation: string; // Puede que deba ser de tipo Articulo, depende de la estructura real
    idorderNavigation: string; // Puede que deba ser de tipo Orden, depende de la estructura real
  }

  export interface LoginResponse {
    message: string;
    isSuccessful: boolean;
    userId: number;
    userName: string | null;
  }