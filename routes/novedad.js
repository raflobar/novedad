var express = require('express');
var router = express.Router();
const novedadController = require('../controllers/novedad')

// Listar novedades
router.get('/', (req, res)=>{
    novedadController.lista().then(
    (listNovedad)=>{
      res.json(listNovedad)
    },
    (err)=>{
      res.status(500).json(err)
    }
  );
});

// Mostrar info de la novedad por username ( params )
router.get('/:userId', (req, res)=>{
  const userId = req.params.userId;
  novedadController.listaUser(userId).then(
    (listNovedad)=>{
      res.json(listNovedad)
    },
    (err)=>{
      res.status(500).json(err)
    }
  );
});

// Mostrar info de la novedad por id ( params )
router.get('/:novedadId/show', (req, res)=>{
  const novId = req.params.novedadId;
  novedadController.show(novId).then(
    (success)=> res.json( success ),
    (err)=> res.status(500).json(err)
  )
});


// Crear una novedad
router.post('/', (req, res)=>{

  const { idnombre, correo, nombres, apellidos, avatar, novfecha, novtitulo,
    novfoto, novdescorta, novdeslarga, novlinkcompa, novlinkautor, novtematica, novmetatag } = req.body;
  
    novedadController.store( idnombre, correo, nombres, apellidos, avatar, novfecha, novtitulo,
    novfoto, novdescorta, novdeslarga, novlinkcompa, novlinkautor, novtematica, novmetatag ).then(
    (success)=>{ 
      res.json( success )
    },
    (err)=> {
      res.status(500).json(err)
    }
  );
});

// Elimino por id de la novedad (params)
router.delete('/:novedadId', (req, res)=>{
  const novId = req.params.novedadId;
  novedadController.destroy( novId ).then(
    (success)=> res.json( success ),
    (err)=> res.status(500).json(err)
  )
});

module.exports = router;
