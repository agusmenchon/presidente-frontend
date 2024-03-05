import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Jugador, turnoDTO } from '../models/turnoDTO';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class presidenteService {

  private stompClient: any;
  private mensaje!: turnoDTO;
  private _idSala!:string;
  private _idUnique:number | undefined;
  private _jugadores:Jugador [] = [];

  constructor( private http: HttpClient) { 
    this.initConnectionSocket();
  }

  initConnectionSocket(){
    const url = 'http://localhost:3000/presidente';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({},()=>{
    });
  }

  // GETTERS

  get jugadores():Jugador[]{
    return [...this._jugadores];
  }
  
  get idJugador():number | undefined{
    return this._idUnique;
  }

  get idSala():string{
    return this._idSala;
  }

  // METHODS

  suscribe(idSala:string){
    this.stompClient.subscribe(`/topic/game/`+idSala, (messages:turnoDTO) => {
      // mensajes que llegan como turno DTO del servidor
      this.mensaje = JSON.parse(messages.body);
      console.log(this.mensaje);

      this._jugadores = this.mensaje?.jugadores;
    })
  }
  
    // jugarCartas(roomId: string, turno:turnoDTO) {
    //   this.stompClient.send(`/app/play/${roomId}`, JSON.stringify(turno));
    // }
    
  joinRoom(connectDTO:any) {
      this._idSala = connectDTO.idSala;
      this.suscribe(connectDTO.idSala);
      this.stompClient.send("/app/join", {}, JSON.stringify(connectDTO));
      this.getId(connectDTO).subscribe( resp => {
        this._idUnique = resp;
        console.log("index de jugador" + this._idUnique);
      })
  }

  // RECUPERAR ID DE JUGADOR

  getId(connectDTO:any){
    const url:string = 'http://localhost:3000/id/user';
    // http://localhost:3000/id/user?idSala=123&nombre=agus
    return this.http.get<number>(url+`?idSala=${connectDTO.idSala}&nombre=${connectDTO.nombre}`);
  }
}
