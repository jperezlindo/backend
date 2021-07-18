const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');



const getUsers = async(req, res = response) => {
    
    const { limit = 3, desde = 0 } = req.query;
    const query = {activo:true};

    //de esta manera se ejecutan de manera silmultanea las promesas 
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    })
}

const postUser = async(req, res = response) => {

    const {nombre, email, pass, avatar, rol} = req.body;
    const user = new User({nombre, email, pass, avatar, rol});

    //encriptar el pass
    const salt = bcrypt.genSaltSync();
    user.pass = bcrypt.hashSync(pass, salt);

    //inserta el user en la BD
    await user.save();
    

    res.status(200).json({
        msg: 'Usuario creado con exito.',
        user
    });
}

const putUser = async(req, res = response) => {

    const {id} = req.params;
    const { pass, google, email, ...resto} = req.body;

    const user = await User.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Usuario modificado con exito.',
        user
    })
}

const patchUser = (req, res = response) => {
    res.json({
        msg:"API patchUser - userController ",
    })
}

const deleteUser = async(req, res = response) => {
    
    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id, {activo:false});
    res.status(200).json({
        msg: 'Usuario eliminado con exito.',
        user
    })
}

module.exports = {
    getUsers,
    postUser,
    putUser,
    patchUser,
    deleteUser
}