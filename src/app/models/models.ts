import { stringify } from '@angular/compiler/src/util';

export interface Event {
    "evento_id": number,
    "imagem": string,
    "titulo": string,
    "localizacao": string,
    "palestrante": string[],
    "carga_horaria":number;
    "data_horario": Date,
    "criado_em": Date,
    "atualizado_em": Date
}

export interface AuthUser {
    email: string;
    senha: string;
}

export interface AuthResponse{
    token: string,
    user: string,
    role: string,
}

export interface User {
    "id": number,
    "nome": string
    "departamento": string,
    'carga_horaria': number,
    'data_entrada': Date
}