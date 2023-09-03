import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeccionesI } from 'src/app/interfaces/control-academico/secciones';
import { SeccionesService } from 'src/app/main/services/control-academico/secciones.service'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-crear-seccion',
  templateUrl: './crear-seccion.component.html',
  styleUrls: ['./crear-seccion.component.css']
})
export class CrearSeccionComponent implements OnInit {

form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _seccionService: SeccionesService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService
  ) {
    this.form = this.fb.group({
      idSeccion: ['', Validators.required],
      seccion: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  crearSeccion(form: any): void{

    this._seccionService.crearSeccion(form.value).subscribe(res => {
      this._snackBarService.openSnackBar("Sección creada exitosamente!");
      this.router.navigateByUrl('/control-academico/secciones');
    }, err => {
      console.log(err.error.code)
      if(err.error.code == 409){
        this._snackBarService.openSnackBar("¡El ID de la sección ya existe!");
      } else {
        this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
      }
    }
    );
  }

}



