import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultadesComponent } from './facultades/facultades.component'; 
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearFacultadComponent } from './crear-facultad/crear-facultad.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FacultadesService } from '../../services/control-academico/facultades.service';
import { ActualizarFacultadComponent } from './actualizar-facultad/actualizar-facultad.component';

const routes: Routes = [
  {
    path: "",
    component: FacultadesComponent,
  },
  {
    path: "crear-facultad",
    component: CrearFacultadComponent
  },
  {
    path: "actualizar-facultad",
    component: ActualizarFacultadComponent
  }
]

@NgModule({
  declarations: [
    FacultadesComponent,
    CrearFacultadComponent,
    ActualizarFacultadComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    FacultadesService,
    HttpClientModule,
    ActualizarFacultadComponent
  ]
})
export class FacultadesModule { }
