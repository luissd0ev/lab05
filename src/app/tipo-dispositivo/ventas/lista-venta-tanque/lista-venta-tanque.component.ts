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
import { MatIconModule } from '@angular/material/icon';
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
  columnas = ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis'];
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
    console.log('INDICE SELECCIONADO:');
    console.log(index);
    this.tanqueDos.splice(index, 1);
    this.tanqueDos = [...this.tanqueDos];
  }

  agregarTanque() {}
  guardar() {
    console.log('Guardar formulario finalmente.');
  }

  guardarCambio() {
    console.log('Guardando cambios:');
    console.log('ENVIAR EL SIGUIENTE DATO:');
    console.log(this.tanqueDos);
    let listTanque = this.tanqueDos.map((element) => {
      return {
        vtaDisId: Number(element.VtaDisId),
        vtaLitros: element.VtaLitros,
        vtaVolumenInicial: element.VtaVolumenInicial,
        vtaVolumenFinal: element.VtaVolumenFinal,
        vtaEvidencia: element.VtaEvidencia,
        vtaEntradas: element.VtaEntradas,
      };
    });
    let objectRequest = {
      ventaModel: {
        venFecha: this.data.VenFecha,
        venObservaciones: this.data.VenObservaciones,
        venEstId: this.data.VenEstId,
      },
      tanqueModel: listTanque,
    };
    console.log('Request por enviar: ');
    console.log(objectRequest);
    if (this.data.VenId > 0) {
      this.tipoDispositivoService
        .newUpdateDMehod(objectRequest, this.data.VenId)
        .subscribe({
          next: () => {
            this.toastr.success(
              'La venta ha sido actualizada con éxito',
              'Éxito'
            );
            this.tipoDispositivoService.setActualizaServicio(true);
            this.dialogRef.close();
          },
          error: (error) => {
            this.toastr.error(
              'Ha ocurrido un error en la modificación de la venta'
            );
          },
        });
    } else {
      this.tipoDispositivoService.newSaveDMethod(objectRequest).subscribe({
        next: () => {
          this.toastr.success('La venta ha sido guardada con éxito', 'Éxito');
          this.tipoDispositivoService.setActualizaServicio(true);
          this.dialogRef.close();
        },
        error: (error) => {
          this.toastr.error(
            'Ha ocurrido un error en la modificación de la venta'
          );
        },
      });
    }
  }

  addNewElement() {
    let newId = generarIdAleatorio(10);
    let tanque = {
      $id: newId,
      VtaDis: 'Dispositivo',
      VtaDisId: 31,
      VtaEntradas: 0,
      VtaEvidencia: 0,
      VtaLitros: 0,
      VtaVen: { $ref: '76' },
      VtaVenId: 0,
      VtaVolumenFinal: 0,
      VtaVolumenInicial: 0,
      isNewElement: true,
    };
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
        let newId = generarIdAleatorio(10);
        if (result.isNewElement) {
          console.log('Agregar nuevo elemento en el array:');

          this.tanqueDos.push({
            ...result,
            VtaVolumenInicial: Number(result.VtaVolumenInicial),
            VtaVolumenFinal: Number(result.VtaVolumenFinal),
            VtaLitros: Number(result.VtaLitros),
            VtaEvidencia: Number(result.VtaEvidencia),
            VtaEntradas: Number(result.VtaEntradas),
            $id: newId,
          });
          this.tanqueDos = [...this.tanqueDos];
        }
      }
    });
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
        // this.tanqueDos = this.tanqueDos.map()
        // Actualizar el elemento modificado en el arreglo principal
        console.log('RESULTADO');
        console.log(result);

        // if (result.isNewElement) {
        //   console.log('Agregar nuevo elemento en el array:');
        //   this.tanqueDos.push({
        //     ...result,
        //     VtaVolumenInicial: Number(result.VtaVolumenInicial),
        //     VtaVolumenFinal: Number(result.VtaVolumenFinal),
        //     VtaLitros: Number(result.VtaLitros),
        //     VtaEvidencia: Number(result.VtaEvidencia),
        //     VtaEntradas: Number(result.VtaEntradas),
        //     VtaDisId: Number(result.VtaDisId),
        //   });
        // }

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

// Función para generar una cadena aleatoria
function generarIdAleatorio(longitud: number): string {
  const caracteres =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let resultado = '';
  for (let i = 0; i < longitud; i++) {
    resultado += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
  }
  return resultado;
}
