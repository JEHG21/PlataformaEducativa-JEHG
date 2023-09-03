import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DocentesI } from 'src/app/interfaces/personal/docentes'; 
import { DocentesService } from 'src/app/main/services/personal/docentes.service'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-actualizar-docente',
  templateUrl: './actualizar-docente.component.html',
  styleUrls: ['./actualizar-docente.component.css']
})
export class ActualizarDocenteComponent implements OnInit {

estado: any[] = ['Activo', 'Inactivo']
form: FormGroup;
@ViewChild('frmActualizar') formU: NgForm;
dpiR: string | null;
response: string;

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
      this.dpiR = localStorage.getItem('dpi');
      console.log(this.dpiR);
    this._docenteService.getDocenteByID(this.dpiR).subscribe((res: any)=>{
      this.response = res;
      this.setCurrentDocente();
    });

  }

  actualizarDocente(form: any): void{    
    this._docenteService.actualizarDocente(form.value, this.dpiR).subscribe(res => {
      this._snackBarService.openSnackBar("¡Docente actualizado exitosamente!");
      localStorage.removeItem('dpi');
      this.router.navigateByUrl('/personal/docentes');
    }, err => {
      console.log(err.error.code)
      if(err.error.code == 409){
        this._snackBarService.openSnackBar("¡El dpi del docente ya existe!");
      } else {
        this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
      }
    }
    );
  }

  setCurrentDocente(): void{
let docenteSelected = Object.values(this.response);
this.form.setValue({
  dpi: docenteSelected[0],
  nombre: docenteSelected[1],
  correo: docenteSelected[2],
  celular: docenteSelected[3],
  estado: docenteSelected[4]
})
  }
}

