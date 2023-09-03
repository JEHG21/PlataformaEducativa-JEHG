import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: "inicio",
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule),
  }
]

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
  ],
  exports: [
    RouterModule
  ]
})
export class HomeModule { }
