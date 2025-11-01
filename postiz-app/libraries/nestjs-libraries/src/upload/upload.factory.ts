import { CloudflareStorage } from './cloudflare.storage';
import { IUploadProvider } from './upload.interface';
import { LocalStorage } from './local.storage';

export class UploadFactory {
  static createStorage(): IUploadProvider {
    const storageProvider = process.env.STORAGE_PROVIDER || 'local';

    switch (storageProvider) {
      case 'local': {
        const uploadDirectory = process.env.UPLOAD_DIRECTORY;
        if (!uploadDirectory) {
          throw new Error(
            'UPLOAD_DIRECTORY environment variable is required when using local storage. ' +
              'Please set UPLOAD_DIRECTORY to a valid path (e.g., /uploads or ./uploads)'
          );
        }
        return new LocalStorage(uploadDirectory);
      }

      case 'cloudflare': {
        const requiredVars = {
          CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
          CLOUDFLARE_ACCESS_KEY: process.env.CLOUDFLARE_ACCESS_KEY,
          CLOUDFLARE_SECRET_ACCESS_KEY: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
          CLOUDFLARE_REGION: process.env.CLOUDFLARE_REGION,
          CLOUDFLARE_BUCKETNAME: process.env.CLOUDFLARE_BUCKETNAME,
          CLOUDFLARE_BUCKET_URL: process.env.CLOUDFLARE_BUCKET_URL,
        };

        const missingVars = Object.entries(requiredVars)
          .filter(([, value]) => !value)
          .map(([key]) => key);

        if (missingVars.length > 0) {
          throw new Error(
            `Missing required Cloudflare R2 environment variables: ${missingVars.join(', ')}. ` +
              'Please configure all Cloudflare credentials for R2 storage.'
          );
        }

        return new CloudflareStorage(
          requiredVars.CLOUDFLARE_ACCOUNT_ID!,
          requiredVars.CLOUDFLARE_ACCESS_KEY!,
          requiredVars.CLOUDFLARE_SECRET_ACCESS_KEY!,
          requiredVars.CLOUDFLARE_REGION!,
          requiredVars.CLOUDFLARE_BUCKETNAME!,
          requiredVars.CLOUDFLARE_BUCKET_URL!
        );
      }

      default:
        throw new Error(
          `Invalid STORAGE_PROVIDER: "${storageProvider}". Valid options are: "local" or "cloudflare"`
        );
    }
  }
}
