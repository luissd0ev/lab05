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
import { LoginUserResponse } from '../interfaces/User';
import { OrderService } from '../servicios/order.services';
import { Orden } from '../interfaces/Orders';

@Component({
  selector: 'orden-compra',
  templateUrl: 'orden-compra.component.html',
  ////Se podrían definir estilos de la siguiente maner
  styleUrl: './orden-compra.component.css',
})
export class OrdenCompraComponent implements OnInit {
  currentUser: LoginUserResponse | null = null;
  ordenes: Orden[] = [];
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toaster: ToastrService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadUserFromStorage();
    console.log("INICIALIZANDO ORDEN DE COMPRA:"); 
    // Si hay un usuario actual, obtiene la información del carrito de compras
    if (this.currentUser) {
      this.buscarOrdenes(); 
    }
  }

   buscarOrdenes(){
    this.orderService.getOrdersUser(this.currentUser?.userId ?? 0).subscribe({
      next: result=>{
        console.log("Las ordenes recuperadas son las siguientes:");
        console.log(result);
        if(result != null){   
          this.ordenes = result;  
        }
       console.log("Resultado de this.ordenes"); 
       console.log(this.ordenes); 
        
      },
      error: error=>{
        alert("Error al recuperar.")
      }
    })
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
