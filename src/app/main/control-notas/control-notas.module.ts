import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "actividades-zona",
    loadChildren: () => import('./actividades-zona/actividades-zona.module').then(m => m.ActividadesZonaModule),
  },
  {
    path: "calificaciones",
    loadChildren: () => import('./calificaciones/calificaciones.module').then(m => m.CalificacionesModule),
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ControlNotasModule { }
