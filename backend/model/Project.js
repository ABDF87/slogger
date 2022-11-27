const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  userid: {
    type: String,
    required: true,
  },
  projectname: {
    type: String,
    
  },
  projectid:{
      type:String,
      required: true,
  },
  isActive:{
      type: Boolean,
      required: true
    
  },
  timeproject:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Project', projectSchema);
