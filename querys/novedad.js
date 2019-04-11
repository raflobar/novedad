const novedadModel = require('../models/novedad');

class novedadQuery {
  getLista( condicion, campos ){
    return new Promise((resolve, reject)=>{
        novedadModel.find( condicion, campos ).then(
        (result) => { resolve(result) }, // OK
        (error) => { reject(error) } // ERROR
      )
    });
  }

  setStore(info){
    return new Promise((resolve, reject)=>{
        novedadModel.insertMany(info).then(
        (result) => { resolve(result) }, // OK
        (error) => { reject(error) } // ERROR
      )
    });
  }

  getShow(condicion, campos){
    return new Promise((resolve, reject)=>{
        novedadModel.findOne( condicion, campos ).then(
        (result)=>{ resolve(result) },
        (error) => { reject(error) }
      )
    });
  }

  setDestroy(condicion){
    return new Promise((resolve, reject)=>{
        novedadModel.remove(condicion).then(
        (result)=>{ resolve(result) },
        (error)=>{ reject(error) }
      )
    })
  }
}
module.exports = new novedadQuery;