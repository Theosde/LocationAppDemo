const mongoose = require('mongoose');

var appartSchema = mongoose.Schema({
  titre: String,
  adresse: {rue:String,codePostal:String,ville:String,pays:String},
  desc: String,
  surface: Number,
  prix: Number,
  categorie: String,
  nbmaxlocataire: Number,
  meuble: Boolean,
  charge: Boolean,
  coloc: Boolean,
  idproprio: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  idlocataire: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  photo: [String],
})
var appartModel = mongoose.model('appart', appartSchema)

module.exports = appartModel;
