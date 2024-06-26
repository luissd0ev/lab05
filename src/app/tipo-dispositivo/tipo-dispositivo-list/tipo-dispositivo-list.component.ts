import { Component, OnInit } from '@angular/core';
import { TipoDispositivoService } from '../tipo-dispositivo.service';
import {
  ResponseCatalog,
  ResponseSearch,
  TipoDispositivo,
} from '../tipo-dispositivo';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalComponent } from '../tipo-disspositivo-edit/modal/modal.component';
import { Subscription } from 'rxjs';
import { TipoDispositivoEditComponent } from '../tipo-dispositivo-edit/tipo-dispositivo-edit.component';
import { ConfirmacionComponent } from '../comun/confirmacion/confirmacion.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tipo-dispositivo',
  templateUrl: 'tipo-dispositivo-list.component.html',
  ////Se podrían definir estilos de la siguiente maner
  styleUrl: './tipo-dispositivo-list.component.css',
})

///OnInit se ejecuta inmediatamente la inicialización al componente
///Oninit conecta las suscripciones que están escuchando
///OnInit dispara al iniciar
///Hay que permanecer en escucha siempre que necesitemos que los componentes estén a la escucha.
export class TipoDispositivoListComponent implements OnInit {
  /////////////////INICIALIZACION DE VARIABLES///////////////////////////////////
  subs!: Subscription;

  columnas = ['tdiId', 'tdiNombre', 'acciones'];
  tdiModel!: TipoDispositivo[];
  // Propiedades para almacenar las selecciones
  estacionSeleccionada: number | undefined;
  tipoDispositivoSeleccionado: number | undefined;
  mostrarElemento: boolean = false;
  mostrarInsercion: boolean = false;
  dispositivoSeleccionado: TipoDispositivo = {
    tdiId: 0,
    tdiNombre: '',
  };
  dispositivoInsertar: any = {
    tdiNombre: '',
  };
  resultados: ResponseSearch[] = [];

  ////Catalogos :
  catalogoOpciones: ResponseCatalog = {
    tiposDispositivos: [],
    estaciones: [],
  };

  showMyComponent = true; // Esta variable controla la visibilidad del componente
  ////////////////////////////CONSTRUCTOR/////////////////////////////////////////////
  constructor(
    private tipoDispositivoService: TipoDispositivoService,
    private dialog: MatDialog,
    private toaster: ToastrService
  ) {
    this.tdiModel = [];
  }

  ////Equivalente a useEffect en React, se ejecuta cuando el componente se arma por primera vez

  ///-----------------------Lo hecho en clase presencial
  ngOnInit(): void {
    this.buscar();
    this.subs = this.tipoDispositivoService
      .getActualizarServicio()
      .subscribe(() => {
        this.buscar();
      });
  }

  edit(tdi: TipoDispositivo) {

    /////////////////LE PROPORCIONAMOS EL COMPONENTE A RENDERIZAR EN PANTALLA, EL CUAL ES LA TARJETA DE EDICION.
    
    this.dialog.open(TipoDispositivoEditComponent, {
      ///CLonar el dato original, copiarlo y no permitir que se modifique
      data: JSON.parse(JSON.stringify(tdi)),
      height: '300px',
      width: '500px',
      ////AL tocar fuera de la pantalla, no permitir cerrar
      disableClose: true,
    });
  }


  add() {
    let tipoDispositivo: TipoDispositivo = new TipoDispositivo();
    tipoDispositivo.tdiNombre = '';
    this.edit(tipoDispositivo);
  }

