import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacultadesI } from 'src/app/interfaces/control-academico/facultades'; 
import { FacultadesService } from 'src/app/main/services/control-academico/facultades.service'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-crear-facultad',
  templateUrl: './crear-facultad.component.html',
  styleUrls: ['./crear-facultad.component.css']
})
export class CrearFacultadComponent implements OnInit {

form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _facultadService: FacultadesService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService
  ) {
    this.form = this.fb.group({
      idFacultad: ['', Validators.required],
      nombre: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  crearFacultad(form: any): void{

    this._facultadService.crearFacultad(form.value).subscribe(res => {
      this._snackBarService.openSnackBar("Facultad creada exitosamente!");
      this.router.navigateByUrl('/control-academico/facultades');
    }, err => {
      console.log(err.error.code)
      if(err.error.code == 409){
        this._snackBarService.openSnackBar("¡El ID de la facultad ya existe!");
      } else {
        this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
      }
    }
    );
  }

}


