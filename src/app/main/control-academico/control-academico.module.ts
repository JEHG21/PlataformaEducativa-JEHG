import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "cursos",
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule),
  },
  {
    path: "facultades",
    loadChildren: () => import('./facultades/facultades.module').then(m => m.FacultadesModule),
  },
  {
    path: "secciones",
    loadChildren: () => import('./secciones/secciones.module').then(m => m.SeccionesModule),
  },
  {
    path: "sedes",
    loadChildren: () => import('./sedes/sedes.module').then(m => m.SedesModule),
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ControlAcademicoModule { }
