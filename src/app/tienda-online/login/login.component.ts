import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoginForm } from '../tienda-online';
import { TiendaOnlineService } from '../tienda-online.service';
import { VentasService } from '../../tipo-dispositivo/ventas/ventas.service';
import { Router } from '@angular/router'; // Importa Router desde @angular/router
import { UserInfoCredentials } from '../interfaces/User';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  ////Se podrían definir estilos de la siguiente maner
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  
  userInfo: UserInfoCredentials = {
    email: '',
    passworduser: '',
  };


  constructor(
    private router: Router,
    private tiendaService: TiendaOnlineService,
    private dialog: MatDialog,
    private toaster: ToastrService
  ) {}


  ngOnInit(): void {}

  onLogin() {
    console.log(this.userInfo);

    this.tiendaService.iniciarSesion(this.userInfo).subscribe({
      next: (result) => {
        // Redirigir a la página de registro
        if (result.isSuccessful) {
          console.log('Inicio de sesión exitoso, esta es tu respuesta:');
          console.log(result);
          // Guardar información del usuario en localStorage
          localStorage.setItem('currentUser', JSON.stringify(result));
          this.toaster.success(
            'Inicio de sesión exitoso',
            'Bienvenido'
          );
          this.router.navigate(['/tech-market/catalogo']);
        } else {
          console.log('Credenciales incorrectas');
          this.toaster.error("Credenciales incorrectas")
        }
      },
      error: (error) => {
        console.log(
          'Error al iniciar sesión, se presento el siguiente error: '
        );
        this.toaster.error("Credenciales incorrectas")
        console.log(error);
      },
    });
  }
}
