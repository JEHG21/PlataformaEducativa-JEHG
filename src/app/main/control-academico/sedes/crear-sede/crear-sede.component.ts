import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SedesI } from 'src/app/interfaces/control-academico/sedes';
import { SedesService } from 'src/app/main/services/control-academico/sedes.service'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-crear-sede',
  templateUrl: './crear-sede.component.html',
  styleUrls: ['./crear-sede.component.css']
})
export class CrearSedeComponent implements OnInit {

form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _sedeService: SedesService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService
  ) {
    this.form = this.fb.group({
      idSede: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      celular: ['', Validators.required],
      correo: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  crearSede(form: any): void{

    this._sedeService.crearSede(form.value).subscribe(res => {
      this._snackBarService.openSnackBar("Sede creada exitosamente!");
      this.router.navigateByUrl('/control-academico/sedes');
    }, err => {
      console.log(err.error.code)
      if(err.error.code == 409){
        this._snackBarService.openSnackBar("¡El ID de la sede ya existe!");
      } else {
        this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
      }
    }
    );
  }

}

