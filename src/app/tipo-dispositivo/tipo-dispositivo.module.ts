import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {FormsModule} from "@angular/forms"; 
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { TipoDispositivoListComponent } from "./tipo-dispositivo-list/tipo-dispositivo-list.component";
import { TipoDispositivoService } from "./tipo-dispositivo.service";
import { HttpClient } from "@angular/common/http";
import { ModalComponent } from './tipo-disspositivo-edit/modal/modal.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { TipoDispositivoEditComponent } from "./tipo-dispositivo-edit/tipo-dispositivo-edit.component";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { MatInputModule } from "@angular/material/input";
import { ConfirmacionModule } from "./comun/confirmacion/confirmacion.module";
import { TipoDispositivoRoutingModule } from "./tipo-dispositivo.routing.module";
import { VentasModule } from "./ventas/ventas.module";


///Agregar componentes genericos para usar materials
@NgModule(
    {
        imports: [
            CommonModule,
            FormsModule,
            MatTableModule,
            MatButtonModule,
            MatIconModule,
            MatDialogModule,
            MatFormFieldModule,
            ToastrModule.forRoot({
                preventDuplicates: true
            }),
            MatInputModule,
            ConfirmacionModule,
            TipoDispositivoRoutingModule,
            VentasModule
        ],
        ///Componentes que forman parte del modulo.
        declarations: [TipoDispositivoListComponent, ModalComponent,TipoDispositivoEditComponent ],
        ///servicios que puedo usar en los componentes
        providers: [TipoDispositivoService, ToastrService],
        ///Quiero que el componente pueda ser usado en otros components
        exports: [TipoDispositivoListComponent, TipoDispositivoEditComponent]
    }
)

export class TipoDispositivoModule{

}