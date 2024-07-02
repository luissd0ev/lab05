import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoginForm, LoginResponse } from '../tienda-online';
import { TiendaOnlineService } from '../tienda-online.service';
import { VentasService } from '../../tipo-dispositivo/ventas/ventas.service';
import { Router } from '@angular/router'; // Importa Router desde @angular/router

@Component({
    selector: 'orden-compra',
    templateUrl: 'orden-compra.component.html',
    ////Se podrían definir estilos de la siguiente maner
    styleUrl: './orden-compra.component.css',
  })

  export class OrdenCompraComponent implements OnInit {
    ngOnInit(): void {
       
    }
}