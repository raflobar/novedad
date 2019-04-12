const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  idnombre: { type: String, required: true, index: true},
  password: { type: String, required: true, index: true},
  correo  : { type: String, required: true },
  nombres : { type: String, required: true },
  apellidos:{ type: String },
  salt    : { type: String, required: true}
});

module.exports = mongoose.model('usuarios', usuarioSchema);
