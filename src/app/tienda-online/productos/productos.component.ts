import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'productos',
  templateUrl: 'productos.component.html',
  ////Se podrían definir estilos de la siguiente maner
  styleUrl: './productos.component.css',
})

export class ProductosComponent implements OnInit {
    ngOnInit(): void {
       
    }
}