import AssetImage from '@/components/AssetImage'

export default function Home() {
  return (
    <div>
      <div>hello</div>
      <AssetImage
        assetKey="brand.mark"
        alt="Test image"
        width={40}
        height={40}
      />
    </div>
  );
}
