import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import publicRoutes from './routes/public.js'; 

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
let port = process.env.PORT || 3000;

app.use('/public', publicRoutes);

// Definindo o modelo para o Produto
const productSchema = new mongoose.Schema({
  machamba: String,
  produto: String,
  quantidade: Number,
  precoUnit: Number,
  precoTotal: Number,
});

const Product = mongoose.model('Product', productSchema);

// Conexão com o banco de dados
const dbUrl = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3000;

mongoose.connect(dbUrl)
  .then(() => console.log("🟢 Conectado ao MongoDB!"))
  .catch((err) => console.error("🔴 Erro ao conectar ao MongoDB:", err));

// Rota para registrar um novo produto
app.post('/register-product', async (req, res) => {
  try {
    const { machamba, produto, quantidade, precoUnit } = req.body;

    // Calculando o Preço Total
    const precoTotal = parseFloat(quantidade) * parseFloat(precoUnit);

    // Criando um novo produto no banco
    const newProduct = new Product({
      machamba,
      produto,
      quantidade,
      precoUnit,
      precoTotal
    });

    // Salvando no banco
    await newProduct.save();

    // Retornando o produto salvo
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao registrar produto!" });
  }
});

const users = [];

app.post('/usuarios', (req, res) => {
    console.log(req.body);
    users.push(req.body);  
    res.status(201).json(req.body);
});

app.get('/usuarios', (req, res) => {
    res.status(200).json(users);
});

app.get('/', (req, res) => { 
    res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
























// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import publicRoutes from './routes/public.js'; 

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());
// let port = process.env.PORT || 3000;

// app.use('/public', publicRoutes); 

// const dbUrl = process.env.DATABASE_URL;
// const PORT = process.env.PORT || 3000; 

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


// app.get('/', (req, res) => { 
//     res.json({ message: 'Hello World!' });
// });

// app.listen(PORT, () => {
//     console.log(`🚀 Servidor rodando na porta ${PORT}`);
// });
