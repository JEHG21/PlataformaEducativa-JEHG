import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsuariosI } from 'src/app/interfaces/administracion/usuarios'; 
import { UsuariosService } from 'src/app/main/services/administracion/usuarios.service'; 
import { SnackBarService } from 'src/app/utils/snackBar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  listadoUsuarios: UsuariosI[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'correo', 'fechaCreacion', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _usuarioService: UsuariosService,
    private _snackBar: MatSnackBar,
    private _snackBarService: SnackBarService,
    private router: Router,
    ) { 
    }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this._usuarioService.getUsuarios().subscribe((res: any)=>{
      this.listadoUsuarios = res;
      this.dataSource = new MatTableDataSource(this.listadoUsuarios);
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

eliminarUsuario(_id: string): void{
  this._usuarioService.eliminarUsuario(_id)
  .subscribe(res =>{
    this._snackBarService.openSnackBar("¡Usuario eliminado exitosamente!");
    this.cargarUsuarios();
  }, err => {
      if(err.error.code == 409){
  this._snackBarService.openSnackBar("¡El ID del usuario no existe!");
  } else {
    this._snackBarService.openSnackBar("¡Ocurrió un error en el servidor! Intenta más tarde");
   }
  })
}

actualizarUsuario(_id: string): void{
  localStorage.setItem('usuarioID', _id);
}

onLogout(): void{
  this._usuarioService.logout();
  this._snackBarService.openSnackBar("Sesión cerrada exitosamente, ¡Vuelve pronto!");
  this.router.navigateByUrl('/auth/inicio-sesion');
}

}
