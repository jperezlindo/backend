const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsers, postUser, putUser, deleteUser, patchUser } = require('../controllers/user');
const { validarRol, validarEmail, validarId } = require('../helpers/db-validators');


const router = Router();

router.get('/', getUsers );

router.post('/', [
    check('nombre', 'El campo Nombre es obligatorio').not().isEmpty(),
    check('pass', 'El password debe tener +6 caracteres.').isLength({min:6}),
    check('email', 'El formato del email, no es valido').isEmail(),
    check('email').custom(validarEmail),
    check('rol').custom(validarRol),
    validarCampos
    ],postUser);

router.put('/:id', [
    check('id', 'ID no valido').isMongoId(),
    check('id').custom(validarId),
    check('rol').custom(validarRol),
    validarCampos
    ],putUser);

router.patch('/', patchUser);

router.delete('/:id', [ 
    check('id', 'ID no valido').isMongoId(),
    check('id').custom(validarId),
    validarCampos
    ],deleteUser);


router.put('/');

module.exports = router;