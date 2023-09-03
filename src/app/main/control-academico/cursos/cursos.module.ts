import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos/cursos.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearCursoComponent } from './crear-curso/crear-curso.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CursosService } from '../../services/control-academico/cursos.service';
import { ActualizarCursoComponent } from './actualizar-curso/actualizar-curso.component';

const routes: Routes = [
  {
    path: "",
    component: CursosComponent,
  },
  {
    path: "crear-curso",
    component: CrearCursoComponent
  },
  {
    path: "actualizar-curso",
    component: ActualizarCursoComponent
  }
]

@NgModule({
  declarations: [
    CursosComponent,
    CrearCursoComponent,
    ActualizarCursoComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CursosService,
    HttpClientModule,
    ActualizarCursoComponent
  ]
})
export class CursosModule { }
