import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CalificacionesI } from 'src/app/interfaces/control-notas/calificaciones'; 
import { CalificacionesService } from 'src/app/main/services/control-notas/calificaciones.service'; 
import { SnackBarService } from 'src/app/utils/snackBar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit {

  listadoCalificaciones: CalificacionesI[] = [];

  displayedColumns: string[] = ['id', 'carnet', 'actividad', 'punteo', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _calificacionService: CalificacionesService,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService,
    private router: Router,
    ) { 
    }

  ngOnInit(): void {
    this.cargarCalificaciones();
  }

  cargarCalificaciones(){
    this._calificacionService.getCalificaciones().subscribe((res: any)=>{
      this.listadoCalificaciones = res;
      this.dataSource = new MatTableDataSource(this.listadoCalificaciones);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

eliminarCalificacion(idCalificacion: string): void{
  this._calificacionService.eliminarCalificacion(idCalificacion)
  .subscribe(res =>{
    this._snackBarService.openSnackBar("¡Calificacion eliminada exitosamente!");
    this.cargarCalificaciones();
  }, err => {
      if(err.error.code == 409){
  this._snackBarService.openSnackBar("¡El ID de la calificación no existe!");
  } else {
    this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
   }
  })
}

actualizarCalificacion(idCalificacion: string): void{
  localStorage.setItem('calificacion', idCalificacion);
}

onLogout(): void{
  this._calificacionService.logout();
  this._snackBarService.openSnackBar("Sesión cerrada exitosamente, ¡Vuelve pronto!");
  this.router.navigateByUrl('/auth/inicio-sesion');
}

}
