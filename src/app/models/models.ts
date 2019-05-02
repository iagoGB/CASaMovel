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