import {
  IRequestHandler,
  IResponseHandler,
  INext,
  IResponseError,
} from "../interfaces";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import validatePath from "../methods/validatePath";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    id: string;
    role: string;
  }
}

const validateAuth = (
  req: IRequestHandler,
  res: IResponseHandler,
  next: INext
) => {
  const token = req.headers.authorization;
  if (!token) {
    throw {
      status: 403,
      stack: "You isn't authenticate",
      message: "Please autheticate for middle of the login",
    } as IResponseError;
  }
  const desencrypting = jwt.verify(token!, config.SECRET!) as JwtPayload;
  if (
    (desencrypting.role === "employee" && validatePath(req.path, "/create")) ||
    validatePath(req.path, "/get") ||
    validatePath(req.path, "/delete")
  ) {
    throw {
      status: 403,
      stack: "You aren't allow for access to this funcionality",
      message: "Funcionality only allow for admin",
    } as IResponseError;
  }
  req.employeeId = desencrypting.id;
  req.employeeRole = desencrypting.role;
  next();
};

export default validateAuth;
