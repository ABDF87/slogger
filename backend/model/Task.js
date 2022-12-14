const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  userid: {
    type: String,
    required: true,
  },
  taskname: {
    type: String,
    required: true,
  },
  projectid:{
      type:String,
      required: true,
  },
  taskid:{
    type:String,
    required: true,
  },
  isActive:{
      type: Boolean,
      required: true
  },
  taskpost:{
    type:String,
    required: false,
},
isCritical: {
  type: Boolean
}
});

module.exports = mongoose.model('Task', taskSchema);