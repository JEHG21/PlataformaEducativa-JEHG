import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SeccionesI } from 'src/app/interfaces/control-academico/secciones'; 
import { SeccionesService } from 'src/app/main/services/control-academico/secciones.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-actualizar-seccion',
  templateUrl: './actualizar-seccion.component.html',
  styleUrls: ['./actualizar-seccion.component.css']
})
export class ActualizarSeccionComponent implements OnInit {

form: FormGroup;
@ViewChild('frmActualizar') formU: NgForm;
seccionR: string | null;
response: string;

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
      this.seccionR = localStorage.getItem('seccion');
      console.log(this.seccionR);
    this._seccionService.getSeccionByID(this.seccionR).subscribe((res: any)=>{
      this.response = res;
      this.setCurrentSeccion();
    });

  }

  actualizarSeccion(form: any): void{    
    this._seccionService.actualizarSeccion(form.value, this.seccionR).subscribe(res => {
      this._snackBarService.openSnackBar("¡Facultad actualizada exitosamente!");
      localStorage.removeItem('seccion');
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

  setCurrentSeccion(): void{
let seccionSelected = Object.values(this.response);
this.form.setValue({
  idSeccion: seccionSelected[0],
  seccion: seccionSelected[1],
})
  }
}


