import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";

export const LOGIN_ROUTES = [
//SI NO LE PASO NADA, muestra lista
    {
        path: '',
        component: LoginComponent
    },
    ///PASAR ARGUMENTO ID, paso componente
    // {
    //     path: 'id',
    //     component: TipoDispositivoEditComponent
    // }
];

@NgModule({
    imports: [RouterModule.forChild(LOGIN_ROUTES)],
    exports: [RouterModule]
})

export class TiendaRoutingModule{
    
}