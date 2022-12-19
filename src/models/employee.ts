import {
  IEmployee,
  IResponseMessage,
  IModel,
  IResponseError,
} from "../helpers/interfaces";
import Employee from "../schemas/employees";

class EmployeeModel implements IModel<IEmployee, IResponseMessage> {
  //get all meployees for middle of pagination
  async getAll(limit: number, skip: number): Promise<IEmployee[]> {
    try {
        const data = await Employee.find({ isDelete: false })
          .skip(skip > 0 ? (skip - 1) * limit : 0)
          .limit(limit);
        return data;
    } catch (error) {
       throw error
    }
  }
  async getOne(id: string): Promise<IEmployee> {
    try {
        const data = await Employee.findOne({ id });
        if (!data) {
          throw {
            status: 401,
            stack: "the employee dont exits",
            message: "please verify if the user exits",
          } as IResponseError;
        }
        return data as IEmployee;
    } catch (error) {
        throw error
    }
  }
  async create(data: IEmployee): Promise<IResponseMessage> {
    try {
        const isDuplicate = await Employee.findOne({ email: data.email });
        if (isDuplicate) {
          throw {
            status: 403,
            stack: "The email is dublicate",
            message: "please verify that you have another account",
          } as IResponseError;
        }
        const creating = new Employee(data);
        creating.encryptPassword(creating.password);
        await creating.save();
        return {
          status: 200,
          message: "The employee was created correctly",
        };
    } catch (error) {
        throw error
    }
  }
  async editOne(id: string, data: IEmployee): Promise<IResponseMessage> {
    try {
        const isExits = await Employee.findOne({ id });
        if (!isExits) {
          throw {
            status: 401,
            stack: "The employee dont exits",
            message: "Verify if you have a account",
          } as IResponseError;
        }
        const editing = await Employee.findOneAndUpdate({ id }, data);
        return { status: 200, message: "the employee was modified correctly" };
    } catch (error) {
        throw error
    }
  }
  async deleteOne(id: string, data: IEmployee): Promise<IResponseMessage> {
    try {
        const isExits = await Employee.findOne({ id });
        if (!isExits) {
          throw {
            status: 401,
            stack: "The employee dont exits",
            message: "Verify if you have a account",
          } as IResponseError;
        }
        const deleting = await Employee.findOneAndUpdate({ id }, data);
        return { status: 200, message: "the employee was deleted correctly" };
    } catch (error) {
        throw error;
    }
  }
  async login(data: IEmployee): Promise<IEmployee> {
    try {
        const isValidateEmail = await Employee.findOne({email:data.email});
        if(!isValidateEmail){
            throw {
                status: 403,
                stack: "The email is inconrrect",
                message: "The user dont register or the email is incorrect"
            } as IResponseError
        }
        const isValidatePassword = isValidateEmail.validatePassword(data.password);
        if (!isValidatePassword) {
            throw {
                status: 400,
                stack: "The password is incorrect",
                message: "Validate that the password is correct"
            } as IResponseError
        }
        return isValidateEmail;
    } catch (error) {
        throw error
    }
  }
}

export default new EmployeeModel();
