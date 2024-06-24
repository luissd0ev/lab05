import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { TipoDispositivo } from '../tipo-dispositivo';
// import { TipoDispositivoService } from '../tipo-dispositivo.service';
import { ToastrService } from 'ngx-toastr';
import { VentasService } from '../ventas.service';
import { Venta } from '../venta';
import { EdicionVentaComponent } from '../venta-edicion/edicion-venta.component';

@Component({
  selector: 'current-edicion',
  templateUrl: 'current-edicion.component.html',
  styleUrl: 'current-edicion.component.css',
})


export class CurrentEdicionComponent implements OnInit {

    ngOnInit(): void {
        console.log("Datos que posee el componente: ");
        console.log(this.data); 
        console.log(this.data.VtaVolumenInicial); 
    }

    venta: any; 

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.tipoDispositivo = data
    this.venta = data;  
  }

  guardarCambios() {
    this.dialogRef.close(this.venta);
  }
}