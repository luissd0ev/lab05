import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { TipoDispositivo } from '../tipo-dispositivo';
// import { TipoDispositivoService } from '../tipo-dispositivo.service';
import { ToastrService } from 'ngx-toastr';
import { VentasService } from '../ventas.service';
import { Venta } from '../venta';

@Component({
  selector: 'edicion-venta',
  templateUrl: 'edicion-venta.component.html',
  styleUrl: 'edicion-venta.component.css',
})
export class EdicionVentaComponent implements OnInit {
  ngOnInit(): void {}
  ////Del listado al componente, enviaremos la venta
  tipoDispositivo!: Venta;

  ////Permite inicializar dialog
  constructor(
    private dialogRef: MatDialogRef<EdicionVentaComponent>,
    private tipoDispositivoService: VentasService,
    private toastr: ToastrService,
    /////ESTO ES LO QUE RECIBE LA INFORMACION.
    @Inject(MAT_DIALOG_DATA) public data: Venta
  ) {
    this.tipoDispositivo = data;
  }

  ////Del listado al componente, enviaremos el tipo dispositivo}

  ////Métodos
  guardar() {
    console.log('Guardando datos del registro');
    console.log(this.data);

    let mainModelInstance: any = {
      ventaModel: {
        venFecha: '2024-06-21T23:07:28.036Z',
        venObservaciones: this.data.VenObservaciones,
        venEstId: this.data.VenEstId,
      },
      tanqueModel: {
        vtaDisId: 1,
        vtaLitros: 0,
        vtaVolumenInicial: 0,
        vtaVolumenFinal: 0,
        vtaEvidencia: 0,
        vtaEntradas: 0,
      },
    };

    const updateRequestVenta: any= {
      ventaModel: {
        venFecha: "2024-06-21T23:29:37.172Z",
        venObservaciones: this.data.VenObservaciones,
        venEstId: 0
      },
      tanqueModel: {
        vtaLitros: 0,
        vtaVolumenInicial: 0,
        vtaVolumenFinal: 0,
        vtaEvidencia: 0,
        vtaEntradas: 0
      }
    };
    
    if (this.data.VenId == 0) {
      this.tipoDispositivoService.upCreate(mainModelInstance).subscribe({
        next: (result) => {
          this.toastr.success('La venta ha sido guardada', 'Éxito');
          this.tipoDispositivoService.setActualizaServicio(true);
          this.dialogRef.close();
        },
        error: (error) => {
          this.toastr.error(
            'Ha ocurrido un error en el guardado de tu nuevo elemento'
          );
        },
      });
    } else {
      this.tipoDispositivoService
        .update(updateRequestVenta, this.data.VenId)
        .subscribe({
          next: (result) => {
            this.toastr.success('La venta ha sido actualizada', 'Éxito');
            this.tipoDispositivoService.setActualizaServicio(true);
            this.dialogRef.close();
          },
          error: (error) => {
            this.toastr.error(
              'Ha ocurrido un error en el guardado de tu nuevo elemento'
            );
          },
        });
    }

    // this.tipoDispositivoService.guardar(this.tipoDispositivo).subscribe({
    //   next: (result) => {
    //     if (result > 0) {
    //         this.toastr.success("El tipo de dispositivo ha sido guardado exitosamente", "Error");
    //         ////Estamos informando que hay una actualización
    //         this.tipoDispositivoService.setActualizaServicio(true);
    //         this.dialogRef.close();
    //     } else {
    //       this.toastr.error('Ha ocurrido un error', 'error');
    //     }
    //   },
    //   error: (error) => {
    //     console.log(error);
    //     ///this.toastr.error(msj error, titulo ventana)
    //     this.toastr.error('Ha ocurrido un error', 'error');
    //   },
    // });
  }
}
