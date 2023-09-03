import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocentesComponent } from './docentes/docentes.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearDocenteComponent } from './crear-docente/crear-docente.component';
import { DocentesService } from '../../services/personal/docentes.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActualizarDocenteComponent } from './actualizar-docente/actualizar-docente.component';

const routes: Routes = [
  {
    path: "",
    component: DocentesComponent,
  },
  {
    path: "crear-docente",
    component: CrearDocenteComponent
  },
  {
    path: "actualizar-docente",
    component: ActualizarDocenteComponent
  }
]

@NgModule({
  declarations: [
    DocentesComponent,
    CrearDocenteComponent,
    ActualizarDocenteComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DocentesService,
    HttpClientModule,
    ActualizarDocenteComponent
  ]
})
export class DocentesModule { }
