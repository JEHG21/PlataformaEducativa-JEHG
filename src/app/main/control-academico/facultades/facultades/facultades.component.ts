import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacultadesI } from 'src/app/interfaces/control-academico/facultades'; 
import { FacultadesService } from 'src/app/main/services/control-academico/facultades.service'; 
import { SnackBarService } from 'src/app/utils/snackBar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-facultades',
  templateUrl: './facultades.component.html',
  styleUrls: ['./facultades.component.css']
})
export class FacultadesComponent implements OnInit {

  listadoFacultades: FacultadesI[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _facultadService: FacultadesService,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService,
    private router: Router,
    ) { 
    }

  ngOnInit(): void {
    this.cargarFacultades();
  }

  cargarFacultades(){
    this._facultadService.getFacultades().subscribe((res: any)=>{
      this.listadoFacultades = res;
      this.dataSource = new MatTableDataSource(this.listadoFacultades);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


eliminarFacultad(idFacultad: string): void{
  this._facultadService.eliminarFacultad(idFacultad)
  .subscribe(res =>{
    this._snackBarService.openSnackBar("¡Facultad eliminada exitosamente!");
    this.cargarFacultades();
  }, err => {
      if(err.error.code == 409){
  this._snackBarService.openSnackBar("¡El ID de la facultad no existe!");
  } else {
    this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
   }
  })
}

actualizarFacultad(idFacultad: string): void{
  localStorage.setItem('facultad', idFacultad);
}

onLogout(): void{
  this._facultadService.logout();
  this._snackBarService.openSnackBar("Sesión cerrada exitosamente, ¡Vuelve pronto!");
  this.router.navigateByUrl('/auth/inicio-sesion');
}

}
