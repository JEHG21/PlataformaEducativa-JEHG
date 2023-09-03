import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosI } from 'src/app/interfaces/control-academico/cursos'; 
import { CursosService } from 'src/app/main/services/control-academico/cursos.service'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent implements OnInit {

form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _cursoService: CursosService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService
  ) {
    this.form = this.fb.group({
      idCurso: ['', Validators.required],
      nombre: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  crearCurso(form: any): void{

    this._cursoService.crearCurso(form.value).subscribe(res => {
      this._snackBarService.openSnackBar("Curso creado exitosamente!");
      this.router.navigateByUrl('/control-academico/cursos');
    }, err => {
      console.log(err.error.code)
      if(err.error.code == 409){
        this._snackBarService.openSnackBar("¡El ID del curso ya existe!");
      } else {
        this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
      }
    }
    );
  }

}



