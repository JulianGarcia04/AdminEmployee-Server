export interface IController<req, res, next> {
    getAll(req:req, res:res, next:next):Promise<void>
    getOne(req:req, res:res, next:next):Promise<void>
    getCurrent?(req:req, res:res, next:next):Promise<void>
    create(req:req, res:res, next:next):Promise<void>
    editOne(req:req, res:res, next:next):Promise<void>
    deleteOne(req:req, res:res, next:next):Promise<void>
    login?(req:req, res:res, next:next):Promise<void>
    logout?(req:req, res:res, next:next):Promise<void>
}