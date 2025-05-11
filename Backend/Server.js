const dotenv = require('dotenv');
// Es importante cargar las variables de entorno antes de importar otros módulos
dotenv.config();

const express = require('express');
const cors = require('cors');
const ingredientRoutes = require('./Routes/ingredientRoutes');

const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173', // Origen de tu frontend (Vite)
  methods: ['GET', 'POST'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));

app.use(express.json()); // Para poder procesar JSON en las solicitudes

// Usamos las rutas definidas
app.use('/api', ingredientRoutes);

const PORT = process.env.PORT || 3000; // Definimos el puerto para el servidor
app.listen(PORT, () => {
  console.log(`Backend corriendo en el puerto ${PORT}`);
  console.log('Variables de entorno cargadas:', process.env.OPENAI_API_KEY ? 'API Key configurada' : ' NO configurada');
});
