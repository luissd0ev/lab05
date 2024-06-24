import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VentasService } from './ventas.service';
import { RootObjectVentas, Venta } from './venta';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { VentasEditComponent } from './cards/ventas-edit.component';
import { Subscription } from 'rxjs';
import { EdicionVentaComponent } from './venta-edicion/edicion-venta.component';

///Agregar componentes genericos para usar materials

@Component({
  selector: 'ventas-component',
  templateUrl: 'ventas.component.html',
  styleUrl: './ventas.component.css',
})
export class VentasComponent implements OnInit {
  constructor(
    private ventasService: VentasService,
    private dialog: MatDialog,
    private toaster: ToastrService
  ) {}
  ventasValues: Venta[] = [];
  ventasResponse: RootObjectVentas = {
    $id: '0',
    $values: [],
  };
  subs!: Subscription;
  testing = 2;
  displayedColumns = ['VenId', 'VenFecha', 'VenObservaciones', 'acciones'];

  ngOnInit(): void {
    this.buscar();
    this.subs = this.ventasService.getActualizarServicio().subscribe(() => {
      this.buscar();
    });
  }

  guardarr() {
    console.log('Guardando');
    let venta: Venta = {
      $id: '',
      VenId: 0,
      VenFecha: '2024-06-21T23:07:28.036Z',
      VenObservaciones: '',
      VenEstId: 0,
      VenFolio: 0,
      VenUsrId: 0,
      VenUsrEncargado: 0,
      TdEventosProgramados: {
        $id: '0',
        $values: [],
      },
      TrVentasTanques: {
        $id: '0',
        $values: [],
      },
      VenUsr: 0,
      VenUsrEncargadoNavigation: 0,
      Tanque: {
        vtaLitros: 0,
        vtaVolumenInicial: 0,
        vtaVolumenFinal: 0,
        vtaEvidencia: 0,
        vtaEntradas: 0,
      },
      vtaLitros: 0,
      vtaVolumenInicial: 0,
      vtaVolumenFinal: 0,
      vtaEvidencia: 0,
      vtaEntradas: 0,
    };
    // this.toaster.success('Guardando.', 'Transacción exitosa');
    this.dialog.open(EdicionVentaComponent, {
      ///CLonar el dato original, copiarlo y no permitir que se modifique
      data: JSON.parse(JSON.stringify(venta)),
      height: '300px',
      width: '500px',
      ////AL tocar fuera de la pantalla, no permitir cerrar
      disableClose: true,
    });
  }

  buscar() {
    this.ventasService.buscar().subscribe({
      next: (result) => {
        console.log('Petición exitosa.');
        console.log(result);
        this.ventasResponse = result;
        this.ventasValues = result.$values;
      },
      error: (error) => {
        console.log('Error');
        console.log(error);
      },
    });
  }

  saveNewItem() {
    let venta: Venta = {
      $id: '',
      VenId: 0,
      VenFecha: '2024-06-21T23:07:28.036Z',
      VenObservaciones: '',
      VenEstId: 0,
      VenFolio: 0,
      VenUsrId: 0,
      VenUsrEncargado: 0,
      TdEventosProgramados: {
        $id: '0',
        $values: [],
      },
      TrVentasTanques: {
        $id: '0',
        $values: [],
      },
      VenUsr: 0,
      VenUsrEncargadoNavigation: 0,
      Tanque: {
        vtaLitros: 0,
        vtaVolumenInicial: 0,
        vtaVolumenFinal: 0,
        vtaEvidencia: 0,
        vtaEntradas: 0,
      },
      vtaLitros: 0,
      vtaVolumenInicial: 0,
      vtaVolumenFinal: 0,
      vtaEvidencia: 0,
      vtaEntradas: 0,
    };
  }

  edit(venta: Venta) {

    this.dialog.open(EdicionVentaComponent, {
      ///CLonar el dato original, copiarlo y no permitir que se modifique
      data: JSON.parse(JSON.stringify(venta)),
      height: '300px',
      width: '500px',
      ////Al tocar fuera de la pantalla, no permitir cerrar
      disableClose: true,
    });
  }

  borrar(venta: Venta) {
    const confirmaDialog = this.dialog.open(VentasEditComponent, {
      data: {
        titulo: 'Confirmación',
        mensaje: '¿Está seguro desea eliminar esta venta?',
      },
    });

    confirmaDialog.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Venta eliminada.');
        this.ventasService.eliminarVenta(venta.VenId).subscribe({
          next: (result) => {
            this.toaster.success(
              'La venta seleccionada ha sido eliminada exitosamente',
              'Transacción exitosa'
            );
            this.ventasService.setActualizaServicio(true);
          },
          error: (error) => {
            this.toaster.error('Ha ocurrido un error', 'Error');
          },
        });
      } else {
        console.log('No seleccionaste eliminar');
      }
    });
  }
}
