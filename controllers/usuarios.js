const _ = require('lodash');
const usuariosQuerys = require('../querys/usuarios');
const jwt = require('../helpers/jwt');
const crypto = require('crypto');

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

  store( idnombre,hash,correo,apellidos,nombres,salt ){
    return new Promise( (resolve, reject) => {
      const dataUser = {
        idnombre,
        password : hash,
        correo,
        apellidos,
        nombres,
        salt
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

  update( _id, idnombre,hash,correo,apellidos,nombres,salt ){
    return new Promise( (resolve, reject) => {
      const dataUser = {
        idnombre,
        password : hash,
        correo,
        apellidos,
        nombres,
        salt
      }
      if ( password != '') dataUser.password = hash;
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
      usuariosQuerys.getShow({idnombre: idnombre}, {salt : 1 }).then(
        (info) => {  resolve(info) },
        (error) => { reject(error) }
      )
      console.log(error);
      if(info !=null){
        var _salt = info.salt;
        console.log({salt : _salt, pass : password});
        var hash = crypto.pbkdf2Sync(password, _salt, 1000, 64, 'sha512').toString('hex');
        usuariosQuerys.getShow( 
          { idnombre: idnombre, password: hash }, { _id: 1 } )
          .then(
          (info) => {  resolve(info) },
          (error) => { reject(error) }
        )
       }
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
