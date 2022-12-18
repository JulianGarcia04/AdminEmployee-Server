import {
  IRequestHandler,
  INext,
  IResponseHandler,
  IResponseError,
} from "../interfaces";
import { ErrorRequestHandler } from 'express'

export const errorHandler:ErrorRequestHandler = (err, req, res, next)=>{
    console.error(err);
    next(err);
}

export const formatError:ErrorRequestHandler = (err, req, res, next)=>{
    return res.json({
        message: err.message,
        stack : err.stack
    })
}