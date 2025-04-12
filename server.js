import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import publicRoutes from './routes/public.js'; // Já importou a rota, só falta usá-la

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Usando as rotas públicas
app.use('/public', publicRoutes);  // Roteamento para as rotas publicas

const dbUrl = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3000; // Usando 3000 como default

// Conectar ao MongoDB
mongoose.connect(dbUrl)
  .then(() => console.log("🟢 Conectado ao MongoDB!"))
  .catch((err) => console.error("🔴 Erro ao conectar ao MongoDB:", err));

// Definir as rotas para usuários
const users = [];

app.post('/usuarios', (req, res) => {
    console.log(req.body);
    users.push(req.body);  // Guarde os usuários no array (Lembre-se: dados não são persistidos)
    res.status(201).json(req.body);
});

app.get('/usuarios', (req, res) => {
    res.status(200).json(users);
});

// Rota simples para 'Hello World'
app.get('/', (req, res) => { 
    res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});






// import express from 'express';
// import publicRoutes from './routes/public.js';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const dbUrl = process.env.DATABASE_URL;

// mongoose.connect(dbUrl)
//   .then(() => console.log("🟢 Conectado ao MongoDB!"))
//   .catch((err) => console.error("🔴 Erro ao conectar ao MongoDB:", err));

// const users = [];

// app.post('/usuarios', (req, res) => {
//     console.log(req.body);
//     users.push(req.body);
//     res.status(201).json(req.body);
// });

// app.get('/usuarios', (req, res) => {
//     res.status(200).json(users);
// });

// const PORT = process.env.PORT ;
// app.listen(PORT, () => {
//     console.log(`🚀 Servidor rodando na porta ${PORT}`);
// });

// //get hello world
// app.get('/', function (req, res) { 
//     res.json({ message: 'Hello World!' });
// })
