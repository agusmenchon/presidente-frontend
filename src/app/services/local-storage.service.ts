import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Función para guardar un número en el localStorage
  guardarNumero(clave: string, numero: number): void {
    // Convierte el número a cadena antes de guardarlo
    localStorage.setItem(clave, numero.toString());
  }

  // Función para obtener un número del localStorage
  obtenerNumero(clave: string): number | null {
    const valor = localStorage.getItem(clave);
    if (valor === null) {
      return null;
    }
    // Convierte la cadena almacenada de vuelta a un número
    return Number(valor);
  }

  guardarString(clave:string, dato:string):void{
    localStorage.setItem(clave, dato);
  }

  obtenerString(clave:string):string | null{
    const valor = localStorage.getItem(clave);
    if (valor === null) {
      return null;
    }
    // Convierte la cadena almacenada de vuelta a un número
    return valor;
  }
}