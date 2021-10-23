import * as User from '../models/users.model.js';
import { calculateToken, verifyPassword } from '../utils/security.js';
/*
 * Post new user
 */
const login = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email)
        .then((user) => {
        if (!user) {
            return Promise.reject('INVALID_CREDENTIALS'); // eslint-disable-line prefer-promise-reject-errors
        }
        return verifyPassword(password, user.password)
            .then((passwordIsCorrect) => {
            if (!passwordIsCorrect) {
                return Promise.reject('INVALID_CREDENTIALS'); // eslint-disable-line prefer-promise-reject-errors
            }
            const token = calculateToken(email, user.id);
            res.cookie('userToken', token);
            return res.status(200).json({
                message: `The user ${user.firstname} is logged in`,
                token: calculateToken(user.email, user.id),
            });
        })
            .catch((err) => {
            if (err === 'INVALID_CREDENTIALS') {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        });
    })
        .catch((err) => {
        if (err === 'INVALID_CREDENTIALS') {
            res.status(401).json({ message: 'Invalid credentials' });
        }
        else {
            res.status(500).send('Error saving the user');
        }
    });
};
export default login;
