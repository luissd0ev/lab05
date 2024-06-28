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


  buscarElementosCarrito(idUser: number) {
    this.tiendaService.fetchShoppingCartInfo(idUser).subscribe({
        next: result=>{
            console.log("Respuesta exitosa en el carrito, elementos del carrito:");
            console.log(result);
        },
        error: error=>{
            console.log("Respuesta incorrecta del carrito");
            console.log(error); 
        }
    });
  }
}
