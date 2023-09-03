import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SedesI } from 'src/app/interfaces/control-academico/sedes'; 
import { SedesService } from 'src/app/main/services/control-academico/sedes.service'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/utils/snackBar.service';

@Component({
  selector: 'app-actualizar-sede',
  templateUrl: './actualizar-sede.component.html',
  styleUrls: ['./actualizar-sede.component.css']
})
export class ActualizarSedeComponent implements OnInit {

form: FormGroup;
@ViewChild('frmActualizar') formU: NgForm;
sedeR: string | null;
response: string;

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
      this.sedeR = localStorage.getItem('sede');
      console.log(this.sedeR);
    this._sedeService.getSedeByID(this.sedeR).subscribe((res: any)=>{
      this.response = res;
      this.setCurrentSede();
    });

  }

  actualizarSede(form: any): void{    
    this._sedeService.actualizarSede(form.value, this.sedeR).subscribe(res => {
      this._snackBarService.openSnackBar("¡Sede actualizada exitosamente!");
      localStorage.removeItem('sede');
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

  setCurrentSede(): void{
let sedeSelected = Object.values(this.response);
this.form.setValue({
  idSede: sedeSelected[0],
  nombre: sedeSelected[1],
  direccion: sedeSelected[2],
  celular: sedeSelected[3],
  correo: sedeSelected[4]
})
  }
}

