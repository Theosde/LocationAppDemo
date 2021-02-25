const mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  birthday: Date,
  email: String,
  phone: String,
  password: String,
  salt: String,
  statususer: String,
  appartement: [{ type: mongoose.Schema.Types.ObjectId, ref: 'appart' }],
  garant: {firstname: String, lastname: String, birthday: Date, email:String},
  // fichier , Timestamp
    rib:{ timestamp: Date,url:String, destinataire: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },appart: { type: mongoose.Schema.Types.ObjectId, ref: 'users' } },
    bail:[{timestamp: Date,url:String, destinataire: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },appart: { type: mongoose.Schema.Types.ObjectId, ref: 'users' } }],
    courrier:[{timestamp: Date,url:String, objet:String, destinataire: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },appart: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }}],
    quittance:[{timestamp: Date,url:String, destinataire: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },appart: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }}]

})
var usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel;
