import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SedesComponent } from './sedes/sedes.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearSedeComponent } from './crear-sede/crear-sede.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SedesService } from '../../services/control-academico/sedes.service';
import { ActualizarSedeComponent } from './actualizar-sede/actualizar-sede.component';

const routes: Routes = [
  {
    path: "",
    component: SedesComponent,
  },
  {
    path: "crear-sede",
    component: CrearSedeComponent
  },
  {
    path: "actualizar-sede",
    component: ActualizarSedeComponent
  }
]

@NgModule({
  declarations: [
    SedesComponent,
    CrearSedeComponent,
    ActualizarSedeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    SedesService,
    HttpClientModule,
    ActualizarSedeComponent
  ]
})
export class SedesModule { }
