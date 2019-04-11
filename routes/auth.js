const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios');
const auth = require('http-auth');

const basic = auth.basic({
  realm: 'Novedad'
}, (idnombre, password, callback) => {
  usuarioController.login(idnombre, password).then(
    (info) => callback(info)
  );
});

router.post('/', auth.connect(basic), (req, res) => {
  const idnombre = req.user;
  usuarioController.afterLogin( idnombre ).then(
    (success) => res.json( success ),
    (err) => res.status(500).json(err)
  );
});

module.exports = router;