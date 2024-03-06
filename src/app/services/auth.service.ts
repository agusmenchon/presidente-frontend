import { Injectable } from '@angular/core';
import { conexion } from '../models/conexion';
import { presidenteService } from './presidente';
import { Usuario } from '../models/usuario.interface';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _Auth!: Usuario;

  constructor(private localStorage:LocalStorageService) { }

  get nombre(){
    return this._Auth?.nombre;
  }

  get sala(){
    return this._Auth?.nombre;
  }

  get id(){
    return this._Auth?.idUnico;
  }

  login(usuario: Usuario){
    this._Auth = usuario;

    this.localStorage.guardarString("nombre", this._Auth.nombre);
    this.localStorage.guardarNumero("id", this._Auth.idUnico);
    this.localStorage.guardarString("sala", this._Auth.sala);
    

    // localStorage.setItem('nombre', this._Auth.nombre);
    // localStorage.setItem('id', this._Auth.idUnico.toString());
    // localStorage.setItem('sala', this._Auth.sala);
  }

  isAuth():Observable<boolean>{
    if(!this.localStorage.obtenerNumero("id")){
      return of(false);
    }
    
    return of(true);
  }  

  logout(){
    localStorage.clear();
  }
}
