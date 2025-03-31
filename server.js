import express from 'express';
import publicRoutes from './routes/public.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const dbUrl = process.env.DATABASE_URL;

mongoose.connect(dbUrl)
  .then(() => console.log("🟢 Conectado ao MongoDB!"))
  .catch((err) => console.error("🔴 Erro ao conectar ao MongoDB:", err));

const users = [];

app.post('/usuarios', (req, res) => {
    console.log(req.body);
    users.push(req.body);
    res.status(201).json(req.body);
});

app.get('/usuarios', (req, res) => {
    res.status(200).json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
