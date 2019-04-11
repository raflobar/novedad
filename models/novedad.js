const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const novedadSchema = new Schema({
  idnombre: { type: String, required: true, index: true},
  correo:{ type: String, required: true },
  nombres:{ type: String, required: true },
  apellidos:{ type: String },
  avatar:{ type: String, default:'default.png' },
  novfecha:{ type: String },
  novtitulo:{ type: String },
  novfoto:{ type: String, default:'default.png' },
  novdescorta:{ type: String },
  novdeslarga:{ type: String },
  novlinkcompa:{ type: String },
  novlinkautor:{ type: String },
  novtematica:{ type: String },
  novmetatag:{ type: String }
});

module.exports = mongoose.model('novedad', novedadSchema);