import { Component } from '@angular/core';
import { presidenteService } from '../../services/presidente';
import { Jugador } from '../../models/turnoDTO';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    NgFor, NgIf, CommonModule
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {

  constructor(private presidenteService:presidenteService){
  }

  get jugadores():Jugador[]{
    return this.presidenteService.jugadores;
  }

  get idUnico():any{
    return this.presidenteService.idJugador;
  }

  get idSala():string{
    return this.presidenteService.idSala;
  }

  ngOnInit(){

  }
}
