import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudiantesI } from '../../../../interfaces/personal/estudiantes';
import { EstudiantesService } from '../../../services/personal/estudiantes.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-crear-estudiante',
  templateUrl: './crear-estudiante.component.html',
  styleUrls: ['./crear-estudiante.component.css']
})
export class CrearEstudianteComponent implements OnInit {

estado: any[] = ['Activo', 'Inactivo']
form: FormGroup;

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
  }

  crearEstudiante(form: any): void{    
    this._estudianteService.crearEstudiante(form.value).subscribe(res => {
      this._snackBarService.openSnackBar("¡Estudiante creado exitosamente!");
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

}
