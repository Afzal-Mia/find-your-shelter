// Helper to extract Cloudinary public ID from a secure URL
function getPublicIdFromUrl(url: string): string | null {
    try {
        // Example URL: https://res.cloudinary.com/<cloud_name>/image/upload/v1680000000/find-your-shelter/abc123.jpg
        const parts = url.split('/upload/');
        if (parts.length !== 2) return null;
        const remainder = parts[1]; // e.g., v1680000000/find-your-shelter/abc123.jpg
        // Remove version prefix if present
        const withoutVersion = remainder.replace(/^v\d+\//, '');
        // Remove file extension
        const withoutExt = withoutVersion.replace(/\.[^.]+$/, '');
        return withoutExt; // e.g., find-your-shelter/abc123
    } catch {
        return null;
    }
}
export default getPublicIdFromUrl;
