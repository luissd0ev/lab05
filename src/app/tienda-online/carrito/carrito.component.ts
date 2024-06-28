import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  LoginForm,
  LoginResponse,
  ShoppingCartResponse,
} from '../tienda-online';
import { TiendaOnlineService } from '../tienda-online.service';
import { VentasService } from '../../tipo-dispositivo/ventas/ventas.service';
import { Router } from '@angular/router'; // Importa Router desde @angular/router

@Component({
  selector: 'carrito',
  templateUrl: 'carrito.component.html',
  ////Se podrían definir estilos de la siguiente maner
  styleUrl: './carrito.component.css',
})
export class CarritoComponent implements OnInit {
  constructor(
    private router: Router,
    private tiendaService: TiendaOnlineService
  ) {}

  shoppingCartResponse: ShoppingCartResponse | null = null;

  currentUser: LoginResponse | null = null;

  ngOnInit(): void {
    this.loadUserFromStorage();
    if (this.currentUser) {
      this.buscarElementosCarrito(this.currentUser.userId); // Pasar el ID del usuario al método
    }
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      console.log('Usuario actual:', this.currentUser);
    } else {
      console.log('No se encontró información del usuario en localStorage.');
      this.router.navigate(['/tech-market/login']);
    }
  }
  pagarOrden() {
    console.log('ORDENNNN');
    const articulos = this.shoppingCartResponse?.items.map((articulo) => {
      return {
        idArticulo: articulo.idArticulo,
        precio: articulo.precio,
        cantidad: articulo.cantidad,
      };
    });
    let ordenCompraRequest = {
      idUsuario: this.currentUser?.userId ?? 0, // Proporciona un valor predeterminado de 0
      articulos: articulos && articulos.length > 0 ? articulos : [],
    };
    console.log('orden a procesar');
    console.log(ordenCompraRequest);
    this.tiendaService.generateOrderArticles(ordenCompraRequest).subscribe({
        next: result=>{
            console.log("FUNCIONO; respuesta");
            console.log(result);
            
        },
        error: error=>{
            console.log("ERROR AL PROCESAR");
            console.log(error);
        }
    })
    return;
    this.router.navigate(['/tech-market/orden-compra']);
  }
  buscarElementosCarrito(idUser: number) {
    this.tiendaService.fetchShoppingCartInfo(idUser).subscribe({
      next: (result) => {
        console.log('Respuesta exitosa en el carrito, elementos del carrito:');
        console.log(result);
        this.shoppingCartResponse = result;
      },
      error: (error) => {
        console.log('Respuesta incorrecta del carrito');
        console.log(error);
      },
    });
  }
}
