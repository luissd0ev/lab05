import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TipoDispositivoModule } from './tipo-dispositivo/tipo-dispositivo.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VentasModule } from './tipo-dispositivo/ventas/ventas.module';
import { TiendaOnlineModule } from './tienda-online/tienda-online.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  /////Se importan los componentes
  imports: [
    BrowserModule,
    AppRoutingModule, 
    TipoDispositivoModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    VentasModule,
    TiendaOnlineModule
  ],
  ////Puede agregar todos 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
