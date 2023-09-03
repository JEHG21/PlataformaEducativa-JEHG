import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

const appRoutes: Routes = [
  {
      path: 'auth',
      loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
      path: "home",
      loadChildren: () =>
          import("./main/home/home.module").then((m) => m.HomeModule),
  },
  {
      path: "administracion",
      loadChildren: () => import("./main/administracion/administracion.module").then((m) => m.AdministracionModule)
  },
  {
      path: "control-academico",
      loadChildren: () => 
          import("./main/control-academico/control-academico.module")
              .then((m) => m.ControlAcademicoModule)
  },
  {
      path: "control-notas",
      loadChildren: () =>
          import("./main/control-notas/control-notas.module").then((m) => m.ControlNotasModule),
  },
  {
      path: "personal",
      loadChildren: () => 
          import("./main/personal/personal.module")
              .then((m) => m.PersonalModule)            
  },
  {
      path: "**",
      redirectTo: "/auth/inicio-sesion",
  },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    SharedModule,
    NgbModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
