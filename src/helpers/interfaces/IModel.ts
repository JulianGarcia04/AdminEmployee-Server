export interface IModel<data, messages> {
    getAll(limit:number, skip:number):Promise<data[]>
    getOne(id:string):Promise<data>
    create(data:data):Promise<messages>
    editOne(id:string, data:data):Promise<messages>
    login?(data:data):Promise<boolean>
}