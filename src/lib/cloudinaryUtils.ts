import cloudinary from '@/lib/cloudinary';
import type { UploadApiResponse } from 'cloudinary';

/**
 * Deletes one or more images from Cloudinary.
 * Accepts an array of `publicId` strings. Uses Cloudinary's destroy API.
 * Errors are logged but do not prevent the promise from resolving – the caller can
 * decide how to handle failures.
 */
export async function deleteCloudinaryImages(publicIds: string[]): Promise<void> {
  if (!publicIds || publicIds.length === 0) return;

  const deletePromises = publicIds.map((publicId) =>
    new Promise<void>((resolve) => {
      cloudinary.uploader.destroy(publicId, { resource_type: 'image' }, (error, result) => {
        if (error) {
          console.error(`Failed to delete Cloudinary image ${publicId}:`, error);
        } else if (result?.result !== 'ok') {
          console.warn(`Cloudinary delete result for ${publicId}:`, result);
        }
        resolve();
      });
    })
  );

  await Promise.all(deletePromises);
}
