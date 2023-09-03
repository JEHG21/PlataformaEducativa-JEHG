import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { NavbarComponent } from '../navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  }
]

@NgModule({
  declarations: [
    InicioComponent,
    NavbarComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})
export class InicioModule { }
