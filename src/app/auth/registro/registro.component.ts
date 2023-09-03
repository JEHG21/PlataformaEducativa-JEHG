import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersI } from '../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService) { }

  ngOnInit(): void {
  }

  onRegister(form: any):void{
    this.authService.register(form.value).subscribe(res => {
      this._snackBarService.openSnackBar("¡Cuenta creada exitosamente!");
      this.router.navigateByUrl('/auth/inicio-sesion');
    }, err => {
      console.log(err.error.code)
      if(err.error.code == 409){
        this._snackBarService.openSnackBar("¡El email del usuario ya existe!");
        this.router.navigateByUrl('/auth/registro');
      } else {
        this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
        this.router.navigateByUrl('/auth/registro');
      }
    }
    );
  }
}
