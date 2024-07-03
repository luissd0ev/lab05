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
} from '../../tienda-online';
import { TiendaOnlineService } from '../../tienda-online.service';
import { Router } from '@angular/router';
import { AddArticleBody, Article } from '../../interfaces/Articles';
import { CartService } from '../../servicios/cart.services';
import { ArticleService } from '../../servicios/article.services';

@Component({
  selector: 'productos',
  templateUrl: 'productos.component.html',
  ////Se podrían definir estilos de la siguiente maner
  styleUrl: './productos.component.css',
})
export class ProductosComponent implements OnInit {
  productos: Article[] = []; // Array para almacenar los productos

  currentUser: LoginResponse = {
    message: '',
    isSuccessful: false,
    userId: 0,
    userName: '',
  };

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toaster: ToastrService,
    private cartService: CartService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.searchArticles();
    this.loadUsersFromStorage();
  }

  addToCart(producto: Article) {
    let objectAddElementToCart: AddArticleBody = {
      idUsuario: this.currentUser.userId,
      idArticulo: producto.idart,
      price: producto.priceart,
      cantidad: 1,
    };

    this.cartService.addElementToCart(objectAddElementToCart).subscribe({
      next: (result) => {
        console.log('Respuesta del carrito, el servidor proceso correctamente');
        this.toaster.success(
          'El articulo fue agregado exitosamente al carrito',
          'Transacción exitosa'
        );
        console.log(result);
      },
      error: (error) => {
        console.log('Hubo un error al procesar el articulo');
        this.toaster.error(
          'No se pudo agregar el elemento al carrito, no quedan más elementos en stock'
        );
      },
    });
  }
  loadUsersFromStorage(): void {
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

  logOut(): void {
    // Limpiar toda la información del localStorage
    localStorage.clear();

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/tech-market/login']);
  }

  ordenes() {
    this.router.navigate(['/tech-market/orden-compra']);
  }

  searchArticles() {
    this.articleService.searchArticles().subscribe({
      next: (result) => {
        console.log('Respuesta de productos del servidor');
        console.log(result);
        // Ordenar los productos por nombre de artículo en orden alfabético
        this.productos = result.sort((a, b) => {
          if (a.nameart < b.nameart) {
            return -1;
          }
          if (a.nameart > b.nameart) {
            return 1;
          }
          return 0;
        });
      },
      error: (error) => {
        console.log('Respuesta fallida del servidor');
      },
    });
  }

  viewProduct(articulo: Article) {
    this.router.navigate([`/tech-market/articulo/${articulo.idart}`]);
  }

  visitCart() {
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/tech-market/carrito']);
  }
}
