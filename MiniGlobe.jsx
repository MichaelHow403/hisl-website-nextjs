
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const tryLoad = (loader, path, onSuccess) => {
  try {
    const tex = loader.load(path, () => onSuccess && onSuccess());
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  } catch (e) {
    return null;
  }
};

export default function MiniGlobe({ height = 300 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, mount.clientWidth / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const key = new THREE.DirectionalLight(0xffffff, 1.35);
    key.position.set(5, 3, 5);
    scene.add(key);
    scene.add(new THREE.AmbientLight(0x88aaff, 0.5));
    const rim = new THREE.DirectionalLight(0x88d0ff, 0.8);
    rim.position.set(-6, -2, -4);
    scene.add(rim);

    const loader = new THREE.TextureLoader();

    // Prefer realistic earth image if present; else use /assets day/night maps
    const day = tryLoad(loader, "/images/earth_globe_realistic.png") || loader.load("/assets/earth_daymap.jpg");
    const night = tryLoad(loader, "/assets/earth_nightmap.jpg") || day;
    const clouds = tryLoad(loader, "/assets/earth_clouds.jpg");

    if (clouds) {
      clouds.wrapS = clouds.wrapT = THREE.RepeatWrapping;
      clouds.magFilter = THREE.LinearFilter;
    }

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const geo = new THREE.SphereGeometry(2, 64, 64);
    const mat = new THREE.MeshPhongMaterial({
      map: day,
      emissiveMap: night,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.35,
      shininess: 5,
      specular: new THREE.Color(0x111111),
    });
    const earth = new THREE.Mesh(geo, mat);
    globeGroup.add(earth);

    if (clouds) {
      const cloudGeo = new THREE.SphereGeometry(2.02, 64, 64);
      const cloudMat = new THREE.MeshLambertMaterial({
        map: clouds,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
      });
      const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
      globeGroup.add(cloudMesh);
    }

    const atmoGeo = new THREE.SphereGeometry(2.1, 64, 64);
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
          gl_FragColor = vec4(0.5, 0.75, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    globeGroup.add(new THREE.Mesh(atmoGeo, atmoMat));

    // Simple autorotate
    let raf = 0;
    const animate = () => {
      earth.rotation.y += 0.0016;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const onResize = () => {
      const w = mount.clientWidth;
      renderer.setSize(w, height);
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [height]);

  return <div ref={mountRef} style={{ width: "100%", height }} />;
}
