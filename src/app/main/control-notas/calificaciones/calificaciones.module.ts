import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalificacionesComponent } from './calificaciones/calificaciones.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { IngresarCalificacionComponent } from './ingresar-calificacion/ingresar-calificacion.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CalificacionesService } from '../../services/control-notas/calificaciones.service';
import { ActualizarCalificacionComponent } from './actualizar-calificacion/actualizar-calificacion.component';

const routes: Routes = [
  {
    path: "",
    component: CalificacionesComponent,
  },
  {
    path: "ingresar-calificacion",
    component: IngresarCalificacionComponent
  },
  {
    path: "actualizar-calificacion",
    component: ActualizarCalificacionComponent
  }
]

@NgModule({
  declarations: [
    CalificacionesComponent,
    IngresarCalificacionComponent,
    ActualizarCalificacionComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CalificacionesService,
    HttpClientModule,
    ActualizarCalificacionComponent
  ]
})
export class CalificacionesModule { }
