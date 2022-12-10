import mongoose, { Schema } from 'mongoose';

const EmpleadoSchema = new Schema({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    edad: {
        type: Number,
        require: true
    },
    caracteristicas: {
        type: Array<String>,
        default: []
    }
})

export default mongoose.model('Empleado', EmpleadoSchema);