const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: true,
};
const courseSchema= new mongoose.Schema(

 {
    name: {
      type: String,
      minLength: 3,
      maxLength: 30,
    },
    id: {
      type: Number,
      min: 1,
      required: true,
    },
  },
  schemaOptions
);


module.exports = mongoose.model('courseModel', courseSchema);
module.exports.courseSchema=courseSchema
