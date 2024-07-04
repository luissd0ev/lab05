import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TiendaOnlineService } from '../tienda-online.service';
import { RegisterForm } from '../tienda-online';
import { UserService } from '../servicios/user.services';
import { Router } from '@angular/router'; // Importa Router desde @angular/router


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

  constructor(private userService: UserService, private router: Router,   private toaster: ToastrService) {}

  ngOnInit(): void {}

  onRegister(): void {
    // Aquí iría la lógica de registro
    console.log(this.registerForm);
    this.userService.register(this.registerForm).subscribe({
      next: (result) => {
        console.log('Registro exitoso, esta es tu respuestssa:');
        console.log(result);
        
        this.toaster.success("Usuario registrado correctamente", "Registro exitoso"); 
        this.router.navigate(['/tech-market/login']);
      },
      error: (error) => {
        console.log(
          'Error al iniciar sesión, se presento el siguiente error: '
        );
        this.toaster.error(error.message, "Error"); 
        console.log(error);
      },
    });
  }
}
