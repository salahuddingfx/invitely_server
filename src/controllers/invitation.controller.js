import Invitation from '../models/Invitation.js';
import User from '../models/User.js';
import { sendRSVPNotification } from '../config/mail.js';

export const checkSlugAvailable = async (req, res) => {
  const { slug } = req.params;
  try {
    const match = await Invitation.findOne({ slug: new RegExp(`^${slug}$`, 'i') });
    res.json({ success: true, available: !match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createInvitation = async (req, res) => {
  try {
    const invitationData = {
      ...req.body,
      ownerId: req.user._id
    };

    // Verify slug uniqueness
    const slugMatch = await Invitation.findOne({ slug: new RegExp(`^${req.body.slug}$`, 'i') });
    if (slugMatch) {
      return res.status(400).json({ success: false, message: 'Slug URL is already taken' });
    }

    const invitation = await Invitation.create(invitationData);
    res.status(201).json({ success: true, data: invitation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserInvitations = async (req, res) => {
  try {
    const invitations = await Invitation.find({ ownerId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: invitations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getInvitationById = async (req, res) => {
  const { id } = req.params;
  try {
    const invitation = await Invitation.findOne({ _id: id, ownerId: req.user._id });
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found or unauthorized' });
    }
    res.json({ success: true, data: invitation });
  } catch (error) {
    res.status(550).json({ success: false, message: error.message });
  }
};

export const updateInvitation = async (req, res) => {
  const { id } = req.params;
  try {
    let invitation = await Invitation.findOne({ _id: id, ownerId: req.user._id });
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found or unauthorized' });
    }

    // Verify slug uniqueness if slug is modified
    if (req.body.slug && req.body.slug.toLowerCase() !== invitation.slug.toLowerCase()) {
      const slugMatch = await Invitation.findOne({ slug: new RegExp(`^${req.body.slug}$`, 'i') });
      if (slugMatch) {
        return res.status(400).json({ success: false, message: 'Slug URL is already taken' });
      }
    }

    invitation = await Invitation.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, data: invitation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteInvitation = async (req, res) => {
  const { id } = req.params;
  try {
    const invitation = await Invitation.findOneAndDelete({ _id: id, ownerId: req.user._id });
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found or unauthorized' });
    }
    res.json({ success: true, message: 'Invitation deleted successfully' });
  } catch (error) {
    res.status(550).json({ success: false, message: error.message });
  }
};

export const getPublicInvitationBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const invitation = await Invitation.findOne({ slug: new RegExp(`^${slug}$`, 'i') });
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found' });
    }

    // Increment view counts dynamically
    invitation.viewsCount += 1;
    await invitation.save();

    res.json({ success: true, data: invitation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitRSVP = async (req, res) => {
  const { slug } = req.params;
  const { name, status, guestsCount, foodPreference, message, phone } = req.body;

  try {
    const invitation = await Invitation.findOne({ slug: new RegExp(`^${slug}$`, 'i') });
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found' });
    }

    // Check if guest with same name has already RSVPed
    const existingRsvpIndex = invitation.rsvps.findIndex(
      (r) => r.name.toLowerCase() === name.toLowerCase()
    );

    const newRsvp = {
      name,
      status,
      guestsCount: status === 'attending' ? (guestsCount || 1) : 0,
      foodPreference,
      message,
      phone: phone || '',
      createdAt: new Date()
    };

    if (existingRsvpIndex !== -1) {
      invitation.rsvps[existingRsvpIndex] = newRsvp;
    } else {
      invitation.rsvps.push(newRsvp);
    }

    await invitation.save();

    // Send email notification to host asynchronously
    const hostUser = await User.findById(invitation.ownerId);
    if (hostUser && hostUser.email) {
      const coupleNames = `${invitation.bride.name.split(' ')[0]} & ${invitation.groom.name.split(' ')[0]}`;
      sendRSVPNotification(hostUser.email, coupleNames, name, newRsvp);
    }

    res.json({ success: true, data: invitation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
