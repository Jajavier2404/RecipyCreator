import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import ingredientRoutes from './Routes/ingredientRoutes.js';
import authRoutes from './Routes/authRoutes.js';
import recipeRoutes from './Routes/recipeRoutes.js';

const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173', // Origen de tu frontend (Vite)
  methods: ['GET', 'POST'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));

app.use(express.json()); // Para poder procesar JSON en las solicitudes
app.use('/api/auth', authRoutes); 

// Usamos las rutas definidas
app.use('/api', ingredientRoutes);

app.use('/api/recipe', recipeRoutes); 


const PORT = process.env.PORT || 3000; // Definimos el puerto para el servidor
app.listen(PORT, () => {
  console.log(`Backend corriendo en el puerto ${PORT}`);
  console.log('Variables de entorno cargadas:', process.env.OPENAI_API_KEY ? 'API Key configurada' : ' NO configurada');
});
