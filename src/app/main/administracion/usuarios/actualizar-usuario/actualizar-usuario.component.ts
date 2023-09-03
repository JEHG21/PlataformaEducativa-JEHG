import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UsuariosI } from 'src/app/interfaces/administracion/usuarios';
import { UsuariosService } from 'src/app/main/services/administracion/usuarios.service'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent implements OnInit {

form: FormGroup;
@ViewChild('frmActualizar') formU: NgForm;
usuarioR: string | null;
response: string;

  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuariosService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService
  ) {
    this.form = this.fb.group({
      _id: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', Validators.required]
    })
   }

  ngOnInit(): void {
      this.usuarioR = localStorage.getItem('usuarioID');
      console.log(this.usuarioR);
    this._usuarioService.getUsuarioByID(this.usuarioR).subscribe((res: any)=>{
      this.response = res;
      this.setCurrentUsuario();
    });

  }

  actualizarUsuario(form: any): void{    
    this._usuarioService.actualizarUsuario(form.value, this.usuarioR).subscribe(res => {
      this._snackBarService.openSnackBar("¡Usuario actualizado exitosamente!");
      localStorage.removeItem('usuarioID');
      this.router.navigateByUrl('/administracion/usuarios');
    }, err => {
      console.log(err.error.code)
      if(err.error.code == 409){
        this._snackBarService.openSnackBar("¡El ID del usuario ya existe!");
      } else {
        this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
      }
    }
    );
  }

  setCurrentUsuario(): void{
let usuarioSelected = Object.values(this.response);
this.form.setValue({
  _id: usuarioSelected[0],
  nombre: usuarioSelected[1],
  email: usuarioSelected[2]
})
  }
}

