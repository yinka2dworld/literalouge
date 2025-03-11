import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
  secure: true,
});
      


      export const uploadToCloudinary = async (file) => {
        try {
          const { createReadStream, filename, mimetype } = await file;
          const fileExtension = filename.split('.').pop();
          const originalFileName = filename.replace(`.${fileExtension}`, '');
          
          let resourceType;
          if (mimetype.startsWith('image')) {
            resourceType = 'image';
          } else if (mimetype === 'application/pdf' || mimetype === 'application/epub+zip') {
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



      export const deleteFileFromCloudinary = async (url) => {
        if (!url) {
          throw new Error('No URL provided.');
        }
        console.log(`Extracting public ID from URL: ${url}`);
        const decodedUrl = decodeURIComponent(url);

        const match = decodedUrl.match(/\/literalouge\/([^/.]+)(?:\.(jpg|jpeg|png|gif|pdf|mp3|epub))?$/);
        if (!match) {
          throw new Error('Failed to extract public ID from URL.');
        }
        
        // Rebuild the public ID using the folder and captured public_id.
        const publicId = `literalouge/${match[1]}`;
        console.log(`Extracted public ID: ${publicId}`);
      
        try {
          console.log(`Attempting to delete file with public ID: ${publicId}`);
          const deletionResult = await cloudinary.uploader.destroy(publicId);
          console.log('Cloudinary deletion result:', deletionResult);
      
          if (deletionResult.result === 'ok') {
            console.log(`Cloudinary file with public ID ${publicId} deleted successfully.`);
            return deletionResult;
          } else {
            throw new Error(`Failed to delete the file from Cloudinary. Response: ${JSON.stringify(deletionResult)}`);
          }
        } catch (error) {
          console.error(`Error deleting file from Cloudinary with public ID ${publicId}:`, error.message);
          throw new Error(`Cloudinary deletion error: ${error.message}`);
        }
      };







