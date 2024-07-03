import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ProductosComponent } from "./productos/product-list/productos.component";
import { CarritoComponent } from "./carrito/carrito-list/carrito.component";
import { OrdenCompraComponent } from "./orden-compra/orden-list/orden-compra.component";
import { ProductoComponent } from "./productos/producto/producto.component";

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
    },
    {
        path: 'orden-compra',
        component: OrdenCompraComponent
    },
    {
        path: 'articulo/:id',
        component: ProductoComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(LOGIN_ROUTES)],
    exports: [RouterModule]
})

export class TiendaRoutingModule{
    
}