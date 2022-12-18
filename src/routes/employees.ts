// @ts-nocheck

import { Router } from "express";
import employee from "../controllers/employee";

const router = Router();

router
    .route("/employee/all")
    .get(employee.getAll);

router
    .route("/employee/:id")
    .get(employee.getOne)

router
    .route("/employee/create")
    .post(employee.create)

router
    .route("/employee/edit/:id")
    .put()

export default router;