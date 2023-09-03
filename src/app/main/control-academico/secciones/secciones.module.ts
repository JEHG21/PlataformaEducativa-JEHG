import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeccionesComponent } from './secciones/secciones.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearSeccionComponent } from './crear-seccion/crear-seccion.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SeccionesService } from '../../services/control-academico/secciones.service';
import { ActualizarSeccionComponent } from './actualizar-seccion/actualizar-seccion.component';

const routes: Routes = [
  {
    path: "",
    component: SeccionesComponent,
  },
  {
    path: "crear-seccion",
    component: CrearSeccionComponent
  },
  {
    path: "actualizar-seccion",
    component: ActualizarSeccionComponent
  }
]

@NgModule({
  declarations: [
    SeccionesComponent,
    CrearSeccionComponent,
    ActualizarSeccionComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    SeccionesService,
    HttpClientModule,
    ActualizarSeccionComponent
  ]
})
export class SeccionesModule { }
