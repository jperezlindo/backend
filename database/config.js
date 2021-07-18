const mongoose = require('mongoose');


// FUNCION PARA CONECTAR A LA BASE DE DATOS
const dbConnectionDev = async() => {
    
    try {
        await mongoose.connect(process.env.MONGOODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('DB OK in PORT:', process.env.PORTDB);
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar la Base de Datos');
    }

}

module.exports = {
    dbConnectionDev
}