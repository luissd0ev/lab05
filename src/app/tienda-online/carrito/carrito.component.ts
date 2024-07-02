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
 
} from '../tienda-online';
import { TiendaOnlineService } from '../tienda-online.service';
import { VentasService } from '../../tipo-dispositivo/ventas/ventas.service';
import { Router } from '@angular/router'; // Importa Router desde @angular/router
import { ShoppingCartResponse } from '../interfaces/Cart';
import { LoginUserResponse } from '../interfaces/User';
import { CartService } from '../servicios/cart.services';
import { ArticleService } from '../servicios/article.services';
import { OrderService } from '../servicios/order.services';

@Component({
  selector: 'carrito',
  templateUrl: 'carrito.component.html',
  ////Se podrían definir estilos de la siguiente maner
  styleUrl: './carrito.component.css',
})
export class CarritoComponent implements OnInit {

  shoppingCartResponse: ShoppingCartResponse | null = null;

  currentUser: LoginUserResponse | null = null;

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService
  ) {}


  ngOnInit(): void {
    // Carga el usuario desde localStorage al inicializar el componente
    this.loadUserFromStorage();

    // Si hay un usuario actual, obtiene la información del carrito de compras
    if (this.currentUser) {
      this.fetchShoppingCartInfo(this.currentUser.userId); // Pasar el ID del usuario al método
    }
  }

  // Obtiene la información del carrito de compras para un usuario específico
  fetchShoppingCartInfo(idUser: number) {
    this.cartService.fetchShoppingCartInfo(idUser).subscribe({
      next: (result) => {
        console.log('Respuesta exitosa en el carrito, elementos del carrito:');
        console.log(result);
        this.shoppingCartResponse = result; // Almacena la respuesta en la propiedad shoppingCartResponse
      },
      error: (error) => {
        console.log('Respuesta incorrecta del carrito');
        console.log(error);
      },
    });
  }

  // Carga el usuario actual desde localStorage
  loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser); // Almacena el usuario actual en la propiedad currentUser
      console.log('Usuario actual:', this.currentUser);
    } else {
      console.log('No se encontró información del usuario en localStorage.');
      this.router.navigate(['/tech-market/login']); // Redirige a la página de login si no hay usuario
    }
  }

  // Procesa el pago de la orden
  payOrder() {
    // Mapea los artículos del carrito a un formato adecuado para la orden de compra
    const articulos = this.shoppingCartResponse?.items.map((articulo) => {
      return {
        idArticulo: articulo.idArticulo,
        precio: articulo.precio,
        cantidad: articulo.cantidad,
      };
    });

    // Crea el objeto de solicitud para la orden de compra
    let ordenCompraRequest = {
      idUsuario: this.currentUser?.userId ?? 0, // Proporciona un valor predeterminado de 0 si no hay usuario
      articulos: articulos && articulos.length > 0 ? articulos : [], // Verifica que haya artículos
    };

    console.log('orden a procesar');
    console.log(ordenCompraRequest);

    // Llama al servicio para generar la orden de compra
    this.orderService.generateOrderArticles(ordenCompraRequest).subscribe({
      next: (result) => {
        console.log('FUNCIONO; respuesta');
        console.log(result);
      },
      error: (error) => {
        console.log('ERROR AL PROCESAR');
        console.log(error);
      },
    });

    return;
    this.router.navigate(['/tech-market/orden-compra']); // Redirige a la página de la orden de compra (esta línea no se ejecuta debido al return anterior)
  }
}
