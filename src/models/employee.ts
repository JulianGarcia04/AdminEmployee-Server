import { IEmployee, IResponseMessage, IModel } from "../helpers/interfaces";

class EmployeeModel implements IModel<IEmployee, IResponseMessage> {
    getAll(limit: number, skip: number): Promise<IEmployee[]> {
        throw new Error("Method not implemented.");
    }
    getOne(id: string): Promise<IEmployee> {
        throw new Error("Method not implemented.");
    }
    create(data: IEmployee): Promise<IResponseMessage> {
        throw new Error("Method not implemented.");
    }
    editOne(id: string, data: IEmployee): Promise<IResponseMessage> {
        throw new Error("Method not implemented.");
    }
    login(data: IEmployee): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

export default new EmployeeModel()