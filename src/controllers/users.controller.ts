import {
  find,
  findById,
  findBy,
  updateById,
  deleteById,
} from '../models/generics.model.js';
import { findByEmailWithDifferentId, save } from '../models/users.model.js';
import { RouteCallback } from '../@types/types/index.js';
import { userValidation } from '../utils/validation.js';

/**
 * Get users
 */
export const findUsers: RouteCallback = (req, res) => {
  if (!req.headers.cookie && !req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized user' });
  }

  return find('user')
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
  if (!req.headers.cookie && !req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized user' });
  }

  const { id } = req.params;

  return findById(id, 'user')
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
  let validationErrors: string | object | null | undefined = null;

  findBy('email', email, 'user')
    .then(async (result) => {
      if (result) {
        return Promise.reject('DUPLICATE_EMAIL'); // eslint-disable-line prefer-promise-reject-errors
      }

      validationErrors = userValidation(req.body);
      if (validationErrors) {
        return Promise.reject('INVALID_DATA'); // eslint-disable-line prefer-promise-reject-errors
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
      } else if (err === 'INVALID_DATA') {
        res.status(422).json({ validationErrors });
      } else {
        res.status(500).send({ error: 'Error saving the user' });
      }
    });
};

/**
 * Update user
 */
export const updateUser: RouteCallback = (req, res) => {
  if (!req.headers.cookie && !req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized user' });
  }

  const { id } = req.params;
  let validationErrors: string | object | null | undefined = null;

  return Promise.all([
    findById(id, 'user'),
    findByEmailWithDifferentId(id, req.body.email),
  ])

    .then(async ([user, otherUserWithTitle]) => {
      if (!user) {
        return Promise.reject('NO_USER_FOUND'); // eslint-disable-line prefer-promise-reject-errors
      }

      if (otherUserWithTitle) {
        return Promise.reject('DUPLICATE_EMAIL'); // eslint-disable-line prefer-promise-reject-errors
      }

      validationErrors = userValidation(req.body, false);
      if (validationErrors) {
        return Promise.reject('INVALID_DATA'); // eslint-disable-line prefer-promise-reject-errors
      }

      await updateById(id, req.body, 'user');
      return res.status(200).json({ data: { old: user, new: req.body } });
    })
    .catch((err) => {
      if (err === 'NO_USER_FOUND') {
        res.status(409).json({ message: 'User not found' });
      } else if (err === 'DUPLICATE_EMAIL') {
        res
          .status(409)
          .json({ message: 'This email is already used by other user' });
      } else if (err === 'INVALID_DATA') {
        res.status(422).json({ validationErrors });
      } else {
        res.status(500).send({ error: 'Error update the user' });
      }
    });
};

/**
 * Delete user by Id
 */
export const deleteUserById: RouteCallback = (req, res) => {
  if (!req.headers.cookie && !req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized user' });
  }

  const { id } = req.params;

  return deleteById(id, 'user')
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
