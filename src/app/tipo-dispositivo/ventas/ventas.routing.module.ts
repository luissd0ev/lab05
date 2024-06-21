import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { VentasComponent } from "./ventas.component";

export const VENTAS_ROUTES = [
//SI NO LE PASO NADA, muestra lista
    {
        path: '',
        component: VentasComponent
    },
    ///PASAR ARGUMENTO ID, paso componente
    // {
    //     path: 'id',
    //     component: TipoDispositivoEditComponent
    // }
];

@NgModule({
    imports: [RouterModule.forChild(VENTAS_ROUTES)],
    exports: [RouterModule]
})

export class VentasRoutingModule{
    
}