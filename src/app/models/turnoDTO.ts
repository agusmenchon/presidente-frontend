import { Carta } from "./carta";

export interface turnoDTO{
    body: string;
    idGame: string,
    idMano: number,
    indexTurnoJugador: number,
    jugadores: Jugador[],
    mazo: Carta[] | null,
    cantCartas: number | null,
    escalera: boolean | null,
    status: string,
    primero: boolean | null,

}

export interface Jugador{
    cartas: Carta;
    nombre: string;
    puntos: number;
}
