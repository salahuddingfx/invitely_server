import express from 'express';
import {
  checkSlugAvailable,
  createInvitation,
  getUserInvitations,
  getInvitationById,
  updateInvitation,
  deleteInvitation,
  getPublicInvitationBySlug,
  submitRSVP
} from '../controllers/invitation.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Private dashboard endpoints
router.post('/', protect, createInvitation);
router.get('/user', protect, getUserInvitations);
router.get('/slug-check/:slug', protect, checkSlugAvailable);
router.get('/:id', protect, getInvitationById);
router.put('/:id', protect, updateInvitation);
router.delete('/:id', protect, deleteInvitation);

// Public client endpoints
router.get('/public/:slug', getPublicInvitationBySlug);
router.post('/public/:slug/rsvp', submitRSVP);

export default router;
