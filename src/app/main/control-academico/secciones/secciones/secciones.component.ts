import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SeccionesI } from 'src/app/interfaces/control-academico/secciones';  
import { SeccionesService } from 'src/app/main/services/control-academico/secciones.service'; 
import { SnackBarService } from 'src/app/utils/snackBar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.css']
})
export class SeccionesComponent implements OnInit {

  listadoSecciones: SeccionesI[] = [];

  displayedColumns: string[] = ['id', 'seccion', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _seccionService: SeccionesService,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService,
    private router: Router,
    ) { 
    }

  ngOnInit(): void {
    this.cargarSecciones();
  }

  cargarSecciones(){
    this._seccionService.getSecciones().subscribe((res: any)=>{
      this.listadoSecciones = res;
      this.dataSource = new MatTableDataSource(this.listadoSecciones);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

eliminarSeccion(idSeccion: string): void{
  this._seccionService.eliminarSeccion(idSeccion)
  .subscribe(res =>{
    this._snackBarService.openSnackBar("¡Sección eliminada exitosamente!");
    this.cargarSecciones();
  }, err => {
      if(err.error.code == 409){
  this._snackBarService.openSnackBar("¡El ID de la sección no existe!");
  } else {
    this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
   }
  })
}

actualizarSeccion(idSeccion: string): void{
  localStorage.setItem('seccion', idSeccion);
}

onLogout(): void{
  this._seccionService.logout();
  this._snackBarService.openSnackBar("Sesión cerrada exitosamente, ¡Vuelve pronto!");
  this.router.navigateByUrl('/auth/inicio-sesion');
}

}
