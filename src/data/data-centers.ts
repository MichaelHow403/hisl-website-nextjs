// Global data center locations for "Where Your Prompts Go" visualization
// Coordinates in [longitude, latitude] format for Three.js sphere mapping

export interface DataCenter {
  id: string;
  name: string;
  provider: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude]
  region: string;
  capacity?: string;
  latency?: number; // ms
  active: boolean;
}

export const DATA_CENTERS: DataCenter[] = [
  // North America
  {
    id: 'us-east-1',
    name: 'US East (N. Virginia)',
    provider: 'AWS',
    location: 'Ashburn, VA, USA',
    coordinates: [-77.4874, 39.0438],
    region: 'North America',
    capacity: 'High',
    latency: 15,
    active: true
  },
  {
    id: 'us-west-2',
    name: 'US West (Oregon)',
    provider: 'AWS',
    location: 'Portland, OR, USA',
    coordinates: [-122.6765, 45.5152],
    region: 'North America',
    capacity: 'High',
    latency: 25,
    active: true
  },
  {
    id: 'gcp-us-central1',
    name: 'US Central (Iowa)',
    provider: 'Google Cloud',
    location: 'Council Bluffs, IA, USA',
    coordinates: [-95.8608, 41.2619],
    region: 'North America',
    capacity: 'High',
    latency: 20,
    active: true
  },
  {
    id: 'azure-east-us',
    name: 'Azure East US',
    provider: 'Microsoft Azure',
    location: 'Virginia, USA',
    coordinates: [-78.6569, 37.4316],
    region: 'North America',
    capacity: 'High',
    latency: 18,
    active: true
  },

  // Europe
  {
    id: 'eu-west-1',
    name: 'EU West (Ireland)',
    provider: 'AWS',
    location: 'Dublin, Ireland',
    coordinates: [-6.2603, 53.3498],
    region: 'Europe',
    capacity: 'High',
    latency: 12,
    active: true
  },
  {
    id: 'eu-central-1',
    name: 'EU Central (Frankfurt)',
    provider: 'AWS',
    location: 'Frankfurt, Germany',
    coordinates: [8.6821, 50.1109],
    region: 'Europe',
    capacity: 'High',
    latency: 14,
    active: true
  },
  {
    id: 'gcp-europe-west1',
    name: 'Europe West (Belgium)',
    provider: 'Google Cloud',
    location: 'St. Ghislain, Belgium',
    coordinates: [3.8200, 50.4700],
    region: 'Europe',
    capacity: 'Medium',
    latency: 16,
    active: true
  },
  {
    id: 'azure-north-europe',
    name: 'Azure North Europe',
    provider: 'Microsoft Azure',
    location: 'Dublin, Ireland',
    coordinates: [-6.2603, 53.3498],
    region: 'Europe',
    capacity: 'High',
    latency: 13,
    active: true
  },

  // Asia Pacific
  {
    id: 'ap-southeast-1',
    name: 'Asia Pacific (Singapore)',
    provider: 'AWS',
    location: 'Singapore',
    coordinates: [103.8198, 1.3521],
    region: 'Asia Pacific',
    capacity: 'High',
    latency: 35,
    active: true
  },
  {
    id: 'ap-northeast-1',
    name: 'Asia Pacific (Tokyo)',
    provider: 'AWS',
    location: 'Tokyo, Japan',
    coordinates: [139.6917, 35.6895],
    region: 'Asia Pacific',
    capacity: 'High',
    latency: 45,
    active: true
  },
  {
    id: 'gcp-asia-east1',
    name: 'Asia East (Taiwan)',
    provider: 'Google Cloud',
    location: 'Changhua County, Taiwan',
    coordinates: [120.5164, 24.0518],
    region: 'Asia Pacific',
    capacity: 'Medium',
    latency: 50,
    active: true
  },
  {
    id: 'azure-southeast-asia',
    name: 'Azure Southeast Asia',
    provider: 'Microsoft Azure',
    location: 'Singapore',
    coordinates: [103.8198, 1.3521],
    region: 'Asia Pacific',
    capacity: 'High',
    latency: 38,
    active: true
  },

  // Additional regions
  {
    id: 'ap-south-1',
    name: 'Asia Pacific (Mumbai)',
    provider: 'AWS',
    location: 'Mumbai, India',
    coordinates: [72.8777, 19.0760],
    region: 'Asia Pacific',
    capacity: 'Medium',
    latency: 55,
    active: true
  },
  {
    id: 'sa-east-1',
    name: 'South America (São Paulo)',
    provider: 'AWS',
    location: 'São Paulo, Brazil',
    coordinates: [-46.6333, -23.5505],
    region: 'South America',
    capacity: 'Medium',
    latency: 80,
    active: true
  },
  {
    id: 'af-south-1',
    name: 'Africa (Cape Town)',
    provider: 'AWS',
    location: 'Cape Town, South Africa',
    coordinates: [18.4241, -33.9249],
    region: 'Africa',
    capacity: 'Low',
    latency: 120,
    active: true
  },
  {
    id: 'anthropic-us',
    name: 'Anthropic US',
    provider: 'Anthropic',
    location: 'San Francisco, CA, USA',
    coordinates: [-122.4194, 37.7749],
    region: 'North America',
    capacity: 'High',
    latency: 22,
    active: true
  },
  {
    id: 'openai-us',
    name: 'OpenAI US',
    provider: 'OpenAI',
    location: 'San Francisco, CA, USA',
    coordinates: [-122.4194, 37.7749],
    region: 'North America',
    capacity: 'High',
    latency: 25,
    active: true
  }
];

// Helper functions for coordinate conversion
export function latLngToVector3(lat: number, lng: number, radius: number = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return {
    x: -(radius * Math.sin(phi) * Math.cos(theta)),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta)
  };
}

export function getDataCentersByRegion(region: string): DataCenter[] {
  return DATA_CENTERS.filter(dc => dc.region === region && dc.active);
}

export function getDataCentersByProvider(provider: string): DataCenter[] {
  return DATA_CENTERS.filter(dc => dc.provider === provider && dc.active);
}

export function getActiveDataCenters(): DataCenter[] {
  return DATA_CENTERS.filter(dc => dc.active);
}

export const REGIONS = [
  'North America',
  'Europe', 
  'Asia Pacific',
  'South America',
  'Africa'
] as const;

export const PROVIDERS = [
  'AWS',
  'Google Cloud',
  'Microsoft Azure',
  'Anthropic',
  'OpenAI'
] as const;

export type Region = typeof REGIONS[number];
export type Provider = typeof PROVIDERS[number];
