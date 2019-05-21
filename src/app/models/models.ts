import { stringify } from '@angular/compiler/src/util';

export interface Event {
    "event_id": number,
    "titulo": string,
    "localizacao": string,
    "palestrante": string,
    "dataHorario": Date,
    "cargaHoraria": number,
    "createdAt": Date,
    "updatedAt": Date
}

export class AuthUser {
    credential: number;
    password: string;
}

export interface User {
    "id": number,
    "name": string
    "departament": string,
    'ch': number,
    'dateEntrace': Date
}