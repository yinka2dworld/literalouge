import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';
import { tokenChecker } from "../middleware/auth.js";
import { finished } from 'stream/promises';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);



dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.SECRET_KEY,
    secure: true,
})

 
export const applyTokenChecker = (resolver, isExcluded = false) => {
  return (parent, args, context, info) => {
      if (!isExcluded) {
          tokenChecker(context.req, context.res, () => {
              return resolver(parent, args, context, info);
          });
      } else {
          return resolver(parent, args, context, info);
      }
  };
};

export const uploadToCloudinary = async (file) => {
  try {
    const { createReadStream, filename, mimetype } = await file;
    const fileExtension = filename.split('.').pop();
    const originalFileName = filename.replace(`.${fileExtension}`, '');
    
    let resourceType;
    if (mimetype.startsWith('image')) {
      resourceType = 'image';
    } else if (mimetype === 'application/pdf') {
      resourceType = 'raw'; 
    } else {
      throw new Error(`Unsupported file type: ${mimetype}`);
    }
    
    const publicId = originalFileName;

    return new Promise((resolve, reject) => {
      const stream = createReadStream();
      const cloudinaryStream = cloudinary.uploader.upload_stream(
        {
          folder: 'literalouge',
          resource_type: resourceType,
          public_id: publicId,
        },
        (error, result) => {
          if (error) {
            console.error(`Cloudinary upload error for file ${filename}:`, error);
            return reject(new Error(`Cloudinary upload failed for ${filename}: ${error.message}`));
          }
          console.log(`File ${filename} uploaded successfully. Secure URL:`, result.secure_url);
          resolve(result.secure_url);
        }
      );
      stream.pipe(cloudinaryStream);
    });
  } catch (err) {
    console.error('Error in file upload process:', err);
    throw new Error('File upload process failed');
  }
};


export const uploadToLocalStorage = async (upload) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const uniqueFilename = uuidv4() + '-' + Date.now() + path.extname(filename);
  const filepath = path.join('books', uniqueFilename);
  
  // Pipe the file to a local destination
  const out = fs.createWriteStream(filepath);
  stream.pipe(out);
  await finished(out); // Wait for the stream to finish

  return filepath; // Return the path or URL as needed
};

export const deleteOldFileFromCloudinary = async (publicId) => {
  if (!publicId) {
    throw new Error('No public ID provided.');
  }
  try {
    console.log(`Attempting to delete file with public ID: ${publicId}`); 
    const fileDeleter = await cloudinary.uploader.destroy(publicId);
    console.log('Cloudinary result for deletion:', result);

    if (fileDeleter.result === 'ok') {
      console.log(`Cloudinary file with public ID ${publicId} deleted successfully.`);
    } else {
      throw new Error(`Failed to delete the file from Cloudinary. Response: ${JSON.stringify(result)}`);
    }
  } catch (error) {
    console.error(`Error deleting file from Cloudinary with public ID ${publicId}:`, error.message);
    throw new Error(`Cloudinary deletion error: ${error.message}`);
  }
};


export const extractPublicId = (url) => {
  console.log(`Extracting public ID from URL: ${url}`);
  const match = url.match(/\/([^/]+)\.(jpg|jpeg|png|gif|pdf|mp3)$/);
  if (match) {
    console.log(`Extracted public ID: ${match[1]}`);
    return match[1];
  }
  console.warn('Failed to extract public ID from URL.');
  return null;
};
