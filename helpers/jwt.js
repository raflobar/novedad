const jsonwebtoken = require('jsonwebtoken');

class Jwt {
  encode( params ) {
    const token = jsonwebtoken.sign( params, 'mi_clave_secreta');
    return token;
  }

  decode(token) {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, 'mi_clave_secreta', (err, info)=>{
        if(err) {
          return reject();
        }
        return resolve(info);
      });
    });
  }
}
module.exports = new Jwt;