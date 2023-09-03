import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesI } from 'src/app/interfaces/administracion/roles';
import { RolesService } from 'src/app/main/services/administracion/roles.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-crear-rol',
  templateUrl: './crear-rol.component.html',
  styleUrls: ['./crear-rol.component.css']
})
export class CrearRolComponent implements OnInit {

opcion: any[] = ['Si', 'No']
form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _rolService: RolesService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService
  ) {
    this.form = this.fb.group({
      _id: ['', Validators.required],
      nombre: ['', Validators.required],
      ver: ['', Validators.required],
      crear: ['', Validators.required],
      editar: ['', Validators.required],
      eliminar: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  crearRol(form: any): void{

    this._rolService.crearRol(form.value).subscribe(res => {
      this._snackBarService.openSnackBar("Rol creado exitosamente!");
      this.router.navigateByUrl('/administracion/roles');
    }, err => {
      console.log(err.error.code)
      if(err.error.code == 409){
        this._snackBarService.openSnackBar("¡El rol ingresado ya existe!");
      } else {
        this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
      }
    }
    );
  }

}
