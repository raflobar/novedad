const _ = require('lodash');
const novedadQuerys = require('../querys/novedad');

class Novedad {
  lista(){
    return new Promise( (resolve, reject) => {
        novedadQuerys.getLista(
        {}
      ).then(
        (listnovedad)=>{ resolve(listnovedad); }, // ok
        (error)=>{ reject(error); } // error
      );
    });
  }

  listaUser( userId ){
    return new Promise( (resolve, reject)=>{
      novedadQuerys.getLista(
        { idnombre: userId }
      ).then(
        (rowNovedad)=>{ 
          if( rowNovedad ){
            resolve(rowNovedad)
          }else{
            reject({ message: 'Usuario no encontrado'})
          }
        },
        (error)=>{ reject(error)}
      )
    });
  }

  store( idnombre, correo, nombres, apellidos, avatar, novfecha, novtitulo,
    novfoto, novdescorta, novdeslarga, novlinkcompa, novlinkautor, novtematica, novmetatag
   ){
    return new Promise( (resolve, reject) => {
      const dataNovedad = {
        idnombre, correo, nombres, apellidos, avatar, novfecha, novtitulo,
        novfoto, novdescorta, novdeslarga, novlinkcompa, novlinkautor, novtematica, novmetatag          
      }
      novedadQuerys.setStore(dataNovedad).then(
        (newNovedad)=>{ resolve(newNovedad); }, // ok
        (error)=>{ reject(error); } // error
      )
    })
  }

  show( novedadId ){
    return new Promise( (resolve, reject)=>{
      novedadQuerys.getShow(
        { _id: novedadId }
      ).then(
        (rowNovedad)=>{ 
          if( rowNovedad ){
            resolve(rowNovedad)
          }else{
            reject({ message: 'Novedad no existente'})
          }
        },
        (error)=>{ reject(error)}
      )
    });
  }

  destroy( novedadId ){
    return new Promise((resolve, reject)=>{
      novedadQuerys.setDestroy(
        { _id: novedadId }
      ).then(
        (result)=> {
          if( result.n ){
            resolve(result)
          }else{
            resolve({ message: "No se encontro la novedad solicitada" })
          }
        },
        (error) => reject(error)
      )
    });
  }
}
module.exports = new Novedad;
