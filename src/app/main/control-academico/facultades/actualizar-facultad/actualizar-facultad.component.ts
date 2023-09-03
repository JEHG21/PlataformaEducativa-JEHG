import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FacultadesI } from 'src/app/interfaces/control-academico/facultades'; 
import { FacultadesService } from 'src/app/main/services/control-academico/facultades.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-actualizar-facultad',
  templateUrl: './actualizar-facultad.component.html',
  styleUrls: ['./actualizar-facultad.component.css']
})
export class ActualizarFacultadComponent implements OnInit {

form: FormGroup;
@ViewChild('frmActualizar') formU: NgForm;
facultadR: string | null;
response: string;

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
      this.facultadR = localStorage.getItem('facultad');
      console.log(this.facultadR);
    this._facultadService.getFacultadByID(this.facultadR).subscribe((res: any)=>{
      this.response = res;
      this.setCurrentFacultad();
    });

  }

  actualizarFacultad(form: any): void{    
    this._facultadService.actualizarFacultad(form.value, this.facultadR).subscribe(res => {
      this._snackBarService.openSnackBar("¡Facultad actualizada exitosamente!");
      localStorage.removeItem('facultad');
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

  setCurrentFacultad(): void{
let facultadSelected = Object.values(this.response);
this.form.setValue({
  idFacultad: facultadSelected[0],
  nombre: facultadSelected[1],
})
  }
}


