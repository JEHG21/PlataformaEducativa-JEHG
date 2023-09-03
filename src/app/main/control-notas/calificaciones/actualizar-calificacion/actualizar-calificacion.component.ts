import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CalificacionesI } from 'src/app/interfaces/control-notas/calificaciones'; 
import { CalificacionesService } from 'src/app/main/services/control-notas/calificaciones.service'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-actualizar-calificacion',
  templateUrl: './actualizar-calificacion.component.html',
  styleUrls: ['./actualizar-calificacion.component.css']
})
export class ActualizarCalificacionComponent implements OnInit {

form: FormGroup;
@ViewChild('frmActualizar') formU: NgForm;
calificacionR: string | null;
response: string;

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
      this.calificacionR = localStorage.getItem('calificacion');
      console.log(this.calificacionR);
    this._calificacionService.getCalificacionByID(this.calificacionR).subscribe((res: any)=>{
      this.response = res;
      this.setCurrentCalificacion();
    });

  }

  actualizarCalificacion(form: any): void{    
    this._calificacionService.actualizarCalificacion(form.value, this.calificacionR).subscribe(res => {
      this._snackBarService.openSnackBar("¡Calificación actualizada exitosamente!");
      localStorage.removeItem('calificacion');
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

  setCurrentCalificacion(): void{
let calificacionSelected = Object.values(this.response);
this.form.setValue({
  idCalificacion: calificacionSelected[0],
  carnetEstudiante: calificacionSelected[1],
  idActividad: calificacionSelected[2],
  punteo: calificacionSelected[3]
})
  }
}


