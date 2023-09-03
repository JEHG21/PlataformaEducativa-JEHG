import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CursosI } from 'src/app/interfaces/control-academico/cursos';  
import { CursosService } from 'src/app/main/services/control-academico/cursos.service'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-actualizar-curso',
  templateUrl: './actualizar-curso.component.html',
  styleUrls: ['./actualizar-curso.component.css']
})
export class ActualizarCursoComponent implements OnInit {

form: FormGroup;
@ViewChild('frmActualizar') formU: NgForm;
cursoR: string | null;
response: string;

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
      this.cursoR = localStorage.getItem('curso');
      console.log(this.cursoR);
    this._cursoService.getCursoByID(this.cursoR).subscribe((res: any)=>{
      this.response = res;
      this.setCurrentCurso();
    });

  }

  actualizarCurso(form: any): void{    
    this._cursoService.actualizarCurso(form.value, this.cursoR).subscribe(res => {
      this._snackBarService.openSnackBar("¡Curso actualizado exitosamente!");
      localStorage.removeItem('curso');
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

  setCurrentCurso(): void{
let cursoSelected = Object.values(this.response);
this.form.setValue({
  idCurso: cursoSelected[0],
  nombre: cursoSelected[1],
})
  }
}



