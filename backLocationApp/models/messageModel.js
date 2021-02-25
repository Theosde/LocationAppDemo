const mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  idappart: { type: mongoose.Schema.Types.ObjectId, ref: 'appart' },
  message:  {message: String, dateenvoie:Date, iduser: { type: mongoose.Schema.Types.ObjectId, ref: 'users' } }
})
var messageModel = mongoose.model('message', messageSchema)

module.exports = messageModel;
