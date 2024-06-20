import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoDispositivo } from '../tipo-dispositivo';
import { TipoDispositivoService } from '../tipo-dispositivo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tipo-dispositivo-edit',
  templateUrl: './tipo-dispositivo-edit.component.html',
  styles: ['form > * [width: 100%]'],
})
export class TipoDispositivoEditComponent implements OnInit {
  ////Del listado al componente, enviaremos el tipo dispositivo
  tipoDispositivo!: TipoDispositivo;

  ////Permite inicializar dialog
  constructor(
    private dialogRef: MatDialogRef<TipoDispositivoEditComponent>,
    private tipoDispositivoService: TipoDispositivoService,
    private toastr: ToastrService,
    /////ESTO ES LO QUE RECIBE LA INFORMACION.
    @Inject(MAT_DIALOG_DATA) public data: TipoDispositivo
  ) {
    this.tipoDispositivo = data;
  }

  ngOnInit(): void {}

  ////Métodos
  guardar() {
    this.tipoDispositivoService.guardar(this.tipoDispositivo).subscribe({
      next: (result) => {
        if (result > 0) {
            this.toastr.success("El tipo de dispositivo ha sido guardado exitosamente", "Error"); 
            ////Estamos informando que hay una actualización
            this.tipoDispositivoService.setActualizaServicio(true);
            this.dialogRef.close(); 
        } else {
          this.toastr.error('Ha ocurrido un error', 'error');
        }
      },
      error: (error) => {
        console.log(error);
        ///this.toastr.error(msj error, titulo ventana)
        this.toastr.error('Ha ocurrido un error', 'error');
      },
    });
  }
}
