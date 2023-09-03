import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActividadesZonaI } from 'src/app/interfaces/control-notas/actividades-zona'; 
import { ActividadesZonaService } from 'src/app/main/services/control-notas/actividades-zona.service';
import { SnackBarService } from 'src/app/utils/snackBar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-actividades-zona',
  templateUrl: './actividades-zona.component.html',
  styleUrls: ['./actividades-zona.component.css']
})
export class ActividadesZonaComponent implements OnInit {

  listadoActividades: ActividadesZonaI[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'ponderacion', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _actividadService: ActividadesZonaService,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService,
    private router: Router,
    ) { 
    }

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades(){
    this._actividadService.getActividades().subscribe((res: any)=>{
      this.listadoActividades = res;
      this.dataSource = new MatTableDataSource(this.listadoActividades);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

eliminarActividad(idActividad: string): void{
  this._actividadService.eliminarActividad(idActividad)
  .subscribe(res =>{
    this._snackBarService.openSnackBar("¡Actividad de zona eliminada exitosamente!");
    this.cargarActividades();
  }, err => {
      if(err.error.code == 409){
  this._snackBarService.openSnackBar("¡El ID de la actividad no existe!");
  } else {
    this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
   }
  })
}

actualizarActividad(idActividad: string): void{
  localStorage.setItem('actividad', idActividad);
}
onLogout(): void{
  this._actividadService.logout();
  this._snackBarService.openSnackBar("Sesión cerrada exitosamente, ¡Vuelve pronto!");
  this.router.navigateByUrl('/auth/inicio-sesion');
}

}
