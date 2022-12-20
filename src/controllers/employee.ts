// @ts-nocheck

import {
  IRequestHandler,
  IResponseHandler,
  IController,
  INext,
  IResponseMessage
} from "../helpers/interfaces";
import config from "../config";
import employee from "../models/employee";
import { v4 } from "uuid";
import jwt from 'jsonwebtoken';

class EmployeeController
  implements IController<IRequestHandler, IResponseHandler, INext>
{
  async getAll(
    req: IRequestHandler,
    res: IResponseHandler,
    next: INext
  ): Promise<void> {
    try {
      const { limit, skip } = req.query;
      const data = await employee.getAll(Number(limit), Number(skip));
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async getOne(
    req: IRequestHandler,
    res: IResponseHandler,
    next: INext
  ): Promise<void> {
    try {
      const { id } = req.params;
      const data = await employee.getOne(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async getCurrent(req: IRequestHandler, res: IResponseHandler, next: INext): Promise<void> {
    try {
      const userId = req.employeeId;
      const data = await employee.getOne(userId);
      res.status(200).json(data);
    } catch (error) {
      next(error)
    }
  }
  async create(
    req: IRequestHandler,
    res: IResponseHandler,
    next: INext
  ): Promise<void> {
    try {
      const { name, lastname, email, password, role } = req.body;
      const data = await employee.create({ id: v4(), name, lastname, email, password, role });
      res.status(data.status).json(data);
    } catch (error) {
      next(error);
    }
  }
  async editOne(
    req: IRequestHandler,
    res: IResponseHandler,
    next: INext
  ): Promise<void> {
    try {
      const { id } = req.params;
      const body = req.body;
      const data = await employee.editOne(id, body);
      res.status(data.status).json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteOne(req: IRequestHandler, res: IResponseHandler, next: INext): Promise<void> {
      try {
        const {id} = req.params;
        const data = await employee.deleteOne(id,{isDelete: true});
        res.status(data.status).json(data);
      } catch (error) {
        next(error)
      }
  }

  async login(
    req: IRequestHandler,
    res: IResponseHandler,
    next: INext
  ): Promise<void> {
    try {
      const {email, password} = req.body;
      const data = await employee.login({email, password})
      const token = jwt.sign({id:data.id, role: data.role}, config.SECRET!, {
        expiresIn: 60*60*8
      })
      req.session.token = token;
      res.setHeader('Authorization', token)
      res.status(200).json({status:200, message:"the user is authenticate"} as IResponseMessage)
    } catch (error) {
      next(error);
    }
  }
  logout(req: IRequestHandler, res: IResponseHandler, next: INext): Promise<void> {
      try {
        req.session.destroy();
        res.status(200).json({status:200, message:"Hasta luego"})
      } catch (error) {
        next(error);
      }
  }
}

export default new EmployeeController();
