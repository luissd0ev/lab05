import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  AddToCarritoParams,
  ArticuloBusqueda,
  LoginResponse,
} from '../tienda-online';
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
      // Redirigir a la página de inicio de sesión
      this.router.navigate(['/tech-market/login']);
    }
  }

  viewProduct(arg0: number) {
    throw new Error('Method not implemented.');
  }


  addToCart(producto: ArticuloBusqueda) {
    console.log('Producto en cuestión:');
    console.log(producto);
    let objectAddElementToCart: AddToCarritoParams = {
      idUsuario: this.currentUser.userId,
      idArticulo: producto.idart,
      price: producto.priceart,
      cantidad: 1,
    };
    this.tiendaService.addElementToCart(objectAddElementToCart).subscribe({
      next: (result) => {
        console.log('Respuesta del carrito, el servidor proceso correctamente');
        console.log(result);
      },
      error: (error) => {
        console.log('Hubo un error al procesar el articulo');
      },
    });
  }

  cerrarSesion(): void {
    // Limpiar toda la información del localStorage
    localStorage.clear();

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/tech-market/login']);
  }
  visitarCarrito() {
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/tech-market/carrito']);
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
