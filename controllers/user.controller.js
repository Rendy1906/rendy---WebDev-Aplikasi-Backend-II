const { userServices } = require('../services');
const { responseHelper } = require('../helper');

const getAll = async (req, res) => {
    try {

        const users = await userServices.getAll();
        if(users instanceof Error) {
            throw new Error(users);
        } 
        res.status(responseHelper.status.success).json(users);
       
    } catch (error) {
        res.status(responseHelper.status.error).json(error.message);
    }
}
const getUserByName = async (req, res) => {
    try {
        const { nama } = req.params;
        const user = await userServices.getUserByName(nama);
        res.status(responseHelper.status.success).json(user);
    } catch (error) {
        res.status(responseHelper.status.error).json(error.message);
    }
}
const getUserByEmailAndTelephone = async (req, res) => {
    try {
        const {email, telepon} = req.params;
        const user = await userServices.getUserByEmailAndTelephone(email, telepon);
        res.status(responseHelper.status.success).json(user);
    } catch (error) {
        res.status(responseHelper.status.error).json(error.message);
    }
}
const insertNewUser = async (req, res) => {
    try {

        // nama, jenis_kelamin, angkatan, email, telepon, deskripsi

        const { nama, jenis_kelamin, angkatan, email, telepon, deskripsi } = req.body;
        const result = await userServices.insertNewUser( nama, jenis_kelamin, angkatan, email, telepon, deskripsi );
        if(result instanceof Error) {
            throw new Error(result);
        }
        res.status(responseHelper.status.success).json(result);
    } catch (error) {
        res.status(responseHelper.status.error).json(error.message);
    }
}
const deleteUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await userServices.deleteUserByEmail(email);
        if(result instanceof Error) {
            throw new Error(result);
        }
        res.status(responseHelper.status.success).json(result);
    } catch (error) {
        res.status(responseHelper.status.error).json(error.message);
    }
}

const updateUser = async (req, res) => {
    try {
        const { deskripsi, nama } = req.body;
        const result = await userServices.updateUser(deskripsi, nama);
        if(result instanceof Error) {
            throw new Error(result);
        }
        res.status(responseHelper.status.success).json(result);
    } catch (error) {
        res.status(responseHelper.status.error).json(error.message);
    }
}

const insertBulkUser = async (req, res) => {
    try {
        const result = await userServices.insertBulkUser(JSON.stringify(req.body));
        
        if(result instanceof Error) {
            throw new Error(result);
        }

        res.status(responseHelper.status.success).json(result);
    } catch (error) {
        res.status(responseHelper.status.error).json(error.message);
    }
}

module.exports = {
    getAll,
    getUserByName,
    getUserByEmailAndTelephone,
    insertNewUser,
    insertBulkUser,
    deleteUserByEmail,
    updateUser
}