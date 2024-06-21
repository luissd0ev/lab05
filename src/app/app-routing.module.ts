import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tipo-dispositivo',
        loadChildren: () =>
          import('./tipo-dispositivo/tipo-dispositivo.module').then(
            (m) => m.TipoDispositivoModule
          ),
      },
      {
        path: 'ventas',
        loadChildren: () =>
          import('./tipo-dispositivo/ventas/ventas.module').then(
            (m) => m.VentasModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
