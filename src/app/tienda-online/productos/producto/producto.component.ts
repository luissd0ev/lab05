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
  selector: 'producto',
  templateUrl: 'producto.component.html',
  ////Se podrían definir estilos de la siguiente maner
  styleUrl: './producto.component.css',
})
export class ProductoComponent implements OnInit {
  logOut() {
    throw new Error('Method not implemented.');
  }
  visitCart() {
    throw new Error('Method not implemented.');
  }
  ordenes() {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
