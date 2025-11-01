import { readFileSync } from 'fs';
import axios from 'axios';

export const readOrFetch = async (path: string) => {
  if (path.indexOf('http') === 0) {
    // Check if this is a local upload URL - read from filesystem instead of HTTP
    // Handles: localhost, 127.0.0.1, host.docker.internal, etc.
    const uploadPathMatch = path.match(/\/uploads\/(.+)$/);
    const isLocalUrl =
      path.includes('localhost') ||
      path.includes('127.0.0.1') ||
      path.includes('host.docker.internal') ||
      path.includes('0.0.0.0');

    if (uploadPathMatch && isLocalUrl) {
      const uploadPath = process.env.UPLOAD_DIRECTORY || '/uploads';
      const filePath = `${uploadPath}/${uploadPathMatch[1]}`;

      try {
        console.log(`[readOrFetch] Reading local file: ${filePath}`);
        return readFileSync(filePath);
      } catch (error) {
        console.error(`[readOrFetch] Failed to read local file ${filePath}:`, error);
        // Fall through to HTTP fetch as fallback
        console.log(`[readOrFetch] Attempting HTTP fetch as fallback: ${path}`);
      }
    }

    return (
      await axios({
        url: path,
        method: 'GET',
        responseType: 'arraybuffer',
      })
    ).data;
  }

  return readFileSync(path);
};
