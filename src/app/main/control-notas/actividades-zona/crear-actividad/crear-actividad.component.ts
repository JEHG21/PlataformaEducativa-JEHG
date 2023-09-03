import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActividadesZonaI } from 'src/app/interfaces/control-notas/actividades-zona'; 
import { ActividadesZonaService } from 'src/app/main/services/control-notas/actividades-zona.service'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent implements OnInit {

form: FormGroup;

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
  }

  crearActividad(form: any): void{

    this._actividadService.crearActividad(form.value).subscribe(res => {
      this._snackBarService.openSnackBar("Actividad de zona creada exitosamente!");
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

}
