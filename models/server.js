const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { dbConnectionDev } = require('../database/config');



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //cambiar aqui donde apunte en endPoint de usuarios
        this.userPath = '/api/user';

        //CONEXION A DB
        this.connectDB();

        //MIDDLEWARES
        this.middlewares();

        //RUTAS DE LA APIREST
        this.routes();
    }

    async connectDB() {
        await dbConnectionDev();
    }


    middlewares() {
        
        this.app.use( cors() );

        //lee y parsea el body
        //this.app.use( express.json() );
        this.app.use(bodyParser.urlencoded({extended:false}));
        this.app.use(bodyParser.json());


        //publica el directorio publico
        this.app.use(express.static('public'));
        
    }

    routes() {
        this.app.use(this.userPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('SERVER OK, in PORT:', this.port);
        })
    }

}

module.exports = Server;