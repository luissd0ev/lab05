import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {FormsModule} from "@angular/forms"; 
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { HttpClient } from "@angular/common/http";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { MatInputModule } from "@angular/material/input";
import { VentasComponent } from "./ventas.component";
import { VentasRoutingModule } from "./ventas.routing.module";
import { VentasService } from "./ventas.service";
import { ConfirmacionModule } from "../comun/confirmacion/confirmacion.module";
import { EdicionVentaComponent } from "./venta-edicion/edicion-venta.component";
import { ListaVentaTanque } from "./lista-venta-tanque/lista-venta-tanque.component";
import { CurrentEdicionComponent } from "./current-edicion/current-edicion.component";


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
            MatInputModule  ,
            VentasRoutingModule,
            ConfirmacionModule,
            
        ],
        ///Componentes que forman parte del modulo.
        declarations: [VentasComponent, EdicionVentaComponent, ListaVentaTanque, CurrentEdicionComponent],
        ///servicios que puedo usar en los componentes
        providers: [VentasService],
        ///Quiero que el componente pueda ser usado en otros components
        exports: [VentasComponent, EdicionVentaComponent, ListaVentaTanque, CurrentEdicionComponent]
    }
)

export class VentasModule{

}