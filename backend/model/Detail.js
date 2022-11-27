const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailSchema = new Schema({
  userid: {
    type: String,
    required: true,
  },
  detailname: {
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
  timetask:{
    type:String,
    required: true,
  },
  taskpost:{
    type:String,
    required: false,
}
});

module.exports = mongoose.model('Detail', detailSchema);
