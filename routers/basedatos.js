const {
  Pool
} = require('pg');
const Router = require('express-promise-router');
const keys = require('../config/keys');


const pool = new Pool({
  connectionString: keys.posgresqlURI,
  ssl: {
    rejectUnauthorized: false,
  }
});

pool.connect();

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.post('/insertarestudiante', async (req, res) => {
  const {
    nombre,
    apellido,
    numid
  } = req.body;
  console.log(req.body)
  await pool.query(
    `INSERT INTO estudiantes(nombre, apellido, numid) VALUES('${nombre}','${apellido}','${numid}')`
  );
  res.json({
    'RES': 'INSERTADO'
  });
});

router.get('/consultarestudiantes', async (req, res) => {

  const {
    rows
  } = await pool.query('SELECT * FROM estudiantes');
  res.json(rows);
});

router.delete('/eliminarestudiante', async (req, res) => {
  const {
    nombre,
    apellido,
    numid
  } = req.body;
  await pool.query(
    `DELETE FROM estudiantes WHERE numid = '${numid}'`
  );
  res.json({
    'RES': 'BORRADO'
  });
});

router.put('/actualizarestudiante', async (req, res) => {
  const {
    nombre,
    apellido,
    numid
  } = req.body;
  await pool.query(
    `UPDATE estudiantes SET nombre = '${nombre}', apellido = '${apellido}' WHERE numid = '${numid}'`
  );
  res.json({
    'RES': 'ACTUALIZADO'
  });
});