const { param, body } = require('express-validator');
const { validator } = require('./validator');


const getUserByName  = [
    param('nama').isLength({min: 8}),
    validator
]

const getUserByEmailAndTelephone = [
    param('email').isEmail(),
    param('telepon').isLength({min: 12}),
    validator
]

//nama, jenis_kelamin, angkatan, email, telepon, deskripsi

const insertNewUser =  [
    body('nama').isLength({min: 8}),
    body('jenis_kelamin').isIn(['L','P']),
    body('angkatan').isNumeric({gt : 2018}),
    body('email').isEmail(),
    body('telepon').isLength({min: 12}),
    body('deskripsi').not().isEmpty(),
    validator
]

const deleteUserByEmail = [
    body('email').isEmail(),
    validator
]

const updateUser = [
    body('nama').isLength({min: 8}),
    body('deskripsi').not().isEmpty(),
    validator
]

const insertBulkUser  = [
    body('*.nama').isLength({min: 8}),
    body('*.jenis_kelamin').isIn(['P','L']),
    body('*.angkatan').isNumeric({gt : 2018}),
    body('*.email').isEmail(),
    body('*.telepon').isLength(12),
    body('*.deskripsi').not().isEmpty(),
    validator
]

module.exports = {
    getUserByName,
    getUserByEmailAndTelephone,
    insertNewUser,
    deleteUserByEmail,
    updateUser,
    insertBulkUser
}