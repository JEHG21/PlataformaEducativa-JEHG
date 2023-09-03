import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RolesI } from 'src/app/interfaces/administracion/roles'; 
import { RolesService } from 'src/app/main/services/administracion/roles.service';
import { SnackBarService } from 'src/app/utils/snackBar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  listadoRoles: RolesI[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'ver', 'crear', 'editar', 'eliminar', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _rolService: RolesService,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService,
    private router: Router,
    ) { 
    }

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles(){
    this._rolService.getRoles().subscribe((res: any)=>{
      this.listadoRoles = res;
      this.dataSource = new MatTableDataSource(this.listadoRoles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

eliminarRol(_id: string): void{
  this._rolService.eliminarRol(_id)
  .subscribe(res =>{
    this._snackBarService.openSnackBar("¡Rol eliminado exitosamente!");
    this.cargarRoles();
  }, err => {
      if(err.error.code == 409){
  this._snackBarService.openSnackBar("¡El ID del rol no existe!");
  } else {
    this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
   }
  })
}

actualizarRol(_id: string): void{
  localStorage.setItem('rol', _id);
}


onLogout(): void{
  this._rolService.logout();
  this._snackBarService.openSnackBar("Sesión cerrada exitosamente, ¡Vuelve pronto!");
  this.router.navigateByUrl('/auth/inicio-sesion');
}

}
