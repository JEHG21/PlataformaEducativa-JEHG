import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { RolesI } from 'src/app/interfaces/administracion/roles'; 
import { RolesService } from 'src/app/main/services/administracion/roles.service'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-actualizar-rol',
  templateUrl: './actualizar-rol.component.html',
  styleUrls: ['./actualizar-rol.component.css']
})
export class ActualizarRolComponent implements OnInit {

opcion: any[] = ['Si', 'No']
form: FormGroup;
@ViewChild('frmActualizar') formU: NgForm;
rolR: string | null;
response: string;

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
      this.rolR = localStorage.getItem('rol');
      console.log(this.rolR);
    this._rolService.getRolByID(this.rolR).subscribe((res: any)=>{
      this.response = res;
      this.setCurrentRol();
    });

  }

  actualizarRol(form: any): void{    
    this._rolService.actualizarRol(form.value, this.rolR).subscribe(res => {
      this._snackBarService.openSnackBar("¡Rol actualizado exitosamente!");
      localStorage.removeItem('rol');
      this.router.navigateByUrl('/administracion/roles');
    }, err => {
      console.log(err.error.code)
      if(err.error.code == 409){
        this._snackBarService.openSnackBar("¡El ID del rol ya existe!");
      } else {
        this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
      }
    }
    );
  }

  setCurrentRol(): void{
let rolSelected = Object.values(this.response);
console.log(rolSelected);
this.form.setValue({
  _id: rolSelected[0],
  nombre: rolSelected[1],
  ver: rolSelected[2],
  crear: rolSelected[3],
  editar: rolSelected[4],
  eliminar: rolSelected[5]
})
  }
}


