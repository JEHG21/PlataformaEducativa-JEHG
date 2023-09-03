import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RouterModule, Routes } from '@angular/router';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';

const routes = [
  {
    path: "inicio-sesion",
    component: InicioSesionComponent,
  },
  {
    path: "registro",
    component: RegistroComponent,
  }
]

@NgModule({
  declarations: [
    RegistroComponent,
    InicioSesionComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
