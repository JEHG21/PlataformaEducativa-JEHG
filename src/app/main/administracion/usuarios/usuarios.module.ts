import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/administracion/usuarios.service';
import { ActualizarUsuarioComponent } from './actualizar-usuario/actualizar-usuario.component';

const routes: Routes = [
  {
    path: "",
    component: UsuariosComponent
  },
  {
    path: "actualizar-usuario",
    component: ActualizarUsuarioComponent
  }
]

@NgModule({
  declarations: [
    UsuariosComponent,
    ActualizarUsuarioComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    UsuariosService,
    HttpClientModule,
    ActualizarUsuarioComponent
  ]
})
export class UsuariosModule { }
