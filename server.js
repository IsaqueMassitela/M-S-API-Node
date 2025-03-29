import express from 'express';
import publicRoutes from './routes/public.js';

const app = express()
app.use(express.json())

const users = []

app.post('/usuarios', (req, res) => {

    console.log(req.body);  // Debugging
    
    users.push(req.body);
    res.send('Okay Good Aqui Tambem Funciona');
});

app.get('/usuarios',(req, res) => {

  res.json(users)

    
})

app.listen(3000)
