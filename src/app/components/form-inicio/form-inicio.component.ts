import { Component } from '@angular/core';
import { presidenteService } from '../../services/presidente';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { PresidenteGameComponent } from '../presidente-game/presidente-game.component';
import { LoadingComponent } from '../loading/loading.component';

export interface connect{
  "idSala": string,
  "nombre": string
}

@Component({
  selector: 'app-form-inicio',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './form-inicio.component.html',
  styleUrl: './form-inicio.component.css'
})
export class FormInicioComponent {
  
  nombre:string = '';
  roomId:string = '';

  connectD : connect = {
    "idSala": '',
    "nombre": ''
  }
  
  constructor(private presidenteService: presidenteService,  private _router: Router) {
    
  }
  
  ngOnInit(): void{
  }
  
  joinRoom(formGame: NgForm){
    this.nombre = formGame.controls['nombre'].value;
    this.roomId = formGame.controls['roomId'].value;

    this.connectD.idSala = this.roomId;
    this.connectD.nombre = this.nombre;
    
    this.presidenteService.joinRoom(this.connectD);

    this._router.navigateByUrl(`/loading/` + `${this.roomId}`);
  }
}
