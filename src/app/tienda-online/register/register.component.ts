import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TiendaOnlineService } from '../tienda-online.service';
import { RegisterForm } from '../tienda-online';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  ////Se podrían definir estilos de la siguiente maner
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  
  registerForm: RegisterForm = {
    firstName: '',
    lastName: '',
    age: null,
    email: '',
    password: '',
  };

  constructor(private tiendaService: TiendaOnlineService) {}

  ngOnInit(): void {}

  onRegister(): void {
    // Aquí iría la lógica de registro
    console.log(this.registerForm);
    this.tiendaService.registroNuevoUsuario(this.registerForm).subscribe({
      next: (result) => {
        console.log('Registro exitoso, esta es tu respuesta:');
        console.log(result);
      },
      error: (error) => {
        console.log(
          'Error al iniciar sesión, se presento el siguiente error: '
        );
        console.log(error);
      },
    });
  }
}
