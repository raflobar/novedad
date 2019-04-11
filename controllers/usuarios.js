const _ = require('lodash');
const usuariosQuerys = require('../querys/usuarios');
const jwt = require('../helpers/jwt');

class Usuario {
  lista(){
    return new Promise( (resolve, reject) => {
      usuariosQuerys.getLista(
        {},
        { password: 0 }
      ).then(
        (listUsers)=>{ resolve(listUsers); }, // ok
        (error)=>{ reject(error); } // error
      );
    });
  }

  store( idnombre,password,correo,apellidos,nombres ){
    return new Promise( (resolve, reject) => {
      const dataUser = {
        idnombre,
        password,
        correo,
        apellidos,
        nombres
      }
      usuariosQuerys.setStore(dataUser).then(
        (newUser)=>{ resolve(newUser); }, // ok
        (error)=>{ reject(error); } // error
      )
    })
  }

  show( userId ){
    return new Promise( (resolve, reject)=>{
      usuariosQuerys.getShow(
        { _id: userId },
        { password: 0 }
      ).then(
        (rowUser)=>{ 
          if( rowUser ){
            resolve(rowUser)
          }else{
            reject({ message: 'Usuario no existe'})
          }
        },
        (error)=>{ reject(error)}
      )
    });
  }

  destroy( userId ){
    return new Promise((resolve, reject)=>{
      usuariosQuerys.setDestroy(
        { _id: userId }
      ).then(
        (result)=> {
          if( result.n ){
            resolve(result)
          }else{
            resolve({ message: "No se encontro al usuario" })
          }
        },
        (error) => reject(error)
      )
    });
  }

  update( _id, idnombre,password,correo,apellidos,nombres ){
    return new Promise( (resolve, reject) => {
      const dataUser = {
        idnombre,
        password,
        correo,
        apellidos,
        nombres
      }
      if ( password != '') dataUser.password = password;

      usuariosQuerys.setUpdate(
        { _id },
        { $set: dataUser }
      ).then(
        (newUser)=>{ resolve(newUser); }, // ok
        (error)=>{ reject(error); } // error
      )
    })
  }

  login (idnombre, password) {
    return new Promise((resolve, reject) => {
      usuariosQuerys.getShow( 
        { idnombre: idnombre, password: password }, { _id: 1 } )
        .then(
        (info) => {  resolve(info) },
        (error) => { reject(error) }
      )
    });
  }
  
  afterLogin (idnombre) {
    return new Promise((resolve, reject) => {
      usuariosQuerys.getShow( 
        { idnombre: idnombre }, { _id: 1 } )
        .then(
        (info) => {
          // Aca se generar token
          const token = jwt.encode({ userId: info._id });
          resolve({ token });
        },
        (error) => { reject(error) }
      )
    });
  }
}
module.exports = new Usuario;
