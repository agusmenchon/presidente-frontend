import { Component } from '@angular/core';
import { presidenteService } from '../../services/presidente';
import { Jugador } from '../../models/turnoDTO';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  sala = localStorage.getItem('sala');

  constructor(private presidenteService:presidenteService, private router: Router, private authService: AuthService){
  }

  onInit(){

  }

  get jugadores():Jugador[]{
    return this.presidenteService.jugadores;
  }

  get idUnico(){
    return Number(localStorage.getItem('id'));
  }

  playGame(idSala:string){
    this.presidenteService.playGame();
    this.router.navigate([`/game/play/`, `${idSala}`]).then( nav =>{
      console.log(nav);
      console.log(this.sala);
    }, err =>{
      console.log(err);
    })
  }
}
