import express from 'express';
// import User from '../models/User.js'; 
import bcrypt from 'bcryptjs'; 
import User from '../models/user.js';

const router = express.Router();

router.post('/cadastro', async (req, res) => {
    const { email, password, nome } = req.body;

    try {
        // Verificando se o usuário já existe
        const userExistente = await User.findOne({ email });
        if (userExistente) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        // Hash da senha para segurança
        const hashedPassword = await bcrypt.hash(password, 10);  // Salt de 10 é uma boa prática

        // Criando o novo usuário
        const novoUsuario = new User({
            email,
            password: hashedPassword,  // Salvando a senha criptografada
            nome,
        });

        await novoUsuario.save();

        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
});

export default router;







// import express from 'express';

// const router = express.Router();


// router.post('/cadastro', async (req, res) => {
//     const { email, password, nome } = req.body;

//     try {
       
//         const userExistente = await User.findOne({ email });
//         if (userExistente) {
//             return res.status(400).json({ error: 'Email já cadastrado' });
//         }

       
//         const novoUsuario = new User({
//             email,
//             password, 
//             nome,
//         });

//         await novoUsuario.save();

//         res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Erro ao cadastrar usuário' });
//     }
// });

// export default router;