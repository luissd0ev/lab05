import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TiendaOnlineService } from '../../tienda-online.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddArticleBody, Article } from '../../interfaces/Articles';
import { CartService } from '../../servicios/cart.services';
import { ArticleService } from '../../servicios/article.services';

@Component({
  selector: 'producto',
  templateUrl: 'producto.component.html',
  ////Se podrían definir estilos de la siguiente maner
  styleUrl: './producto.component.css',
})
export class ProductoComponent implements OnInit {
buyNow(arg0: any) {
throw new Error('Method not implemented.');
}
addToCart(arg0: any) {
throw new Error('Method not implemented.');
}
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

  ngOnInit(): void {
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
    throw new Error('Method not implemented.');
  }

  visitCart() {
    throw new Error('Method not implemented.');
  }
}
