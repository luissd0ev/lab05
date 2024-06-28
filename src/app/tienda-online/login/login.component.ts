import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  ////Se podrían definir estilos de la siguiente maner
  styleUrl: './login.component.css',
})

export class LoginComponent implements OnInit {
    ngOnInit(): void {
       
    }
}