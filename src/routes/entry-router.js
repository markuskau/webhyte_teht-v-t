import express from 'express';
import {body} from 'express-validator';
import {
  deleteEntry,
  getEntries,
  getEntryById,
  postEntry,
} from '../controllers/entry-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {validationErrorHandler} from '../middlewares/error-handlers.js';

const entryRouter = express.Router();

entryRouter
  .route('/')
  .get(authenticateToken, getEntries)
  .post(
    authenticateToken,
    // validators:
    // Entry_date:
    body('entry_date')
      .notEmpty()
      .withMessage('Entry date is required')
      .isISO8601()
      .withMessage('Entry date must be a valid date (YYYY-MM-DD)')
      .toDate(),
    // Mood:
    body('mood')
      .trim()
      .notEmpty()
      .withMessage('Mood is required')
      .isLength({min: 2, max: 50})
      .withMessage('Mood must be between 2 and 50 characters'),
    //Weight:
    body('weight')
      .notEmpty()
      .withMessage('Weight is required')
      .isFloat({min: 30, max: 300})
      .withMessage('Weight must be a number between 30 and 300')
      .toFloat(),
    // Sleep_hours:
    body('sleep_hours')
      .notEmpty()
      .withMessage('Sleep hours are required')
      .isFloat({min: 0, max: 24})
      .withMessage('Sleep hours must be between 0 and 24')
      .toFloat(),
    // Notes:
    body('notes')
      .optional()
      .trim()
      .isLength({max: 1000})
      .withMessage('Notes can be max 1000 characters'),

    validationErrorHandler,
    postEntry,
  );

entryRouter
  .route('/:id')
  .get(getEntryById)
  .delete(authenticateToken, deleteEntry);

export default entryRouter;