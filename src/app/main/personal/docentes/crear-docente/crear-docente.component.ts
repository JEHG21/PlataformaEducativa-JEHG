import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocentesI } from 'src/app/interfaces/personal/docentes'; 
import { DocentesService } from 'src/app/main/services/personal/docentes.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-crear-docente',
  templateUrl: './crear-docente.component.html',
  styleUrls: ['./crear-docente.component.css']
})
export class CrearDocenteComponent implements OnInit {

estado: any[] = ['Activo', 'Inactivo']
form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _docenteService: DocentesService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService
  ) {
    this.form = this.fb.group({
      dpi: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      celular: ['', Validators.required],
      estado: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  crearDocente(form: any): void{

    this._docenteService.crearDocente(form.value).subscribe(res => {
      this._snackBarService.openSnackBar("Docente creado exitosamente!");
      this.router.navigateByUrl('/personal/docentes');
    }, err => {
      console.log(err.error.code)
      if(err.error.code == 409){
        this._snackBarService.openSnackBar("¡El DPI del docente ya existe!");
      } else {
        this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
      }
    }
    );
  }

}
