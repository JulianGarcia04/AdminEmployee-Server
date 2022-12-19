// @ts-nocheck

import { Router } from "express";
import employee from "../controllers/employee";
import validateAuth from "../helpers/middlewares/validateAuth";

const router = Router();

router
    .route("/employee/all")
    .get(validateAuth, employee.getAll);

router
    .route("/employee/:id")
    .get(validateAuth, employee.getOne)

router
    .route("/employee/create")
    .post(validateAuth, employee.create)

router
    .route("/employee/edit/:id")
    .put(employee.editOne)

router
    .route('/employee/delete/:id')
    .put(validateAuth, employee.deleteOne)

router
    .route('/employee/login')
    .post(employee.login)

export default router;