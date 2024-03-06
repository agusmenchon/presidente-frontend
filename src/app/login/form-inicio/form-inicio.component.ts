import { Component } from '@angular/core';
import { presidenteService } from '../../services/presidente';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { conexion } from '../../models/conexion';


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

  user : conexion = {
    "nombre": '',
    "sala": ''
  }
  
  constructor(private presidenteService: presidenteService,  private _router: Router) {
    
  }
  
  ngOnInit(): void{
  }
  
  joinRoom(formGame: NgForm){
    this.presidenteService.joinRoom(this.user).subscribe( resp => {
      if(resp){
        this._router.navigate([`/game/loading/`, `${this.user.sala}`])
        // .then( nav =>{
        //   console.log(nav);
        // }, err =>{
        //   console.log(err);
        // })
      }
    })
  }
}
