import express from 'express';
import { body } from 'express-validator';

import { getUsers, login, signup } from '../controllers/user-controllers.js';
import fileUpload from '../Middleware/file-upload.js';

const router = express.Router();

router.get('/', getUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  [
    body('name').not().isEmpty(),
    body('email').normalizeEmail().isEmail(),
    body('password').isLength({min: 6}),
  ],
  signup
);

router.post('/login', login);

export default router;
