const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Listar todos los usuarios
router.get('/', (req, res)=>{
  usuariosController.lista().then(
    (listUsers)=>{
      res.json(listUsers)
    },
    (err)=>{
      res.status(500).json(err)
    }
  );
});

// Crear un usuario
router.post('/add', (req, res)=>{
  const { idnombre, password, correo, apellidos, nombres } = req.body;
  // generamos el valor del campo SALT
  var salt = crypto.randomBytes(16).toString('hex');
  var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  usuariosController.store( idnombre, hash, correo, apellidos, nombres, salt ).then(
    (success)=>{ 
      res.json( success )
    },
    (err)=> {
      res.status(500).json(err)
    }
  );
});

// Mostrar info de un usuario por id
router.get('/:userId/show', (req, res)=>{
  const userId = req.params.userId;
  usuariosController.show(userId).then(
    (success)=> res.json( success ),
    (err)=> res.status(500).json(err)
  )
});

// Eliminar usuario por id
router.delete('/:userId', (req, res)=>{
  const userId = req.params.userId;
  usuariosController.destroy( userId ).then(
    (success)=> res.json( success ),
    (err)=> res.status(500).json(err)
  )
});

// Actualizar usuario por id
router.put('/', (req, res) => {
  const { _id, idnombre, password, correo, apellidos, nombres } = req.body;
  // Necesitamos obtener el valor del campo SALT para poder generar el password
  var salt = crypto.randomBytes(16).toString('hex');
  var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  
  usuariosController.update( _id, idnombre, hash, correo, apellidos, nombres, salt  )
  .then(
    (success)=> res.json( success ),
    (err)=> res.status(500).json(err)
  )
})

// // Login de usuario v01
// router.post('/auth',(req,res)=>{
//   const { idnombre,password } = req.body;
//   usuariosController.login(idnombre,password).then(
//     (success)=>{ 
//       if(id != null){
//         const id = success ; // devuelve el ID del usuario y genera el TOKEN              
//         const token = jwt.sign({id},'mi_clave_secreta');
//         res.json({ token });
//       }else{
//         res.json({texto:"Usuario no encontrado"});
//       }
//     },   
//     (err)=> res.status(500).json(err)  // devuelve un valor null  
//   )
// });

// Login de usuario v02
router.post('/auth',(req,res)=>{
  const { idnombre,password } = req.body;
  usuariosController.login(idnombre,password).then(
    (success)=>{ 
      if(success != null){
          usuariosController.afterLogin(idnombre).then(
            (token)=>{
                res.json({token}); // devuelve el TOKEN generado              
            },
            (err)=> res.status(500).json(err)  // devuelve un valor null  
          )
      }else{
        res.json({texto:"Usuario no encontrado"});
      }
    },   
    (err)=> res.status(500).json(err)  // devuelve un valor null  
  )
});


// validamos si el TOKEN es el correcto
router.get('/auth/verify', verificaToken ,(req,res)=>{
  jwt.verify(req.token, 'mi_clave_secreta', (err,data)=>{
      if(err){
          res.json({
            texto:"noautorizado"
          });
      }else{
          res.json({
              texto : "autorizado",
              data
          });
      };
  });
});

function verificaToken( req, res, next ){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !='undefined'){
      const bearer = bearerHeader.split(" ");   /// partimos la cadena en 2 y creamos un objeto de 2 campos
      const bearerToken = bearer[1];  // cogemos el 2do elemento (el primer elemento es de posición 0)
      req.token = bearerToken;
      next();
  }else{
      res.json({
        texto:"noautorizado"
      });
  };
};

module.exports = router;
