import { Request, Response, NextFunction } from "express";

export interface IRequestHandler extends Request{
    employeeId:string,
    employeeRole:string,
}

export interface IResponseHandler extends Response {

}

export interface INext extends NextFunction {
    
}