import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';

class EmployeeSchema {
    private static _employee:Schema = new Schema({
        id : {
            type: String,
            unique: true,
            require: true,
            trim: true
        },
        name: {
            type: String,
            require: true
        },
        lastname: {
            type: String,
            require: true,
        },
        email:{
            type: String,
            require: true
        },
        role: {
            type: String,
            require: true,
            default: 'employee'
        },
        state: {
            type: Boolean,
            require: true,
            default: false
        },
        dateCreate:{
            type:Date,
            require: true,
            default: Date.now()
        },
        password : {
            type: String,
            require: true,
            trim: true
        },
        isDelete:{
            type: Boolean,
            default: false,
            require: true
        }
    })

    public static get employee():Schema{
        return this._employee;
    }
}

EmployeeSchema.employee.methods.encryptPassword = function(password:string){
    const salt = bcrypt.genSaltSync(10);
    const encrypting = bcrypt.hashSync(password, salt);
    this.password = encrypting;

}

EmployeeSchema.employee.methods.validatePassword = function(password:string){
    return bcrypt.compareSync(password, this.password);
}

export default model('employee', EmployeeSchema.employee);