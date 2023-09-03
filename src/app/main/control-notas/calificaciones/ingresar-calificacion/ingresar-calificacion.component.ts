import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalificacionesI } from 'src/app/interfaces/control-notas/calificaciones'; 
import { CalificacionesService } from 'src/app/main/services/control-notas/calificaciones.service';  
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-ingresar-calificacion',
  templateUrl: './ingresar-calificacion.component.html',
  styleUrls: ['./ingresar-calificacion.component.css']
})
export class IngresarCalificacionComponent implements OnInit {

form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _calificacionService: CalificacionesService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService
  ) {
    this.form = this.fb.group({
      idCalificacion: ['', Validators.required],
      carnetEstudiante: ['', Validators.required],
      idActividad: ['', Validators.required],
      punteo: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  crearCalificacion(form: any): void{

    this._calificacionService.crearCalificacion(form.value).subscribe(res => {
      this._snackBarService.openSnackBar("Calificación ingresada exitosamente!");
      this.router.navigateByUrl('/control-notas/calificaciones');
    }, err => {
      console.log(err.error.code)
      if(err.error.code == 409){
        this._snackBarService.openSnackBar("¡El ID de la calificación ya existe!");
      } else {
        this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
      }
    }
    );
  }

}

