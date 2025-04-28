import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const userSchema = new Schema({
  modulename: { 
    type: String, 
    required: true 
  },
  moduleid: { 
    type: String, 
    required: true, 
    unique: true // Ensure module IDs are unique
  },
  modulecredit: { 
    type: Number, 
    required: true,
    min: 0 // Prevent negative credits
  },
  licname: { 
    type: String, 
    required: true 
  },
  licemailadd: { 
    type: String, 
    required: true,
    match: [/.+@.+\..+/, "Please enter a valid email"] // Basic email validation
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

export default model('ModuleModel', userSchema);