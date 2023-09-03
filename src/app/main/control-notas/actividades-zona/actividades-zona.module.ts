import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActividadesZonaComponent } from './actividades-zona/actividades-zona.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearActividadComponent } from './crear-actividad/crear-actividad.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActividadesZonaService } from '../../services/control-notas/actividades-zona.service';
import { ActualizarActividadComponent } from './actualizar-actividad/actualizar-actividad.component';

const routes: Routes = [
  {
    path: "",
    component: ActividadesZonaComponent,
  },
  {
    path: "crear-actividad",
    component: CrearActividadComponent
  },
  {
    path: "actualizar-actividad",
    component: ActualizarActividadComponent
  }
]

@NgModule({
  declarations: [
    ActividadesZonaComponent,
    CrearActividadComponent,
    ActualizarActividadComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ActividadesZonaService,
    HttpClientModule,
    ActualizarActividadComponent
  ]
})
export class ActividadesZonaModule { }
