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
      console.log(req.query);
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
  async create(
    req: IRequestHandler,
    res: IResponseHandler,
    next: INext
  ): Promise<void> {
    try {
      const { name, lastname } = req.body;
      const data = await employee.create({ id: v4(), name, lastname });
      res.status(202).json(data);
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
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: IRequestHandler,
    res: IResponseHandler,
    next: INext
  ): Promise<void> {
    try {
      const {name, password} = req.body;
      const data = await employee.login({name, password})
      jwt.sign('hola mundo', config.SECRET!)
      res.status(200).json({status:200, message:"the user is authenticate"} as IResponseMessage)
    } catch (error) {
      next(error);
    }
  }

  async logout(
    req: IRequestHandler,
    res: IResponseHandler,
    next: INext
  ): Promise<void> {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export default new EmployeeController();
