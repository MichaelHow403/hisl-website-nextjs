import manifest from '../../public/assets.manifest.json';

interface ImageryManifest {
  [key: string]: string;
}

export const IMAGERY: ImageryManifest = manifest;

export function getAsset(key: string, fallback: string = '/media/logos/hisl-logo.jpeg'): string {
  return IMAGERY[key] || fallback;
}
