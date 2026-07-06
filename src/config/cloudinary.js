import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { env } from './env.js';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET
});

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isAudio = file.mimetype.startsWith('audio/');
    return {
      folder: isAudio ? 'invitely_audio' : 'invitely_media',
      resource_type: isAudio ? 'video' : 'image', // Cloudinary uses 'video' for audio
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'mp3', 'ogg', 'wav', 'm4a'],
      ...(isAudio ? {} : { transformation: [{ width: 1200, height: 1200, crop: 'limit' }] })
    };
  }
});

export default cloudinary;
