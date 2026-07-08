import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  priceBDT: { type: Number, required: true },
  period: { type: String, default: 'one-time' },
  description: { type: String, default: '' },
  features: [{ type: String }],
  isPopular: { type: Boolean, default: false },
  buttonText: { type: String, default: 'Get Started' }
}, { _id: false });

const paymentNumberSchema = new mongoose.Schema({
  personal: { type: String, default: '01XXXXXXXXX' },
  merchant: { type: String, default: '01XXXXXXXXX' },
  instructions: { type: String, default: '' }
}, { _id: false });

const settingsSchema = new mongoose.Schema({
  plans: {
    'plan-free': { type: planSchema, default: () => ({
      id: 'plan-free',
      name: 'Starter',
      price: '$0',
      priceBDT: 0,
      period: 'forever',
      description: 'Perfect for small, intimate gatherings with close friends and family.',
      features: [
        'Access to 2 basic templates',
        'Up to 50 RSVPs',
        'Standard image upload (max 3 photos)',
        'Shared Invitely subdomain',
        'Basic countdown timer',
        'Ad-supported layout'
      ],
      isPopular: false,
      buttonText: 'Get Started'
    })},
    'plan-premium': { type: planSchema, default: () => ({
      id: 'plan-premium',
      name: 'Premium',
      price: '৳1,900',
      priceBDT: 1900,
      period: 'one-time',
      description: 'Our most popular choice for weddings, engagements, and big parties.',
      features: [
        'Unlock all premium templates',
        'Unlimited RSVPs',
        'Full photo gallery (up to 20 photos)',
        'Custom theme styling, colors & custom fonts',
        'No ads or Invitely watermarks',
        'Background music placeholder integration',
        'Downloadable RSVP CSV reports',
        'Google Maps venue integration'
      ],
      isPopular: true,
      buttonText: 'Upgrade Now'
    })},
    'plan-vip': { type: planSchema, default: () => ({
      id: 'plan-vip',
      name: 'VIP Elite',
      price: '৳4,900',
      priceBDT: 4900,
      period: 'one-time',
      description: 'Tailored for large events seeking absolute control and dedicated customization.',
      features: [
        'Everything in Premium',
        'Personalized domain support',
        'Priority support (response in < 2 hours)',
        'Custom RSVP form builder fields',
        'Guest seat and food preference management',
        'Password protection & RSVP security pins',
        'Advanced greeting wall & guest comments'
      ],
      isPopular: false,
      buttonText: 'Go VIP'
    })}
  },
  paymentNumbers: {
    bkash: { type: paymentNumberSchema, default: () => ({
      personal: '01XXXXXXXXX',
      merchant: '01XXXXXXXXX',
      instructions: 'Send money to bKash personal number'
    })},
    nagad: { type: paymentNumberSchema, default: () => ({
      personal: '01XXXXXXXXX',
      merchant: '01XXXXXXXXX',
      instructions: 'Send money to Nagad personal number'
    })}
  }
}, { timestamps: true });

// Singleton pattern - only one settings document should exist
settingsSchema.statics.getInstance = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
