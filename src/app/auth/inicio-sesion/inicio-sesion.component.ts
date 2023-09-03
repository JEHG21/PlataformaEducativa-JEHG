import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersI } from '../models/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService) { }

  ngOnInit(): void {
  }

  onLogin(form: any): void{
    this.authService.login(form.value).subscribe(res => {
        this._snackBarService.openSnackBar("Validación de credenciales exitosa, ¡Bienvenido!");
        this.router.navigateByUrl('/home/inicio');
    }, err => {
      console.log(err.error.code)
      if(err.error.code == 409){
        this._snackBarService.openSnackBar("¡Credenciales incorrectas! Intenta nuevamente");
        this.router.navigateByUrl('/auth/inicio-sesion');
      } else {
        this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
        this.router.navigateByUrl('/auth/inicio-sesion');
      }
    }
    );
  }

  onLogout(): void{
    this.authService.logout();
    this._snackBarService.openSnackBar("Sesión cerrada exitosamente, ¡Vuelve pronto!");
    this.router.navigateByUrl('/auth/inicio-sesion');
  }
}
