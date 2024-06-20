import { RouterModule } from "@angular/router";
import { TipoDispositivoEditComponent } from "./tipo-dispositivo-edit/tipo-dispositivo-edit.component";
import { TipoDispositivoListComponent } from "./tipo-dispositivo-list/tipo-dispositivo-list.component";
import { NgModule } from "@angular/core";

export const TIPO_DISPOSITIVO_ROUTES = [
//SI NO LE PASO NADA, muestra lista
    {
        path: '',
        component: TipoDispositivoListComponent
    },
    ///PASAR ARGUMENTO ID, paso componente
    {
        path: 'id',
        component: TipoDispositivoEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(TIPO_DISPOSITIVO_ROUTES)],
    exports: [RouterModule]
})

export class TipoDispositivoRoutingModule{
    
}