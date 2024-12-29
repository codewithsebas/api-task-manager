import mongoose from 'mongoose';

// Conexión a la base de datos
export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a la base de datos'))
    .catch((err) => console.error('Error al conectar a la base de datos:', err));
};
