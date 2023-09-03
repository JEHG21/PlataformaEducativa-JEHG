import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "roles",
    loadChildren: () => import('./roles/roles.module').then((m) => m.RolesModule),
  },
  {
    path: "usuarios",
    loadChildren: () => import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AdministracionModule { }
