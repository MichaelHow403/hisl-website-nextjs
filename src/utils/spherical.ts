import * as THREE from 'three';

/**
 * Convert latitude/longitude to 3D vector on unit sphere
 */
export function latLngToVec3(lat: number, lng: number, radius = 1): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180); // Convert to spherical coordinates
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

/**
 * Generate points along a great circle path between two lat/lng points
 */
export function greatCirclePoints(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
  numPoints = 50,
  radius = 1
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  
  // Convert to radians
  const lat1 = startLat * (Math.PI / 180);
  const lng1 = startLng * (Math.PI / 180);
  const lat2 = endLat * (Math.PI / 180);
  const lng2 = endLng * (Math.PI / 180);

  // Calculate the angular distance
  const dLng = lng2 - lng1;
  const a = Math.sin(lat1) * Math.sin(lat2) + 
           Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLng);
  const angularDistance = Math.acos(Math.max(-1, Math.min(1, a)));

  for (let i = 0; i <= numPoints; i++) {
    const f = i / numPoints;
    
    if (angularDistance === 0) {
      // Same point
      points.push(latLngToVec3(startLat, startLng, radius));
      continue;
    }

    const A = Math.sin((1 - f) * angularDistance) / Math.sin(angularDistance);
    const B = Math.sin(f * angularDistance) / Math.sin(angularDistance);

    const x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
    const y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
    const z = A * Math.sin(lat1) + B * Math.sin(lat2);

    // Normalize and scale
    const length = Math.sqrt(x * x + y * y + z * z);
    points.push(new THREE.Vector3(
      -(x / length) * radius,
      (z / length) * radius,
      (y / length) * radius
    ));
  }

  return points;
}

/**
 * Calculate distance between two lat/lng points (in km)
 */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
           Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
           Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Get a point at a specific distance along a great circle path
 */
export function getPointAlongPath(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
  progress: number, // 0 to 1
  radius = 1
): THREE.Vector3 {
  const points = greatCirclePoints(startLat, startLng, endLat, endLng, 100, radius);
  const index = Math.floor(progress * (points.length - 1));
  return points[index] || points[points.length - 1];
}

/**
 * Create a smooth curve for orbital paths
 */
export function createOrbitPath(
  radius: number,
  inclination = 0,
  segments = 64
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    
    // Basic circular orbit
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * Math.sin(inclination);
    const z = Math.sin(angle) * radius * Math.cos(inclination);
    
    points.push(new THREE.Vector3(x, y, z));
  }
  
  return points;
}
