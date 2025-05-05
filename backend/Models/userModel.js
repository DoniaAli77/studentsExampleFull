const mongoose = require('mongoose');
const {courseSchema}=require('./courseModel')

const userSchema = new mongoose.Schema(
  {
    email:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true
    },
    name: {
      type: String,
      minLength: 3,
      maxLength: 30,
      required: true,

    },
    age: {
      type: Number,
      min: 18,
      required: true,
    },
    role:{
      type:String,
      required:true,
      
      
    },
    courses:[courseSchema]
  },
  // schemaOptions
  {
    strict: false,
    timestamps: true,
  }
);


module.exports = mongoose.model('userModel', userSchema);
