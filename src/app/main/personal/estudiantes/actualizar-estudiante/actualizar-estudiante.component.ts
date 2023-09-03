import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { EstudiantesI } from '../../../../interfaces/personal/estudiantes';
import { EstudiantesService } from '../../../services/personal/estudiantes.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-actualizar-estudiante',
  templateUrl: './actualizar-estudiante.component.html',
  styleUrls: ['./actualizar-estudiante.component.css']
})
export class ActualizarEstudianteComponent implements OnInit {

estado: any[] = ['Activo', 'Inactivo']
form: FormGroup;
@ViewChild('frmActualizar') formU: NgForm;
carnetR: string | null;
response: string;

  constructor(
    private fb: FormBuilder,
    private _estudianteService: EstudiantesService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService
  ) {
    this.form = this.fb.group({
      carnet: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      celular: ['', Validators.required],
      estado: ['', Validators.required]
    })
   }

  ngOnInit(): void {
      this.carnetR = localStorage.getItem('carnet');
      console.log(this.carnetR);
    this._estudianteService.getEstudianteByID(this.carnetR).subscribe((res: any)=>{
      this.response = res;
      this.setCurrentEstudiante();
    });

  }

  actualizarEstudiante(form: any): void{    
    this._estudianteService.actualizarEstudiante(form.value, this.carnetR).subscribe(res => {
      this._snackBarService.openSnackBar("¡Estudiante actualizado exitosamente!");
      localStorage.removeItem('carnet');
      this.router.navigateByUrl('/personal/estudiantes');
    }, err => {
      console.log(err.error.code)
      if(err.error.code == 409){
        this._snackBarService.openSnackBar("¡El carnet del estudiante ya existe!");
      } else {
        this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
      }
    }
    );
  }

  setCurrentEstudiante(): void{
let estudianteSelected = Object.values(this.response);
console.log('array: ', estudianteSelected);
this.form.setValue({
  carnet: estudianteSelected[0],
  nombre: estudianteSelected[1],
  correo: estudianteSelected[2],
  celular: estudianteSelected[3],
  estado: estudianteSelected[4]
})
  }
}

