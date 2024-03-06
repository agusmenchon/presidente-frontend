import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Jugador, turnoDTO } from '../models/turnoDTO';
import { HttpClient } from '@angular/common/http';
import { Observable, of,  tap } from 'rxjs';
import { Usuario } from '../models/usuario.interface';
import { conexion } from '../models/conexion';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class presidenteService {

  private stompClient: any;
  private mensaje!: turnoDTO;
  private _idSala:string | null = localStorage.getItem('sala');
  // private _idUnique!:number;
  // private _jugadores:Jugador [] = [];

  constructor( private http: HttpClient, private authService: AuthService) { 
    this.inicialize();
    this.mensaje = JSON.parse(localStorage.getItem("mensaje") || '{}');
    console.log(this.mensaje);
  }

  inicialize(){
    const url = 'http://localhost:3000/presidente';
    this.stompClient = Stomp.over(() => new SockJS(url));
    this.stompClient.connect({},()=>{
    });
  }

  // GETTERS

  get jugadores():Jugador[]{
    return [...this.mensaje.jugadores];
  }
  
  // get idJugador():number{
  //   return this._idUnique;
  // }

  get idSala():string | null{
    return this._idSala;
  }

  // METHODS

  suscribe(idSala:string){
    this.stompClient.subscribe(`/topic/game/`+idSala, (messages:turnoDTO) => {
      // mensajes que llegan como turno DTO del servidor
      this.mensaje = JSON.parse(messages.body);
      localStorage.setItem('mensaje', JSON.stringify(this.mensaje));
      console.log(this.mensaje);

    })
  }
  
    // jugarCartas(roomId: string, turno:turnoDTO) {
    //   this.stompClient.send(`/app/play/${roomId}`, JSON.stringify(turno));
    // }
    
  joinRoom(connectDTO:conexion):Observable<boolean> {
     
      let user:Usuario = {
        nombre: connectDTO.nombre,
        sala: connectDTO.sala,
        idUnico: 1
      };

      this._idSala = connectDTO.sala;

      this.suscribe(this._idSala);

      this.stompClient.send("/app/join", {}, JSON.stringify(connectDTO));

      this.getId(connectDTO).subscribe( resp => {
        user.idUnico = resp;
        // console.log("index de jugador" + user.idUnico);
      })

      // console.log("usuario: " + user);
      this.authService.login(user);
      
      if(this.authService.isAuth()){
        console.log("logeado con exito!")
        return of(true);
      }
      console.log("hubo un problema y no se pudo logear")
      return of(false);
  }

  playGame():void{
      console.log(this._idSala);
      this.stompClient.send(`/app/play/game`, {}, this._idSala);
  }

  // RECUPERAR ID DE JUGADOR
  getId(connectDTO:conexion){
    const url:string = 'http://localhost:3000/id/user';
    // http://localhost:3000/id/user?idSala=123&nombre=agus
    return this.http.get<number>(url+`?idSala=${connectDTO.sala}&nombre=${connectDTO.nombre}`);
  }
}
