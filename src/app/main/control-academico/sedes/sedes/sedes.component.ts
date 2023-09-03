import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SedesI } from 'src/app/interfaces/control-academico/sedes'; 
import { SedesService } from 'src/app/main/services/control-academico/sedes.service';
import { SnackBarService } from 'src/app/utils/snackBar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent implements OnInit {

  listadoSedes: SedesI[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'direccion', 'celular', 'correo', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _sedeService: SedesService,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService,
    private router: Router,
    ) { 
    }

  ngOnInit(): void {
    this.cargarSedes();
  }

  cargarSedes(){
    this._sedeService.getSedes().subscribe((res: any)=>{
      this.listadoSedes = res;
      this.dataSource = new MatTableDataSource(this.listadoSedes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

eliminarSede(idSede: string): void{
  this._sedeService.eliminarSede(idSede)
  .subscribe(res =>{
    this._snackBarService.openSnackBar("¡Sede eliminada exitosamente!");
    this.cargarSedes();
  }, err => {
      if(err.error.code == 409){
  this._snackBarService.openSnackBar("¡El ID de la sede no existe!");
  } else {
    this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
   }
  })
}

actualizarSede(idSede: string): void{
  localStorage.setItem('sede', idSede);
}

onLogout(): void{
  this._sedeService.logout();
  this._snackBarService.openSnackBar("Sesión cerrada exitosamente, ¡Vuelve pronto!");
  this.router.navigateByUrl('/auth/inicio-sesion');
}

}
