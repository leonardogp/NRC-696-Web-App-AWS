const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontend', 'dist', 'frontend', 'browser')));
// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'dev-nrc-696.cxcioasii3xc.us-west-2.rds.amazonaws.com',
  user: 'leonardog',
  password: 'L30n4rd0$',
  database: 'db_users'
});

// Conexión a la base de datos MySQL
db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

// Endpoint para buscar usuarios por número de identificación
app.get('/users', (req, res) => {
  const { identification } = req.query;

  if (!identification) {
    return res.status(400).json({ error: 'El número de identificación es requerido' });
  }

  const query = 'SELECT * FROM users WHERE identificacion = ?';
  db.query(query, [identification], (err, results) => {
    if (err) {
      console.error('Error al buscar usuarios:', err);
      res.status(500).json({ error: 'Error al buscar usuarios en la base de datos' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Endpoint para registrar un nuevo usuario
app.post('/register', async (req, res) => {
  const { nombre, apellido, identificacion, password } = req.body;

  try {
    // Encriptar la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = 'INSERT INTO users (nombre, apellido, identificacion, password) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [nombre, apellido, identificacion, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ error: 'Error al registrar usuario en la base de datos' });
      } else {
        console.log('Usuario registrado correctamente');
        res.status(201).json({ message: 'Usuario registrado correctamente' });
      }
    });
  } catch (error) {
    console.error('Error al encriptar la contraseña:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Ruta de login
app.post('/login', (req, res) => {
  const { identificacion, password } = req.body;

  const sql = 'SELECT * FROM users WHERE identificacion = ?';
  db.query(sql, [identificacion], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).send('Error during login.');
    }
    if (results.length === 0) {
      return res.status(401).send('Invalid credentials.');
    }
    const user = results[0];
    if (bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ message: 'Login successful.' });
    } else {
      res.status(401).json({ error: 'Invalid credentials.' });
    }
  });
});

// Catch-All Route to Serve Angular App
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'frontend', 'browser', 'login','index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
