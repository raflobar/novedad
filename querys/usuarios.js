const usuariosModel = require('../models/usuarios');

class UsuarioQuery {
  getLista( condicion, campos ){
    return new Promise((resolve, reject)=>{
      usuariosModel.find( condicion, campos ).then(
        (result) => { resolve(result) }, // OK
        (error) => { reject(error) } // ERROR
      )
    });
  }

  setStore(info){
    return new Promise((resolve, reject)=>{
      usuariosModel.insertMany(info).then(
        (result) => { resolve(result) }, // OK
        (error) => { reject(error) } // ERROR
      )
    });
  }

  getShow(condicion, campos){
    return new Promise((resolve, reject)=>{
      usuariosModel.findOne( condicion, campos ).then(
        (result)=>{ resolve(result) },
        (error) => { reject(error) }
      )
    });
  }

  setDestroy(condicion){
    return new Promise((resolve, reject)=>{
      usuariosModel.remove(condicion).then(
        (result)=>{ resolve(result) },
        (error)=>{ reject(error) }
      )
    })
  }

  setUpdate(condicion, set){
    return new Promise((resolve, reject)=>{
      usuariosModel.update(condicion, set).then(
        (result)=>{ resolve(result) },
        (error)=>{ reject(error) }
      )
    })
  }
  
}
module.exports = new UsuarioQuery;