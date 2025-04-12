import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Garantir que o email seja único
    },
    password: {
        type: String,
        required: true,
    },
    nome: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Vai adicionar automaticamente os campos createdAt e updatedAt
});

const User = mongoose.model('User', UserSchema);

export default User;
