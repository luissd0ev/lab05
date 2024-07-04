import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoginForm, LoginResponse } from '../../tienda-online';
import { TiendaOnlineService } from '../../tienda-online.service';
import { VentasService } from '../../../tipo-dispositivo/ventas/ventas.service';
import { Router } from '@angular/router'; // Importa Router desde @angular/router
import { LoginUserResponse } from '../../interfaces/User';
import { OrderService } from '../../servicios/order.services';
import { Orden } from '../../interfaces/Orders';

@Component({
  selector: 'orden',
  templateUrl: 'orden.component.html',
  ////Se podrían definir estilos de la siguiente maner
  styleUrl: './orden.component.css',
})

export class OrdenComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
