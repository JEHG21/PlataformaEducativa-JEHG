import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EstudiantesI } from 'src/app/interfaces/personal/estudiantes';
import { EstudiantesService } from 'src/app/main/services/personal/estudiantes.service';
import { SnackBarService } from 'src/app/utils/snackBar.service';
import { Observable } from 'rxjs';
import { ActualizarEstudianteComponent } from '../actualizar-estudiante/actualizar-estudiante.component';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  listadoEstudiantes: EstudiantesI[] = [];

  displayedColumns: string[] = ['carnet', 'nombre', 'correo', 'celular', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _estudianteService: EstudiantesService,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService,
    private router: Router,
    private _actualizarEstudiante: ActualizarEstudianteComponent
    ) { 
    }

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes(){
    this._estudianteService.getEstudiantes().subscribe((res: any)=>{
      this.listadoEstudiantes = res;
      this.dataSource = new MatTableDataSource(this.listadoEstudiantes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

eliminarEstudiante(carnet: string): void{
  this._estudianteService.eliminarEstudiante(carnet)
  .subscribe(res =>{
    this._snackBarService.openSnackBar("¡Estudiante eliminado exitosamente!");
    this.cargarEstudiantes();
  }, err => {
      if(err.error.code == 409){
  this._snackBarService.openSnackBar("¡El carnet del estudiante no existe!");
  } else {
    this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
   }
  })
}

actualizarEstudiante(carnet: string): void{
  localStorage.setItem('carnet', carnet);
}

onLogout(): void{
  this._estudianteService.logout();
  this._snackBarService.openSnackBar("Sesión cerrada exitosamente, ¡Vuelve pronto!");
  this.router.navigateByUrl('/auth/inicio-sesion');
}

}
