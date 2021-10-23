import {
  deleteById,
  find,
  findById,
  findByEmail,
  findByEmailWithDifferentId,
  save,
  updateById,
} from '../models/users.model.js';
import { RouteCallback } from '../types/index.js';

/**
 * Get users
 */
export const findUsers: RouteCallback = (req, res) => {
  find()
    .then((results) => {
      if (results.length < 1) {
        return Promise.reject('NO_USER_FOUND'); // eslint-disable-line prefer-promise-reject-errors
      }
      return res.status(200).json({ results });
    })
    .catch((err: string | object) => {
      if (err === 'NO_USER_FOUND') {
        res.status(200).json({ message: 'No user found !!!' });
      } else {
        res.status(500).json({ error: 'Error retrieving data from database' });
      }
    });
};

/**
 * Get user By Id
 */
export const findUserById: RouteCallback = (req, res) => {
  const { id } = req.params;

  findById(id)
    .then((result) => {
      if (!result) {
        return Promise.reject('NO_USER_FOUND'); // eslint-disable-line prefer-promise-reject-errors
      }
      return res.status(200).json({ result });
    })
    .catch((error) => {
      if (error === 'NO_USER_FOUND') {
        res.status(200).json({ message: 'No user found !!!' });
      } else {
        res.status(500).json({ error: 'Error retrieving data from database' });
      }
    });
};

/**
 * Post new user
 */
export const saveUser: RouteCallback = (req, res) => {
  const { email, firstname, lastname, city } = req.body;

  findByEmail(email)
    .then(async (result) => {
      if (result) {
        return Promise.reject('DUPLICATE_EMAIL'); // eslint-disable-line prefer-promise-reject-errors
      }

      const postId = await save(req.body);
      return res.status(201).json({
        result: {
          id: postId,
          email,
          firstname,
          lastname,
          city,
        },
      });
    })
    .catch((err) => {
      if (err === 'DUPLICATE_EMAIL') {
        res
          .status(409)
          .json({ message: 'This user is already in the database' });
      } else {
        res.status(500).send({ error: 'Error saving the user' });
      }
    });
};

/**
 * Update user
 */
export const updateUser: RouteCallback = (req, res) => {
  const { id } = req.params;

  Promise.all([findById(id), findByEmailWithDifferentId(id, req.body.email)])

    .then(async ([user, otherUserWithTitle]) => {
      if (!user) {
        return Promise.reject('NO_USER_FOUND'); // eslint-disable-line prefer-promise-reject-errors
      }

      if (otherUserWithTitle) {
        return Promise.reject('DUPLICATE_EMAIL'); // eslint-disable-line prefer-promise-reject-errors
      }

      await updateById(id, req.body);
      return res.status(200).json({ data: { old: user, new: req.body } });
    })
    .catch((err) => {
      if (err === 'NO_USER_FOUND') {
        res.status(409).json({ message: 'User not found' });
      } else if (err === 'DUPLICATE_EMAIL') {
        res
          .status(409)
          .json({ message: 'This email is already used by other user' });
      } else {
        res.status(500).send({ error: 'Error update the user' });
      }
    });
};

/**
 * Delete user by Id
 */
export const deleteUserById: RouteCallback = (req, res) => {
  const { id } = req.params;

  deleteById(id)
    .then((result) => {
      if (result.affectedRows < 1) {
        return Promise.reject('NO_USER_FOUND'); // eslint-disable-line prefer-promise-reject-errors
      }

      return res.status(200).json({
        message: 'User deleting successfully',
        result,
      });
    })
    .catch((err) => {
      if (err === 'NO_USER_FOUND') {
        res.status(200).send({ message: 'User not found' });
      } else {
        res.status(500).send({ error: 'Error deleting the user' });
      }
    });
};
