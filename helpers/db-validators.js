const Rol = require('../models/rol');
const User = require('../models/User');

const validarRol = async(rol = '') => {
    
    const existeRol = await Rol.findOne({rol});
    if (!existeRol){
        throw new Error(`El rol ${rol}, no es valido`)
    }
}

const validarEmail = async(email = '') => {
    
    const existeEmail = await User.findOne({email});
    if(existeEmail){
        throw new Error (`El email: ${email}, ya se encuentra registrado en nuesta Base de Datos.`)
    }
}

const validarId = async(id) => {
    const existeId = await User.findById(id);
    if(!existeId){
        throw new Error (`El ID no existe.`)
    }
}


module.exports = {
    validarRol,
    validarEmail,
    validarId
}