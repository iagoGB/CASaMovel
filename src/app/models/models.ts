
export interface Event {
    "id": number,
    "imagem": string,
    "foto": string,
    "categorias": string,
    "titulo": string,
    "local": string,
    "palestrantes": string[],
    "participantes":string[],
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
    username: string
}

export interface User {
    "usuario_id": number,
    "avatar": string,
    "nome": string,
    "cpf":string,
    "telefone": string,
    "email": string,
    "senha": string,
    "departamento": string,
    "eventos": Event[],
    'carga_horaria': number,
    'data_ingresso': Date,
    "criado_em":Date,
    "atualizado_em": Date
}

export interface Categoria {
    "id": number,
    "nome": string
}

export interface Palestrante {
    "id": number,
    "nome": string,
    "descricao": string,
    "foto": string
}
