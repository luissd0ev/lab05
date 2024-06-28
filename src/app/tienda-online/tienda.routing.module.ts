import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ProductosComponent } from "./productos/productos.component";
import { CarritoComponent } from "./carrito/carrito.component";

export const LOGIN_ROUTES = [
//SI NO LE PASO NADA, muestra lista
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'catalogo',
        component: ProductosComponent
    },
    {
        path: 'carrito',
        component: CarritoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(LOGIN_ROUTES)],
    exports: [RouterModule]
})

export class TiendaRoutingModule{
    
}