import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActividadesZonaI } from 'src/app/interfaces/control-notas/actividades-zona'; 
import { ActividadesZonaService } from 'src/app/main/services/control-notas/actividades-zona.service'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-actualizar-actividad',
  templateUrl: './actualizar-actividad.component.html',
  styleUrls: ['./actualizar-actividad.component.css']
})
export class ActualizarActividadComponent implements OnInit {

form: FormGroup;
@ViewChild('frmActualizar') formU: NgForm;
actividadR: string | null;
response: string;

  constructor(
    private fb: FormBuilder,
    private _actividadService: ActividadesZonaService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService
  ) {
    this.form = this.fb.group({
      idActividad: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      ponderacion: ['', Validators.required]
    })
   }

  ngOnInit(): void {
      this.actividadR = localStorage.getItem('actividad');
      console.log(this.actividadR);
    this._actividadService.getActividadByID(this.actividadR).subscribe((res: any)=>{
      this.response = res;
      this.setCurrentActividad();
    });

  }

  actualizarActividad(form: any): void{    
    this._actividadService.actualizarActividad(form.value, this.actividadR).subscribe(res => {
      this._snackBarService.openSnackBar("¡Actividad de zona actualizada exitosamente!");
      localStorage.removeItem('actividad');
      this.router.navigateByUrl('/control-notas/actividades-zona');
    }, err => {
      console.log(err.error.code)
      if(err.error.code == 409){
        this._snackBarService.openSnackBar("¡El ID de la actividad ya existe!");
      } else {
        this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
      }
    }
    );
  }

  setCurrentActividad(): void{
let actividadSelected = Object.values(this.response);
this.form.setValue({
  idActividad: actividadSelected[0],
  nombre: actividadSelected[1],
  descripcion: actividadSelected[2],
  ponderacion: actividadSelected[3]
})
  }
}


