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
import { ActivatedRoute, Router } from '@angular/router'; // Importa Router desde @angular/router
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
ordeness() {
throw new Error('Method not implemented.');
}
logOut() {
throw new Error('Method not implemented.');
}
visitCart() {
throw new Error('Method not implemented.');
}
inicio() {
throw new Error('Method not implemented.');
}
  currentUser: LoginUserResponse | null = null;
  ordenes: Orden[] = [];
  idOrder!: number;
  articulo: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private toaster: ToastrService,
    private orderService: OrderService
  ) {}


  ngOnInit(): void {
    this.loadUserFromStorage();
    this.route.paramMap.subscribe((params) => {
      this.idOrder = +params.get('idOrder')!; // El operador ! asume que 'id' siempre está presente
      this.buscarOrden();
    });
  }
  buscarOrden() {
    this.orderService
      .getCurrentOrder(this.currentUser?.userId ?? 0, this.idOrder)
      .subscribe({
        next: (result) => {
          console.log('Respuesta de la actual orden');
          console.log(result);
        },
        error: (error) => {
          console.log('Error al procesar orden actual');
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
}
