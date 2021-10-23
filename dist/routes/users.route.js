import express from 'express';
import { findUsers, findUserById, saveUser, deleteUserById, updateUser, } from '../controllers/users.controller.js';
import { decodeToken } from '../utils/security.js';
const router = express.Router();
/**
 * Check if user token exist
 */
export const verifyToken = (req, res, next) => {
    // with cookie
    if (req.headers.cookie) {
        const token = req.headers.cookie.split('=')[1];
        const datas = decodeToken(token);
        req.userDatas = datas;
    }
    else {
        req.userDatas = '';
    }
    // with bearer
    // if (req.headers.authorization) {
    //   const token = req.headers.authorization.split(' ')[1];
    //   const datas = decodeToken(token);
    //   req.userDatas = datas;
    // } else {
    //   req.userDatas = '';
    // }
    next();
};
router.get('/', verifyToken, findUsers);
router.get('/:id', verifyToken, findUserById);
router.post('/', saveUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUserById);
export default router;
