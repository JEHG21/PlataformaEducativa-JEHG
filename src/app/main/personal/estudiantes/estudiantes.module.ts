import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { EstudiantesService } from '../../services/personal/estudiantes.service';
import { HttpClientModule } from '@angular/common/http';
import { CrearEstudianteComponent } from './crear-estudiante/crear-estudiante.component';
import {FormsModule} from '@angular/forms';
import { ActualizarEstudianteComponent } from './actualizar-estudiante/actualizar-estudiante.component';

const routes: Routes = [
  {
    path: "",
    component: EstudiantesComponent,
  },
  {
    path: "crear-estudiante",
    component: CrearEstudianteComponent
  },
  {
    path: "actualizar-estudiante",
    component: ActualizarEstudianteComponent
  }
]

@NgModule({
  declarations: [
    EstudiantesComponent,
    CrearEstudianteComponent,
    ActualizarEstudianteComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    EstudiantesService,
    HttpClientModule,
    ActualizarEstudianteComponent
  ]
})
export class EstudiantesModule { }
