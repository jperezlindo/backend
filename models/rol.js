const {Schema, model} = require('mongoose');

const RolSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El ROL es obligatorio.']
    }
})


module.exports = model('Rol', RolSchema);