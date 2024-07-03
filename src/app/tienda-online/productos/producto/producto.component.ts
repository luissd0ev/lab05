import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TiendaOnlineService } from '../../tienda-online.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddArticleBody, Article } from '../../interfaces/Articles';
import { CartService } from '../../servicios/cart.services';
import { ArticleService } from '../../servicios/article.services';
import { LoginResponse } from '../../tienda-online';

@Component({
  selector: 'producto',
  templateUrl: 'producto.component.html',
  ////Se podrían definir estilos de la siguiente maner
  styleUrl: './producto.component.css',
})
export class ProductoComponent implements OnInit {
  currentUser: LoginResponse = {
    message: '',
    isSuccessful: false,
    userId: 0,
    userName: '',
  };
  articuloId!: number;
  articulo: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private toaster: ToastrService,
    private cartService: CartService,
    private articleService: ArticleService
  ) {}

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

  buyNow(arg0: any) {
    throw new Error('Method not implemented.');
  }

  inicio() {
    this.router.navigate(['/tech-market/catalogo']);
  }

  ngOnInit(): void {
    this.loadUsersFromStorage();
    this.route.paramMap.subscribe((params) => {
      this.articuloId = +params.get('id')!; // El operador ! asume que 'id' siempre está presente
      this.getArticulo();
    });
  }
  getArticulo(): void {
    this.articleService.searchArticle(this.articuloId).subscribe({
      next: (data) => {
        this.articulo = data;
      },
      error: (error) => {
        console.error('Error al obtener el artículo', error);
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

  logOut() {
    throw new Error('Method not implemented.');
  }

  searchArticulo(idArticulo: number) {
    this.articleService.searchArticle(idArticulo).subscribe({
      next: (result) => {},
      error: (error) => {
        console.log('Error al procesar articulo');
      },
    });
  }

  ordenes() {
    this.router.navigate(['/tech-market/orden-compra']);
  }

  visitCart() {
    this.router.navigate(['/tech-market/carrito']);
  }
}
