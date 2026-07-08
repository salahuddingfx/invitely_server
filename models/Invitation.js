import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['attending', 'declined', 'tentative'], required: true },
  guestsCount: { type: Number, default: 1 },
  foodPreference: { type: String, enum: ['standard', 'vegetarian', 'vegan', 'halal', 'kosher'], default: 'standard' },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
  phone: { type: String, default: '' }
});

const invitationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  categoryId: { type: String, required: true },
  templateId: { type: String, required: true },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  locationName: { type: String, required: true },
  locationAddress: { type: String, required: true },
  locationMapsUrl: { type: String, default: '' },
  musicUrl: { type: String, default: '' },
  themeColor: {
    primary: { type: String, required: true },
    secondary: { type: String, required: true },
    background: { type: String, required: true },
    text: { type: String, required: true }
  },
  fontFamily: { type: String, enum: ['playfair', 'cormorant', 'greatvibes', 'sans'], required: true },
  bride: {
    name: { type: String, required: true },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
    parentGroomBride: { type: String, default: '' }
  },
  groom: {
    name: { type: String, required: true },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
    parentGroomBride: { type: String, default: '' }
  },
  gallery: [{ type: String }],
  rsvps: [rsvpSchema],
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  viewsCount: { type: Number, default: 0 }
}, { timestamps: true });

const Invitation = mongoose.model('Invitation', invitationSchema);
export default Invitation;
