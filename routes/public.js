import express from 'express';

const router = express.Router();
const users = []; 

router.post('/cadastro', (req, res) => {
    const user = req.body;

    if (!user || !user.email || !user.password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    users.push(user); 
    res.status(201).json({ message: 'Usuário cadastrado com sucesso', user });
});

router.get('/cadastro', (req, res) => {
    res.send('O GET está funcionando corretamente!');
});

export default router;
