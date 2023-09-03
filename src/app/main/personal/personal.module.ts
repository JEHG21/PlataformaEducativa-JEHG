import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "docentes",
    loadChildren: () => import('./docentes/docentes.module').then(m => m.DocentesModule),
  },
  {
    path: "estudiantes",
    loadChildren: () => import('./estudiantes/estudiantes.module').then(m => m.EstudiantesModule),
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class PersonalModule { }
