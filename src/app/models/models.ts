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

export interface User {
    "id": number,
    "name": string
    "departament": string,
    'ch': number,
    'dateEntrace': Date
}