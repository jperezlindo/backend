const { Schema, model} = require('mongoose');

const UserSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        require: [true, 'El email es obligatorio'],
        unique: true        
    },
    pass: {
        type: String,
        require: [true, 'El pasword es obligatorio']
    },
    avatar: {
        type: String,
        //require: [true, 'El pasword es obligatorio']
    },
    rol: {
        type: String,
        require: [true, 'El rol es obligatorio']
    },
    activo: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

//quita los datos que no quiero devolver al front
UserSchema.methods.toJSON = function() {
    const {__v, pass, ...user } = this.toObject();

    return user;
}

module.exports = model('User', UserSchema);