// src/services/CloudinaryService.js
import SHA1 from 'crypto-js/sha1';

/**
 * IMPORTANT: These are embedded in client code => Not secure.
 */
const CLOUD_NAME = 'dblflb0p7';
const API_KEY = '516292832434597';
const API_SECRET = 'M8u1pQM7FdNfKBRfVwewlKvz_Ew';
const UPLOAD_PRESET = 'ml_default'; // or omit if not using presets

/**
 * Generate a Cloudinary signature for signed upload
 * @param {Object} params - e.g. { timestamp, upload_preset, folder, ... }
 * @returns {string} SHA-1 signature
 */
function generateSignature(params) {
    // Sort keys alphabetically
    const sortedKeys = Object.keys(params).sort();
    let toSign = sortedKeys.map((key) => `${key}=${params[key]}`).join('&');
    // Append api_secret
    toSign += API_SECRET;
    // SHA-1 hash
    return SHA1(toSign).toString();
  }
  
  /**
   * Signed upload to Cloudinary
   * @param {File} file - the image file
   * @returns {string} secure_url from Cloudinary
   */
  export async function uploadToCloudinarySigned(file) {
    const timestamp = Math.floor(Date.now() / 1000);
  
    // The parameters we'll sign
    const params = {
      timestamp,
      upload_preset: UPLOAD_PRESET,
      // e.g. folder: "my-signed-folder"
    };
  
    // Generate signature
    const signature = generateSignature(params);
  
    // Build form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', API_KEY);
    formData.append('timestamp', timestamp.toString());
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('signature', signature);
  
    // POST to Cloudinary
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
  
    if (json.secure_url) {
      return json.secure_url;
    } else {
      console.error('Cloudinary upload error:', json);
      throw new Error('Signed upload failed');
    }
  }
  
  /**
   * (Optional) Delete an image from Cloudinary by public_id
   * If you want to truly remove images, you'd also store the public_id from the upload response.
   */
  export async function deleteCloudinaryImage(publicId) {
    // Basic auth = base64(api_key:api_secret)
    const authString = btoa(`${API_KEY}:${API_SECRET}`);
  
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload/${publicId}`;
    const resp = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${authString}`,
      },
    });
    const data = await resp.json();
  
    if (data.result === 'ok') {
      return true;
    } else {
      console.error('Cloudinary delete error:', data);
      return false;
    }
  }