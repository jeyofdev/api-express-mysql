import express from 'express';
import {
  findUsers,
  findUserById,
  saveUser,
  deleteUserById,
  updateUser,
} from '../controllers/users.controller.js';

const router = express.Router();

router.get('/', findUsers);
router.get('/:id', findUserById);
router.post('/', saveUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUserById);

export default router;
