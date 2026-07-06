import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  categoryId: { type: String, required: true },
  description: { type: String },
  previewImage: { type: String },
  bgImage: { type: String },
  isPremium: { type: Boolean, default: false },
  theme: {
    primaryColor: { type: String, default: '#d4af37' },
    secondaryColor: { type: String, default: '#1e293b' },
    accentColor: { type: String, default: '#fbbf24' },
    backgroundColor: { type: String, default: '#fdfbf7' },
    textColor: { type: String, default: '#0f172a' },
    fontFamily: { type: String, enum: ['playfair', 'cormorant', 'greatvibes', 'sans'], default: 'playfair' }
  }
});

const Template = mongoose.model('Template', templateSchema);
export default Template;
