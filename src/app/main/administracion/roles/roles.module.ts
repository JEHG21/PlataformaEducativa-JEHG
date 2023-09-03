import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles/roles.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearRolComponent } from './crear-rol/crear-rol.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RolesService } from '../../services/administracion/roles.service';
import { ActualizarRolComponent } from './actualizar-rol/actualizar-rol.component';

const routes: Routes = [
  {
    path: "",
    component: RolesComponent,
  },
  {
    path: "crear-rol",
    component: CrearRolComponent
  },
  {
    path: "actualizar-rol",
    component: ActualizarRolComponent
  }
]

@NgModule({
  declarations: [
    RolesComponent,
    CrearRolComponent,
    ActualizarRolComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    RolesService,
    HttpClientModule,
    ActualizarRolComponent
  ]
})
export class RolesModule { }
