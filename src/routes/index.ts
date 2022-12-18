import { Express, Router } from 'express';
import employeeRouter from './employees';


const admin = (app:Express):void=>{
    const routerAdmin = Router();
    app.use('/api', routerAdmin);

    routerAdmin.use(employeeRouter);

    return
}

export default admin;