  borrar(tdi: TipoDispositivo) {
    const confirmaDialog = this.dialog.open(ConfirmacionComponent, {
      data: {
        titulo: 'Confirmación',
        mensaje: '¿Está seguro de eliminar el tipo de dispositivo?',
      },
    });

    confirmaDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.tipoDispositivoService.borrrar(tdi).subscribe({
          next: (result) => {
            if (result > 0) {
              this.toaster.success(
                'El tipo de dispositivo ha sido eliminado exitosamente',
                'Transacción exitosa'
              );
              this.tipoDispositivoService.setActualizaServicio(true);
            }else{
              this.toaster.error('Ha ocurrido un error', 'Error');
            }
          },
          error: (error) => {
            console.log(error);
            this.toaster.error('Ha ocurrido un error', 'Error');
          },
        });
      }
    });
  }

  /////////////////////////////////////////////////CRUD DE DISPOSITIVOS/////////////////////////////////////////////////////////////

  buscar() {
    ///Buscar en la bd todos los elementos encontrados.
    ///Subscribe significa que el método está a la espera de cuando termine el servicio
    ///next-> que haré cuando termine la suscripción
    ////error -> qué hacer si ocurre un error en la suscripción
    this.tipoDispositivoService.buscar().subscribe({
      next: (result) => {
        if (result != null) {
          this.tdiModel = result;
        }
      },
      error: (error) => {
        alert('ERROR');
      },
    });
    this.tipoDispositivoService.traerCatalogo().subscribe({
      next: (result) => {
        if (result != null) {
          console.log('RESULTADOS');
          console.log(result);
          this.catalogoOpciones = result;
        }
      },
      error: (error) => {
        alert('ERROR');
      },
    });
    ////A veces tenemos que desuscribir

    let i: number = 0;
  }

  guardarNuevoElemento() {
    this.tipoDispositivoService
      .insertar(this.dispositivoSeleccionado)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.buscar();
          this.dispositivoSeleccionado = {
            tdiId: 0,
            tdiNombre: '',
          };
        },
        error: (error) => {
          console.error('Error al agregar dispositivo:', error);
          alert('Ocurrió un error al agregar el dispositivo.');
        },
      });
  }

  eliminarItem(itemId: number) {
    console.log('Eliminar item con ID:', itemId);
    this.tipoDispositivoService.borrar(itemId).subscribe({
      next: () => {
        // Eliminación exitosa, actualiza la lista de tipos de dispositivos después de borrar
        this.buscar(); // Llama a buscar nuevamente para actualizar la lista
        console.log('Item eliminado exitosamente.');
      },
      error: (error) => {
        console.error('Error al intentar eliminar el item:', error);
        alert('Ocurrió un error al intentar eliminar el item.');
      },
    });
  }

  // Método para guardar los cambios del nombre editado
  guardarCambiosNombre() {
    // Llamar a actualizar en el servicio para guardar los cambios
    this.tipoDispositivoService
      .actualizar(this.dispositivoSeleccionado)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.buscar();
          this.mostrarElemento = false;
          // Puedes manejar la respuesta del servidor aquí según tus necesidades
        },
        error: (error) => {
          console.error('Error al actualizar dispositivo:', error);
          alert('Ocurrió un error al actualizar el dispositivo.');
        },
      });
  }

  editar(device: TipoDispositivo) {
    console.log('Información del dispositivo seleccionado:');
    console.log(device);
    this.mostrarInsercion = false;
    this.mostrarElemento = true;
    this.dispositivoSeleccionado.tdiNombre = device.tdiNombre;
    this.dispositivoSeleccionado.tdiId = device.tdiId;
  }

  ///////////////////////////////////////////////BUSQUEDA DE DISPOSITIVOS POR MEDIO DE INGRESAR ESTACION Y  TIPO DISPOSITIVO////////////////////////////
  busquedaDispositivosEstaciones() {
    console.log('ID SELECCIONADOS');
    console.log(this.estacionSeleccionada);
    console.log(this.tipoDispositivoSeleccionado);
    this.tipoDispositivoService
      .traerResultadosTabla(
        this.tipoDispositivoSeleccionado || 0,
        this.estacionSeleccionada || 0
      )
      .subscribe({
        next: (result) => {
          // Eliminación exitosa, actualiza la lista de tipos de dispositivos después de borrar
          console.log('Resultados de tabla:');
          console.log(result);
          this.resultados = result;
        },
        error: (error) => {
          console.error('Error al intentar eliminar el item:', error);
          alert('Ocurrió un error al intentar eliminar el item.');
        },
      });
  }

  /////////////////////////////////////////////////FUNCIONES TOGGLE/////////////////////////////////////////////////////////////

  toggleMostrarElemento() {
    this.mostrarElemento = !this.mostrarElemento;
  }
  toggleComponent() {
    // console.log("EJECUTANDO LIST COMPONENT:");
    this.showMyComponent = !this.showMyComponent;
    this.mostrarInsercion = false;
  }
  toggleMostrarInsercion() {
    this.dispositivoSeleccionado = {
      tdiId: 0,
      tdiNombre: '',
    };
    this.showMyComponent = false;
    this.mostrarInsercion = !this.mostrarInsercion;
  }
  toggleCerrarGuardar() {
    this.mostrarElemento = false;
  }

  /////////////////////////////////////////////////FUNCIONES EXTRA/////////////////////////////////////////////////////////////

  limpiarBusqueda() {
    this.estacionSeleccionada = undefined;
    this.tipoDispositivoSeleccionado = undefined;
    this.resultados = [];
  }

  // Método que se activa cuando cambia el nombre en el input
  onChangeNombreEditado(event: any) {
    this.dispositivoSeleccionado.tdiNombre = event.target.value;
  }
}
