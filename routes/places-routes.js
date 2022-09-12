import express from 'express';
import { body } from 'express-validator';

import {
  createPlace,
  deletePlace,
  getPlaceById,
  getPlacesByUserId,
  updatePlace,
} from '../controllers/places-controllers.js';
import fileUpload from '../Middleware/file-upload.js';
import ValidateRequest from '../Middleware/check-auth.js';

const router = express.Router();

router.get('/:placeId', getPlaceById);

router.get('/user/:userId', getPlacesByUserId);

router.use(ValidateRequest);

router.post(
  '/',
  fileUpload.single('image'),
  [body('title').not().isEmpty(), 
  body('description').isLength({ min: 5 }),
  body('address').not().isEmpty()
],
  createPlace
);

router.patch('/:placeId', [ 
    body('title').not().isEmpty(),
    body('description').isLength({ min: 5 }),
], updatePlace);

router.delete('/:placeId', deletePlace);

export default router;
