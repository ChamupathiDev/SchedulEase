import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const userSchema = new Schema({
    name:{
        type:String, //datatype
        required:true, //validate
    },
    gmail:{
        type:String, //datatype
        required:true, //validate
    },
    age:{
        type:Number, //datatype
        required:true, //validate
    },
    address:{
        type:String, //datatype
        required:true, //validate
    }
});

export default model(
    "UserModel", //file name
    userSchema //function name
)