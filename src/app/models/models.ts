import { stringify } from '@angular/compiler/src/util';

export interface Event {
    "id": number,
    "title": string,
    "location": string,
    "speakers": string[],
    "date": Date,
    "hour": number,
    "createAt": Date,
    "updateAt": Date
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