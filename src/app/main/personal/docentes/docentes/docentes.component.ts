import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DocentesI } from 'src/app/interfaces/personal/docentes'; 
import { DocentesService } from 'src/app/main/services/personal/docentes.service';
import { SnackBarService } from 'src/app/utils/snackBar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {

  listadoDocentes: DocentesI[] = [];

  displayedColumns: string[] = ['dpi', 'nombre', 'correo', 'celular', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _docenteService: DocentesService,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService,
    private router: Router,
    ) { 
    }

  ngOnInit(): void {
    this.cargarDocentes();
  }

  cargarDocentes(){
    this._docenteService.getDocentes().subscribe((res: any)=>{
      this.listadoDocentes = res;
      this.dataSource = new MatTableDataSource(this.listadoDocentes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

eliminarDocente(dpi: string): void{
  this._docenteService.eliminarDocente(dpi)
  .subscribe(res =>{
    this._snackBarService.openSnackBar("¡Estudiante eliminado exitosamente!");
    this.cargarDocentes();
  }, err => {
      if(err.error.code == 409){
  this._snackBarService.openSnackBar("¡El carnet del estudiante no existe!");
  } else {
    this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
   }
  })
}

actualizarDocente(dpi: string): void{
  localStorage.setItem('dpi', dpi);
}

onLogout(): void{
  this._docenteService.logout();
  this._snackBarService.openSnackBar("Sesión cerrada exitosamente, ¡Vuelve pronto!");
  this.router.navigateByUrl('/auth/inicio-sesion');
}

}
