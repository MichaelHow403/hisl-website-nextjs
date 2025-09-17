import Image, { ImageProps } from 'next/image';
import { getAsset } from '@/lib/imagery';

interface AssetImageProps extends Omit<ImageProps, 'src'> {
  assetKey: string;
  fallback?: string;
}

export default function AssetImage({ assetKey, fallback, alt, ...props }: AssetImageProps) {
  const src = getAsset(assetKey, fallback);
  
  return (
    <Image
      src={src}
      alt={alt || `Image: ${assetKey}`}
      {...props}
    />
  );
}
