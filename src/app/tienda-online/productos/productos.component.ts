import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ArticuloBusqueda, LoginResponse } from '../tienda-online';
import { TiendaOnlineService } from '../tienda-online.service';
import { Router } from '@angular/router';

@Component({
  selector: 'productos',
  templateUrl: 'productos.component.html',
  ////Se podrían definir estilos de la siguiente maner
  styleUrl: './productos.component.css',
})
export class ProductosComponent implements OnInit {
  
  productos: ArticuloBusqueda[] = []; // Array para almacenar los productos
  constructor(
    private router: Router,
    private tiendaService: TiendaOnlineService
  ) {}

  currentUser: LoginResponse = {
    message: '',
    isSuccessful: false,
    userId: 0,
    userName: '',
  };

  ngOnInit(): void {
    this.buscarProductosTienda(); 
    this.cargarUsuarioDesdeStorage(); 
  }

  private cargarUsuarioDesdeStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      console.log('Usuario actual:', this.currentUser);
    } else {
      console.log('No se encontró información del usuario en localStorage.');
      // Puedes manejar esto según tu lógica, por ejemplo, redirigir a la página de inicio de sesión
    }
  }

  buscarProductosTienda() {
    this.tiendaService.buscarProductos().subscribe({
      next: (result) => {
        console.log('Respuesta de productos del servidor');
        console.log(result);
        this.productos = result; // Almacenar los productos en la variable del componente
      },
      error: (error) => {
        console.log('Respuesta fallida del servidor');
      },
    });
  }
}
