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


///Agregar componentes genericos para usar materials
@NgModule(
    {
        imports: [
            CommonModule,
            FormsModule,
            MatTableModule,
            MatButtonModule,
            MatIconModule,
            MatDialogModule
        ],
        ///Componentes que forman parte del modulo.
        declarations: [TipoDispositivoListComponent, ModalComponent],
        ///servicios que puedo usar en los componentes
        providers: [TipoDispositivoService],
        ///Quiero que el componente pueda ser usado en otros componens
        exports: [TipoDispositivoListComponent]
    }
)

export class TipoDispositivoModule{

}