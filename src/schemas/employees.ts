import {Schema, model} from 'mongoose';

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
        }
    })

    public static get employee():Schema{
        return this._employee;
    }
}

export default model('employee', EmployeeSchema.employee);