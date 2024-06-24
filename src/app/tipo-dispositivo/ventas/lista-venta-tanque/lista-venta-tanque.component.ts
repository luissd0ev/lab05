import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
// import { TipoDispositivo } from '../tipo-dispositivo';
// import { TipoDispositivoService } from '../tipo-dispositivo.service';
import { ToastrService } from 'ngx-toastr';
import { VentasService } from '../ventas.service';
import { Venta } from '../venta';
import { EdicionVentaComponent } from '../venta-edicion/edicion-venta.component';
import { CurrentEdicionComponent } from '../current-edicion/current-edicion.component';

@Component({
  selector: 'lista-venta-tanque',
  templateUrl: 'lista-venta-tanque.component.html',
  styleUrl: 'lista-venta-tanque.component.css',
})
export class ListaVentaTanque implements OnInit {
  tanqueDos: Array<any> = [];
  ngOnInit(): void {
    this.tanqueDos = this.data.TrVentasTanques.$values;
  }

  ////Del listado al componente, enviaremos la venta
  tipoDispositivo!: Venta;
  ////Permite inicializar dialog
  constructor(
    private dialogRef: MatDialogRef<EdicionVentaComponent>,
    private tipoDispositivoService: VentasService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ventasService: VentasService,
    /////ESTO ES LO QUE RECIBE LA INFORMACION.
    @Inject(MAT_DIALOG_DATA) public data: Venta
  ) {
    this.tipoDispositivo = data;
  }

  //   constructor(
  //     private ventasService: VentasService,
  //     private dialog: MatDialog,
  //     private toaster: ToastrService
  //   ) {}

  eliminarTanque(index: number): void {
    this.tanqueDos.splice(index, 1);
  }

  agregarTanque() {}
  guardar() {
    console.log('Guardar formulario finalmente.');
  }
  openModificarPop(tanque: any) {
    console.log('abrir pop');
    console.log('Se modificará el siguiente pop');
    console.log(tanque);
    const dialogRef = this.dialog.open(CurrentEdicionComponent, {
      ///CLonar el dato original, copiarlo y no permitir que se modifique
      data: JSON.parse(JSON.stringify(tanque)),
      height: '500px',
      width: '800px',
      ////AL tocar fuera de la pantalla, no permitir cerrar
      // disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Actualizar el elemento modificado en el arreglo principal
        //   this.ventas[index] = result;
        console.log('Se muestra el elemento modificado');
        console.log(result);
        // this.tanqueDos = this.tanqueDos.map()
        // Actualizar el elemento modificado en el arreglo principal
        this.tanqueDos = this.tanqueDos.map((elemento) => {
          return elemento.$id === result.$id
            ? {
                ...result,
                VtaVolumenInicial: Number(result.VtaVolumenInicial),
                VtaVolumenFinal: Number(result.VtaVolumenFinal),
                VtaLitros: Number(result.VtaLitros),
                VtaEvidencia: Number(result.VtaEvidencia),
                VtaEntradas: Number(result.VtaEntradas),
              }
            : elemento;
        });

        console.log('Arreglo nuevo:');
        console.log(this.tanqueDos);
      }
    });
  }
}
