export class Note {
    constructor(public id: string, public name: string, public description: string, public date: string, public children: Note[]) {
    }
}