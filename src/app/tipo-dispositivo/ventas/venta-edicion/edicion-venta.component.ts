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
  ngOnInit(): void {
    this.tanque.vtaLitros = this.data.TrVentasTanques.$values[0].VtaLitros;
    this.tanque.vtaEntradas =
      this.data.TrVentasTanques.$values[0].VtaEntradas ?? 0;
    this.tanque.vtaVolumenInicial =
      this.data.TrVentasTanques.$values[0].VtaVolumenInicial;
    this.tanque.vtaVolumenFinal =
      this.data.TrVentasTanques.$values[0].VtaVolumenFinal;
    this.tanque.vtaEvidencia =
      this.data.TrVentasTanques.$values[0].VtaEvidencia ?? 0;
  }
  ////Del listado al componente, enviaremos la venta
  tipoDispositivo!: Venta;
  tanque = {
    vtaLitros: 0,
    vtaVolumenInicial: 0,
    vtaVolumenFinal: 0,
    vtaEvidencia: 0,
    vtaEntradas: 0,
  };
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
    console.log('GUARDAR SE ENVIAN LOS SIGUIENTES DATOS DE TANQUE');
    console.log(this.tanque);

    let createRequestVenta: any = {
      ventaModel: {
        venFecha: '2024-06-21T23:07:28.036Z',
        venObservaciones: this.data.VenObservaciones,
        venEstId: this.data.VenEstId,
      },
      tanqueModel: {
        vtaDisId: 1,
        vtaLitros: this.tanque.vtaLitros ?? 0,
        vtaVolumenInicial: this.tanque.vtaVolumenInicial ?? 0,
        vtaVolumenFinal: this.tanque.vtaVolumenFinal ?? 0,
        vtaEvidencia: this.tanque.vtaEvidencia ?? 0,
        vtaEntradas: this.tanque.vtaEntradas ?? 0,
      },
    };

    const updateRequestVenta: any = {
      ventaModel: {
        venFecha: '2024-06-21T23:29:37.172Z',
        venObservaciones: this.data.VenObservaciones,
        venEstId: 0,
      },
      tanqueModel: {
        vtaLitros: this.tanque.vtaLitros ?? 0,
        vtaVolumenInicial: this.tanque.vtaVolumenInicial ?? 0,
        vtaVolumenFinal: this.tanque.vtaVolumenFinal ?? 0,
        vtaEvidencia: this.tanque.vtaEvidencia ?? 0,
        vtaEntradas: this.tanque.vtaEntradas ?? 0,
      },
    };

    if (this.data.VenId == 0) {
      this.tipoDispositivoService.upCreate(createRequestVenta).subscribe({
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
  }
}
