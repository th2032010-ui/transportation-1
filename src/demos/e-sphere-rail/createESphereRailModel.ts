import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

/**
 * E-SPHERE RAIL (NEXT-GENERATION AI TRANSPORTATION SYSTEM — YEAR 2050)
 *
 * Full upgrade into a high-density, production-ready AI SCMaglev flagship.
 * Inspired by Apple industrial design, Tesla future concepts, Hyundai Supernal, and E-Sphere One.
 *
 * ADVANCED 2050 TECHNOLOGY SUITE:
 * 1. AI QUANTUM SYSTEM:
 *    - Visible quantum AI neuromorphic core modules with rotating gimbals and fiber-optic conduits.
 *    - Autonomous AI pilot flight control deck with tactical 3D holographic HUDs and route optimization.
 *    - Floating holographic AI assistant orbs hovering above passenger executive tables.
 * 2. AUGMENTED REALITY (AR) SMART GLASS:
 *    - Floor-to-ceiling panoramic electrochromic smart glass with integrated AR flight HUDs.
 *    - Holographic travel diagnostics, real-time 600 km/h telemetry, route trajectory, and weather radar.
 *    - Transparent interior smart glass privacy partitions with glowing cyan edge illumination.
 * 3. ADVANCED MAGLEV & VISIBLE FIELD EFFECTS:
 *    - Visible toroidal magnetic energy rings beneath each carriage creating intense plasma-like field levitation.
 *    - 360 additive blue energy/plasma flux particles streaming in the 10cm levitation gap.
 *    - Traveling electromagnetic wave stator coils on the guideway pulling the train at 600 km/h.
 * 4. DENSE EXTERIOR SENSOR ARRAY (ZERO PLAIN SURFACES):
 *    - Solid-state spinning LiDAR domes, phased-array millimeter-wave radar panels on nose chin.
 *    - Multi-spectral AI stereo cameras above windshield and along roofline shoulders.
 *    - Phased-array 6G satellite mesh communication radomes and cryogenic nitrogen cooling radiators.
 *    - Triple continuous LED energy ribbons (Beltline, Roofline, Skirt Flux) flowing from nose to tail.
 * 5. ULTRA-LUXURY CABIN INTERIOR:
 *    - Biometric smart seats with health-status vital sign LED indicators and under-seat ambient blue glow.
 *    - Executive conference tables with wireless charging halos and rotating 3D holographic route globes.
 *    - VIP Observation Lounge (Car 4) with curved ivory sofa, cocktail credenza, central rotating hologram, and biophilic greenery.
 * 6. ELEVATED ILLUMINATED GUIDEWAY:
 *    - 180m elevated viaduct with sculptural Y-shaped wishbone pylons with embedded vertical LED channels.
 */

export interface ESphereRailOptions {
  scale?: number;
  castShadow?: boolean;
  receiveShadow?: boolean;
  wireframe?: boolean;
  speedKmh?: number;
}

// ---------------------------------------------------------------------------
// PROCEDURAL CANVAS TEXTURES
// ---------------------------------------------------------------------------

function createSolarSpineTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0a192f';
  ctx.fillRect(0, 0, 1024, 256);

  const cols = 32;
  const rows = 8;
  const cw = 1024 / cols;
  const rh = 256 / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cw;
      const y = r * rh;
      const grad = ctx.createLinearGradient(x, y, x + cw, y + rh);
      grad.addColorStop(0, '#0f2744');
      grad.addColorStop(0.5, '#071626');
      grad.addColorStop(1, '#05101d');
      ctx.fillStyle = grad;
      ctx.fillRect(x + 1.5, y + 1.5, cw - 3, rh - 3);

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(x + cw * 0.5, y + 2);
      ctx.lineTo(x + cw * 0.5, y + rh - 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(186, 230, 253, 0.25)';
      ctx.lineWidth = 0.5;
      for (let g = 1; g <= 3; g++) {
        const gy = y + (rh / 4) * g;
        ctx.beginPath();
        ctx.moveTo(x + 3, gy);
        ctx.lineTo(x + cw - 3, gy);
        ctx.stroke();
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 1);
  return texture;
}

function createLogoBadgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, 512, 128);

  ctx.strokeStyle = '#0077FE';
  ctx.shadowColor = '#0088FF';
  ctx.shadowBlur = 12;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(64, 64, 40, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(64, 64, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#00A3FF';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(64, 64, 30, -Math.PI * 0.3, Math.PI * 0.8);
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 34px "Segoe UI", Roboto, sans-serif';
  ctx.shadowBlur = 6;
  ctx.fillText('E-SPHERE RAIL X', 126, 76);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '500 15px "Segoe UI", Roboto, sans-serif';
  ctx.shadowBlur = 0;
  ctx.fillText('SMART CITY FLAGSHIP MAGLEV · YEAR 2055', 128, 102);

  return new THREE.CanvasTexture(canvas);
}

function createCockpitDisplayTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#030a17';
  ctx.fillRect(0, 0, 512, 256);

  ctx.strokeStyle = 'rgba(0, 119, 254, 0.25)';
  ctx.lineWidth = 1;
  for (let x = 0; x < 512; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }

  ctx.fillStyle = '#0077FE';
  ctx.font = 'bold 64px "Segoe UI", monospace';
  ctx.fillText('650', 40, 105);
  ctx.font = '22px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('KM / H', 180, 100);

  ctx.fillStyle = '#22c55e';
  ctx.fillText('● E-SPHERE X AUTONOMOUS AI NAV · NOMINAL (2055)', 40, 150);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '17px monospace';
  ctx.fillText('MAGLEV GAP: 120 MM | QUANTUM FLUX: 2.1 TESLA', 40, 185);
  ctx.fillText('SMART CITY AUTONOMOUS GRID · ZERO-COLLISION LOCK', 40, 215);

  ctx.strokeStyle = '#0077FE';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(420, 128, 70, Math.PI * 0.7, Math.PI * 1.8);
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}

function createArWindowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, 512, 256);

  // Holographic AR Flight Diagnostics HUD (Year 2055)
  ctx.strokeStyle = 'rgba(0, 119, 254, 0.45)';
  ctx.lineWidth = 1.5;

  // Bracket Corners
  ctx.strokeRect(30, 30, 452, 196);

  ctx.fillStyle = '#0077FE';
  ctx.font = 'bold 22px monospace';
  ctx.fillText('E-SPHERE RAIL X · AR SMART WINDOW HUD · 2055', 50, 68);

  ctx.font = '16px monospace';
  ctx.fillStyle = '#93c5fd';
  ctx.fillText('ALT: 120M · AIR GAP: 120MM · SMART GRID SYNC 100%', 50, 100);
  ctx.fillText('PATH: METROPOLIS ALPHA ⟷ CENTRAL NEXUS', 50, 130);

  // Reticle
  ctx.strokeStyle = '#0077FE';
  ctx.beginPath();
  ctx.arc(410, 130, 40, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(395, 130);
  ctx.lineTo(425, 130);
  ctx.moveTo(410, 115);
  ctx.lineTo(410, 145);
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}

function createPassengerDisplayTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#020914';
  ctx.fillRect(0, 0, 512, 128);

  ctx.fillStyle = '#0077FE';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText('E-SPHERE RAIL X', 24, 46);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '22px sans-serif';
  ctx.fillText('NEXT DESTINATION: METROPOLIS CENTRAL HUB (2 MIN)', 24, 80);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '18px monospace';
  ctx.fillText('SPEED: 650 KM/H · AIR GAP: 12.0 CM · YEAR 2055', 24, 110);

  return new THREE.CanvasTexture(canvas);
}

// ---------------------------------------------------------------------------
// PROCEDURAL GEOMETRY BUILDERS
// ---------------------------------------------------------------------------

function getFuselageCrossSection(phi: number): { x: number; y: number } {
  const cosP = Math.cos(phi);
  const sinP = Math.sin(phi);

  const yCenter = 2.24;
  const halfHeight = 1.64;
  const halfWidth = 1.62;

  const signSin = Math.sign(sinP) || 1;
  const absSin = Math.abs(sinP);

  // Soft organic tumblehome shoulder (upper curvature) and aerodynamic skirt tuck (lower curvature)
  const shoulderCurvature = cosP > 0.35 ? (1.0 - Math.pow(cosP - 0.35, 1.4) * 0.16) : 1.0;
  const skirtCurvature = cosP < -0.35 ? (1.0 - Math.pow(Math.abs(cosP + 0.35), 1.4) * 0.14) : 1.0;

  // Sculpted aerodynamic side channel waist indentation
  const waistScallop = Math.abs(cosP) < 0.28 ? (1.0 - (1.0 - Math.abs(cosP) / 0.28) * 0.038) : 1.0;

  // Increased body curvature with smooth exponent 0.80 (softer & more organic than 0.88)
  const x = signSin * Math.pow(absSin, 0.80) * halfWidth * shoulderCurvature * skirtCurvature * waistScallop;

  let y = yCenter + cosP * halfHeight;
  if (cosP < 0) {
    y += Math.pow(Math.abs(cosP), 2) * 0.06;
  }
  return { x, y };
}

function createParametricNoseBufferGeometry(
  length: number,
  isTail: boolean,
  mode: 'hull' | 'glass' | 'spoiler'
): THREE.BufferGeometry {
  const geom = new THREE.BufferGeometry();
  const zSlices = 64;
  const radialSlices = 76;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const grid: number[][] = [];

  for (let i = 0; i <= zSlices; i++) {
    const u = i / zSlices;
    grid[i] = [];

    // REFINED AERODYNAMIC MAGLEV PROFILE (NEITHER TOO SHARP NOR TOO ROUND)
    // - 35% bulb volume reduction via progressive parabolic aerodynamic taper
    // - Gentle aerodynamic point with soft rounded edges (no sharp needle, no spherical bulb)
    // - Continuous smooth curvature blending directly into the train fuselage
    // - Grounded lower skirt eliminates submarine/torpedo appearance
    const cosT = Math.cos(u * Math.PI * 0.5);
    const wFactor = Math.pow(cosT, 0.38) * 0.82 + Math.sqrt(Math.max(0, 1.0 - u * u)) * 0.18;

    // Roof & upper canopy sweeps gently down along the windshield slope
    const hTop = Math.pow(cosT, 0.40) * 0.80 + Math.sqrt(Math.max(0, 1.0 - u * u)) * 0.20;
    // Lower skirt stays grounded and level above the guideway track
    const hBot = Math.pow(cosT, 0.28) * 0.86 + Math.sqrt(Math.max(0, 1.0 - u * u)) * 0.14;

    // Gentle aerodynamic centerline descent: front nose tip converges at proud Y ~ 1.46m
    const yCenter = 2.24 - Math.pow(u, 1.68) * 0.78;

    for (let j = 0; j <= radialSlices; j++) {
      const phi = (j / radialSlices) * Math.PI * 2;
      const pt = getFuselageCrossSection(phi);

      const hFactor = pt.y >= 2.24 ? hTop : hBot;
      let x = pt.x * wFactor;
      let y = yCenter + (pt.y - 2.24) * hFactor;
      const z = isTail ? -u * length : u * length;

      if (mode === 'glass') {
        // Completely flush integrated smart glass; microscopic 3mm offset prevents WebGL z-fighting
        x *= 1.002;
        y += 0.003;
      } else if (mode === 'spoiler') {
        if (Math.cos(phi) < -0.38) {
          y -= 0.012;
        }
      }

      positions.push(x, y, z);
      uvs.push(j / radialSlices, u);
      grid[i][j] = i * (radialSlices + 1) + j;
    }
  }

  for (let i = 0; i < zSlices; i++) {
    const uMid = (i + 0.5) / zSlices;
    for (let j = 0; j < radialSlices; j++) {
      const phiMid = ((j + 0.5) / radialSlices) * Math.PI * 2;
      const cosP = Math.cos(phiMid);

      // Expansive Panoramic Smart-Glass Windshield (Seamlessly Blended into Nose):
      // - Seamlessly starts at carriage roof seam (uMid = 0.0) with zero gap or step
      // - Extends down 75% of the aerodynamic nose forehead (uMid <= 0.75) for a larger glass area
      // - Wraps 205 deg deep across the upper canopy and side cockpit windows (cosP > -0.08)
      // - Completely flush with the aerodynamic shell for continuous specular reflections
      const isCockpitRegion = uMid >= 0.0 && uMid <= 0.75 && cosP > -0.08;
      // Lower aerodynamic front chin spoiler / intake scoop
      const isSpoilerRegion = uMid >= 0.52 && uMid <= 0.98 && cosP < -0.38;

      let includeQuad = false;
      if (mode === 'glass') {
        includeQuad = isCockpitRegion;
      } else if (mode === 'spoiler') {
        includeQuad = isSpoilerRegion;
      } else {
        includeQuad = !isCockpitRegion && !isSpoilerRegion;
      }

      if (includeQuad) {
        const a = grid[i][j];
        const b = grid[i + 1][j];
        const c = grid[i + 1][j + 1];
        const d = grid[i][j + 1];

        if (isTail) {
          indices.push(a, c, b);
          indices.push(a, d, c);
        } else {
          indices.push(a, b, c);
          indices.push(a, c, d);
        }
      }
    }
  }

  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();

  return geom;
}

function createCarriageCrossSectionShape(): THREE.Shape {
  const shape = new THREE.Shape();
  const numPts = 80;
  for (let i = 0; i <= numPts; i++) {
    const phi = (i / numPts) * Math.PI * 2;
    const pt = getFuselageCrossSection(phi);
    if (i === 0) {
      shape.moveTo(pt.x, pt.y);
    } else {
      shape.lineTo(pt.x, pt.y);
    }
  }
  return shape;
}

function createMaglevEnergyParticles(totalLength: number): {
  points: THREE.Points;
  update: (dt: number, speedMps: number) => void;
} {
  const particleCount = 380;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const speeds = new Float32Array(particleCount);

  const colElectricBlue = new THREE.Color('#0077FE');
  const colBrightBlue = new THREE.Color('#00D2FF');
  const colSilverWhite = new THREE.Color('#D8DEE9');

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 3.0;
    positions[i * 3 + 1] = 0.51 + Math.random() * 0.08;
    positions[i * 3 + 2] = (Math.random() - 0.5) * (totalLength * 1.05);

    const c = Math.random() < 0.65 ? colElectricBlue : Math.random() < 0.88 ? colBrightBlue : colSilverWhite;
    colors[i * 3 + 0] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;

    speeds[i] = 0.85 + Math.random() * 0.55;
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.3, 'rgba(0,119,254,0.92)');
  grad.addColorStop(0.7, 'rgba(0,210,255,0.35)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  const pTexture = new THREE.CanvasTexture(canvas);

  const mat = new THREE.PointsMaterial({
    size: 0.36,
    map: pTexture,
    transparent: true,
    opacity: 0.94,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const points = new THREE.Points(geom, mat);
  points.name = 'Maglev_Energy_Particles';

  const update = (dt: number, speedMps: number) => {
    const pos = geom.attributes.position.array as Float32Array;
    const halfLen = totalLength * 0.55;
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3 + 2] -= speedMps * dt * 0.35 * speeds[i];
      if (pos[i * 3 + 2] < -halfLen) {
        pos[i * 3 + 2] = halfLen;
        pos[i * 3 + 0] = (Math.random() - 0.5) * 3.0;
      }
    }
    geom.attributes.position.needsUpdate = true;
  };

  return { points, update };
}

// ---------------------------------------------------------------------------
// MAIN MODEL FACTORY
// ---------------------------------------------------------------------------

export function createESphereRailModel(options: ESphereRailOptions = {}): THREE.Group {
  const root = new THREE.Group();
  root.name = 'ESphereAI_Maglev_MasterRoot';

  const defaultScale = options.scale ?? 0.1;
  root.scale.setScalar(defaultScale);

  const castShadow = options.castShadow ?? true;
  const receiveShadow = options.receiveShadow ?? true;
  const wireframe = !!options.wireframe;

  const animatedHolograms: THREE.Group[] = [];
  const animatedAiCores: THREE.Group[] = [];
  const animatedMagneticFluxRings: THREE.Mesh[] = [];
  const animatedEmblems: THREE.Group[] = [];

  // -------------------------------------------------------------------------
  // MATERIALS RIG
  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // MATERIALS RIG (E-SPHERE RAIL X: 2055 TITANIUM GRAY BODY, METALLIC SILVER ACCENTS, ELECTRIC BLUE)
  // -------------------------------------------------------------------------

  // Aerospace Titanium Gray Body (Flagship 2055 E-Sphere X finish)
  const titaniumGrayMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#3A414E'),
    metalness: 0.90,
    roughness: 0.14,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    reflectivity: 0.98,
    sheen: 0.85,
    sheenColor: new THREE.Color('#4E5868'),
    sheenRoughness: 0.10,
    wireframe,
  });

  // Liquid Metallic Silver physical clearcoat for accents and aero strakes
  const metallicSilverMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#D8DEE8'),
    metalness: 0.94,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    reflectivity: 1.0,
    sheen: 0.95,
    sheenColor: new THREE.Color('#F0F4F8'),
    wireframe,
  });

  // Flagship 2055 body mapping: Primary hull is Titanium Gray, accents are Metallic Silver
  const pearlWhiteMaterial = titaniumGrayMaterial;
  const sapphireBlueMaterial = metallicSilverMaterial;

  const darkAeroMaterial = new THREE.MeshStandardMaterial({
    color: 0x0c111a,
    metalness: 0.92,
    roughness: 0.20,
    wireframe,
  });

  const guidewayConcreteMaterial = new THREE.MeshStandardMaterial({
    color: 0x222733,
    metalness: 0.40,
    roughness: 0.28,
    wireframe,
  });

  const panoramicGlassMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0A2540'),
    transmission: 0.82,
    opacity: 0.45,
    transparent: true,
    roughness: 0.012,
    metalness: 0.15,
    ior: 1.56,
    thickness: 0.15,
    attenuationColor: new THREE.Color('#0077FE'),
    attenuationDistance: 1.2,
    specularIntensity: 1.0,
    specularColor: new THREE.Color('#38BDF8'),
    depthWrite: false,
    side: THREE.DoubleSide,
    wireframe,
  });

  const smartPartitionGlass = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0E2A47'),
    transmission: 0.85,
    opacity: 0.38,
    transparent: true,
    roughness: 0.015,
    metalness: 0.10,
    ior: 1.54,
    clearcoat: 1.0,
    depthWrite: false,
    side: THREE.DoubleSide,
    wireframe,
  });

  const darkBlueSmartGlassMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#06182e'),
    transmission: 0.78,
    opacity: 0.88,
    transparent: true,
    roughness: 0.01,
    metalness: 0.22,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    ior: 1.60,
    thickness: 0.24,
    attenuationColor: new THREE.Color('#0077FE'),
    attenuationDistance: 0.8,
    specularIntensity: 1.0,
    specularColor: new THREE.Color('#38BDF8'),
    depthWrite: false,
    side: THREE.DoubleSide,
    wireframe,
  });

  // Vibrant Electric Blue LED lighting
  const electricBlueLedMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0077FE'),
    emissive: new THREE.Color('#0077FE'),
    emissiveIntensity: 5.4,
    roughness: 0.08,
    metalness: 0.15,
    toneMapped: false,
  });
  const cyanLedMaterial = electricBlueLedMaterial;

  const statorCoilMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#142A4A'),
    emissive: new THREE.Color('#0077FE'),
    emissiveIntensity: 3.0,
    roughness: 0.18,
    metalness: 0.85,
    toneMapped: false,
  });

  const redLedMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FF2A4D'),
    emissive: new THREE.Color('#FF1744'),
    emissiveIntensity: 4.4,
    roughness: 0.1,
    metalness: 0.1,
    toneMapped: false,
  });

  const interiorGlowMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0A2540'),
    emissive: new THREE.Color('#0077FE'),
    emissiveIntensity: 2.8,
    roughness: 0.2,
  });

  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.98,
    roughness: 0.04,
    wireframe,
  });

  const titaniumMaterial = new THREE.MeshStandardMaterial({
    color: 0x383F4D,
    metalness: 0.88,
    roughness: 0.20,
    wireframe,
  });

  const leatherIvory = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.40,
    metalness: 0.05,
    wireframe,
  });

  const leatherSapphire = new THREE.MeshStandardMaterial({
    color: 0x1e40af,
    roughness: 0.36,
    metalness: 0.12,
    wireframe,
  });

  const plantLeafDark = new THREE.MeshStandardMaterial({
    color: 0x15803d,
    roughness: 0.45,
    metalness: 0.04,
    side: THREE.DoubleSide,
  });

  const plantLeafLight = new THREE.MeshStandardMaterial({
    color: 0x22c55e,
    roughness: 0.40,
    metalness: 0.04,
    side: THREE.DoubleSide,
  });

  const hologramWireMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.78,
  });

  const hologramGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.48,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });

  const passengerAttireDark = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.65,
    metalness: 0.1,
  });

  const passengerAttireCyan = new THREE.MeshStandardMaterial({
    color: 0x0369a1,
    roughness: 0.55,
    metalness: 0.15,
  });

  const passengerSkinMaterial = new THREE.MeshStandardMaterial({
    color: 0xfbd0b5,
    roughness: 0.7,
    metalness: 0.0,
  });

  // Textures
  const solarTexture = createSolarSpineTexture();
  const solarMaterial = new THREE.MeshStandardMaterial({
    map: solarTexture,
    metalness: 0.85,
    roughness: 0.15,
  });

  const logoTexture = createLogoBadgeTexture();
  const logoMaterial = new THREE.MeshBasicMaterial({
    map: logoTexture,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const cockpitDisplayTexture = createCockpitDisplayTexture();
  const cockpitDisplayMaterial = new THREE.MeshBasicMaterial({
    map: cockpitDisplayTexture,
  });

  const arWindowTexture = createArWindowTexture();
  const arWindowMaterial = new THREE.MeshBasicMaterial({
    map: arWindowTexture,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });

  const passengerDisplayTexture = createPassengerDisplayTexture();
  const passengerDisplayMaterial = new THREE.MeshBasicMaterial({
    map: passengerDisplayTexture,
    side: THREE.DoubleSide,
  });

  // Dimensions (3-Car Flagship Consist: Front Control Car, Passenger/VIP Car, Rear Car)
  const NUM_CARS = 3;
  const NOSE_LENGTH = 7.30; // Extended forward by 15% with gentle aerodynamic point
  const CAR_LENGTH = 18.2;
  const GANGWAY_LENGTH = 0.5;
  const TOTAL_PITCH = CAR_LENGTH + GANGWAY_LENGTH;
  const TRAIN_TOTAL_SPAN = (NUM_CARS - 1) * TOTAL_PITCH + CAR_LENGTH + NOSE_LENGTH * 2; // 70.20m
  const TRAIN_START_Z = (TRAIN_TOTAL_SPAN / 2) - NOSE_LENGTH - (CAR_LENGTH / 2); // 18.7m

  const namedNodes: Record<string, THREE.Object3D> = {};

  // -------------------------------------------------------------------------
  // 1. ELEVATED ILLUMINATED MAGLEV GUIDEWAY WITH FUTURISTIC Y-PYLONS
  // -------------------------------------------------------------------------

  function createFuturisticMaglevGuideway(spanLength: number): THREE.Group {
    const guideway = new THREE.Group();
    guideway.name = 'Illuminated_Maglev_Guideway';

    const beamGeom = new RoundedBoxGeometry(3.6, 0.42, spanLength, 3, 0.06);
    const beam = new THREE.Mesh(beamGeom, guidewayConcreteMaterial);
    beam.position.set(0, 0.29, 0);
    beam.castShadow = castShadow;
    beam.receiveShadow = receiveShadow;
    guideway.add(beam);

    [-1.75, 1.75].forEach((gx) => {
      const underGlow = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.02, spanLength),
        cyanLedMaterial
      );
      underGlow.position.set(gx, 0.08, 0);
      guideway.add(underGlow);
    });

    const energySlot = new THREE.Mesh(
      new THREE.BoxGeometry(0.44, 0.025, spanLength),
      new THREE.MeshStandardMaterial({ color: 0x071b30, roughness: 0.3 })
    );
    energySlot.position.set(0, 0.505, 0);
    guideway.add(energySlot);

    const energyRibbon = new THREE.Mesh(
      new THREE.BoxGeometry(0.20, 0.03, spanLength),
      cyanLedMaterial
    );
    energyRibbon.position.set(0, 0.51, 0);
    guideway.add(energyRibbon);

    [-1.88, 1.88].forEach((wallX) => {
      const wallGeom = new RoundedBoxGeometry(0.24, 0.68, spanLength, 3, 0.03);
      const wall = new THREE.Mesh(wallGeom, guidewayConcreteMaterial);
      wall.position.set(wallX, 0.73, 0);
      wall.castShadow = castShadow;
      wall.receiveShadow = receiveShadow;
      guideway.add(wall);

      const statorGeom = new THREE.BoxGeometry(0.04, 0.34, spanLength);
      const stator = new THREE.Mesh(statorGeom, statorCoilMaterial);
      stator.position.set(wallX + (wallX > 0 ? -0.11 : 0.11), 0.76, 0);
      guideway.add(stator);

      const edgeStrip = new THREE.Mesh(
        new THREE.BoxGeometry(0.035, 0.025, spanLength),
        cyanLedMaterial
      );
      edgeStrip.position.set(wallX + (wallX > 0 ? -0.10 : 0.10), 1.07, 0);
      guideway.add(edgeStrip);
    });

    const pylonSpacing = 20.0; // Evenly spaced sculptural Y-pylons every 20m
    const numPylons = Math.floor(spanLength / pylonSpacing);
    for (let p = -numPylons / 2; p <= numPylons / 2; p++) {
      const pz = p * pylonSpacing;
      const pylonGroup = new THREE.Group();
      pylonGroup.position.set(0, 0, pz);

      const mainCol = new THREE.Mesh(
        new THREE.CylinderGeometry(0.9, 1.35, 3.4, 20),
        guidewayConcreteMaterial
      );
      mainCol.position.set(0, -1.6, 0);
      mainCol.castShadow = castShadow;
      mainCol.receiveShadow = receiveShadow;
      pylonGroup.add(mainCol);

      const flareHead = new THREE.Mesh(
        new RoundedBoxGeometry(2.8, 0.45, 1.8, 3, 0.06),
        guidewayConcreteMaterial
      );
      flareHead.position.set(0, 0.05, 0);
      pylonGroup.add(flareHead);

      [0.91, -0.91].forEach((faceZ) => {
        const pylonLed = new THREE.Mesh(
          new THREE.BoxGeometry(0.04, 3.2, 0.02),
          cyanLedMaterial
        );
        pylonLed.position.set(0, -1.5, faceZ);
        pylonGroup.add(pylonLed);
      });

      guideway.add(pylonGroup);
    }

    return guideway;
  }

  // 120m elevated guideway viaduct calibrated for the 81.6m 3-car consist
  const GUIDEWAY_SPAN = TRAIN_TOTAL_SPAN + 38.4; // 120.0m
  const guidewayStructure = createFuturisticMaglevGuideway(GUIDEWAY_SPAN);
  root.add(guidewayStructure);

  const energyParticles = createMaglevEnergyParticles(TRAIN_TOTAL_SPAN);
  root.add(energyParticles.points);

  // -------------------------------------------------------------------------
  // 2. MAGLEV LEVITATION SYSTEM WITH VISIBLE PLASMA ENERGY RINGS
  // -------------------------------------------------------------------------

  function createCarriageLevitationSystem(): THREE.Group {
    const levGroup = new THREE.Group();
    levGroup.name = 'Electromagnetic_Levitation_System';

    [-CAR_LENGTH * 0.32, CAR_LENGTH * 0.32].forEach((podZ) => {
      [-1.35, 1.35].forEach((podX) => {
        const pod = new THREE.Group();
        pod.position.set(podX, 0.72, podZ);

        const cryostat = new THREE.Mesh(
          new RoundedBoxGeometry(0.36, 0.22, 4.4, 3, 0.03),
          titaniumMaterial
        );
        pod.add(cryostat);

        const coilMesh = new THREE.Mesh(
          new RoundedBoxGeometry(0.28, 0.05, 4.2, 2, 0.015),
          statorCoilMaterial
        );
        coilMesh.position.set(0, -0.11, 0);
        pod.add(coilMesh);

        const fluxStrip = new THREE.Mesh(
          new THREE.BoxGeometry(0.06, 0.02, 4.0),
          cyanLedMaterial
        );
        fluxStrip.position.set(0, -0.13, 0);
        pod.add(fluxStrip);

        // Visible Magnetic Field Effects: Concentric expanding flux field rings
        const fluxRingRadii = [0.36, 0.58, 0.82];
        fluxRingRadii.forEach((r, rIdx) => {
          const mRing = new THREE.Mesh(
            new THREE.TorusGeometry(r, 0.016 - rIdx * 0.003, 10, 32),
            electricBlueLedMaterial
          );
          mRing.rotateX(Math.PI / 2);
          mRing.position.set(0, -0.14 - rIdx * 0.012, 0);
          pod.add(mRing);
          animatedMagneticFluxRings.push(mRing);
        });

        // Semi-transparent magnetic plasma induction disc
        const plasmaDisc = new THREE.Mesh(
          new THREE.RingGeometry(0.2, 0.78, 32),
          new THREE.MeshBasicMaterial({
            color: 0x0077fe,
            transparent: true,
            opacity: 0.32,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        plasmaDisc.rotateX(Math.PI / 2);
        plasmaDisc.position.set(0, -0.155, 0);
        pod.add(plasmaDisc);

        const guidanceShoe = new THREE.Mesh(
          new RoundedBoxGeometry(0.06, 0.16, 3.8, 2, 0.02),
          sapphireBlueMaterial
        );
        guidanceShoe.position.set(podX > 0 ? 0.20 : -0.20, 0.04, 0);
        pod.add(guidanceShoe);

        levGroup.add(pod);
      });
    });

    const statorTrack = new THREE.Mesh(
      new RoundedBoxGeometry(0.72, 0.06, CAR_LENGTH * 0.94, 2, 0.02),
      darkAeroMaterial
    );
    statorTrack.position.set(0, 0.68, 0);
    levGroup.add(statorTrack);

    return levGroup;
  }

  // -------------------------------------------------------------------------
  // 3. SEAMLESS INTER-CAR FLUSH OUTER COWLING (Hides all connections)
  // -------------------------------------------------------------------------

  function createFlushInterCarCowling(): THREE.Group {
    const cowlGroup = new THREE.Group();
    cowlGroup.name = 'Flush_InterCar_Aerodynamic_Cowling';

    const cowlGeom = new THREE.ExtrudeGeometry(createCarriageCrossSectionShape(), {
      depth: GANGWAY_LENGTH,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    });
    cowlGeom.translate(0, 0, -GANGWAY_LENGTH / 2);

    const cowlMesh = new THREE.Mesh(cowlGeom, pearlWhiteMaterial);
    cowlGroup.add(cowlMesh);

    [-1.61, 1.61].forEach((sideX) => {
      const stripe = new THREE.Mesh(
        new RoundedBoxGeometry(0.04, 0.32, GANGWAY_LENGTH, 2, 0.015),
        sapphireBlueMaterial
      );
      stripe.position.set(sideX, 1.62, 0);
      cowlGroup.add(stripe);

      const ledPinstripe = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.025, GANGWAY_LENGTH),
        cyanLedMaterial
      );
      ledPinstripe.position.set(sideX + (sideX > 0 ? 0.015 : -0.015), 1.45, 0);
      cowlGroup.add(ledPinstripe);
    });

    return cowlGroup;
  }

  // -------------------------------------------------------------------------
  // 4. AI QUANTUM NEUROMORPHIC CORE MODULE
  // -------------------------------------------------------------------------

  function createAiQuantumCoreModule(scale: number = 1.0): THREE.Group {
    const coreGroup = new THREE.Group();
    coreGroup.name = 'Quantum_AI_Core_Module';

    // Heatsink pedestal base with micro-channel cooling
    const basePuck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24 * scale, 0.28 * scale, 0.08 * scale, 24),
      titaniumMaterial
    );
    basePuck.position.y = 0.04 * scale;
    coreGroup.add(basePuck);

    // Glowing Cyan Core Orb
    const coreSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.12 * scale, 24, 24),
      cyanLedMaterial
    );
    coreSphere.position.y = 0.26 * scale;
    coreGroup.add(coreSphere);

    // Rotating Neuromorphic Gyro Rings
    const gyroAssembly = new THREE.Group();
    gyroAssembly.position.y = 0.26 * scale;

    const ringX = new THREE.Mesh(
      new THREE.TorusGeometry(0.18 * scale, 0.01 * scale, 8, 32),
      sapphireBlueMaterial
    );
    gyroAssembly.add(ringX);

    const ringY = new THREE.Mesh(
      new THREE.TorusGeometry(0.22 * scale, 0.008 * scale, 8, 32),
      chromeMaterial
    );
    ringY.rotation.x = Math.PI / 2;
    gyroAssembly.add(ringY);

    const fiberWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.26 * scale, 1),
      hologramWireMaterial
    );
    gyroAssembly.add(fiberWire);

    coreGroup.add(gyroAssembly);
    animatedAiCores.push(gyroAssembly);

    return coreGroup;
  }

  // -------------------------------------------------------------------------
  // 5. LUXURY INTERIOR COMPONENTS & HOLOGRAPHIC SYSTEMS
  // -------------------------------------------------------------------------

  function createHolographicProjector(scale: number = 1.0): THREE.Group {
    const holoGroup = new THREE.Group();
    holoGroup.name = 'Holographic_3D_Projection';

    const emitter = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12 * scale, 0.14 * scale, 0.025 * scale, 24),
      titaniumMaterial
    );
    emitter.position.y = 0.012 * scale;
    holoGroup.add(emitter);

    const emitterLens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08 * scale, 0.08 * scale, 0.008 * scale, 24),
      cyanLedMaterial
    );
    emitterLens.position.y = 0.025 * scale;
    holoGroup.add(emitterLens);

    const floatingHolo = new THREE.Group();
    floatingHolo.position.y = 0.38 * scale;

    const globe = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.18 * scale, 1),
      hologramWireMaterial
    );
    floatingHolo.add(globe);

    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(0.24 * scale, 0.008 * scale, 8, 32),
      hologramWireMaterial
    );
    ring1.rotation.x = Math.PI * 0.25;
    floatingHolo.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.28 * scale, 0.006 * scale, 8, 32),
      hologramGlowMaterial
    );
    ring2.rotation.y = Math.PI * 0.4;
    floatingHolo.add(ring2);

    const corePoint = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.05 * scale),
      cyanLedMaterial
    );
    floatingHolo.add(corePoint);

    holoGroup.add(floatingHolo);
    animatedHolograms.push(floatingHolo);

    return holoGroup;
  }

  function createPottedPlant(): THREE.Group {
    const plantGroup = new THREE.Group();
    plantGroup.name = 'Biophilic_Potted_Plant';

    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.12, 0.42, 20),
      pearlWhiteMaterial
    );
    pot.position.y = 0.21;
    pot.castShadow = castShadow;
    plantGroup.add(pot);

    const collar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.17, 0.17, 0.03, 20),
      chromeMaterial
    );
    collar.position.y = 0.42;
    plantGroup.add(collar);

    const soil = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.15, 0.02, 16),
      darkAeroMaterial
    );
    soil.position.y = 0.41;
    plantGroup.add(soil);

    const numLeaves = 8;
    for (let l = 0; l < numLeaves; l++) {
      const angle = (l / numLeaves) * Math.PI * 2;
      const leafStem = new THREE.Group();
      leafStem.position.set(0, 0.42, 0);
      leafStem.rotation.y = angle;
      leafStem.rotation.z = 0.35 + (l % 3) * 0.12;

      const leafGeom = new THREE.SphereGeometry(0.18, 12, 8, 0, Math.PI, 0, Math.PI * 0.5);
      leafGeom.scale(0.35, 1.4, 0.08);
      const leafMesh = new THREE.Mesh(leafGeom, l % 2 === 0 ? plantLeafDark : plantLeafLight);
      leafMesh.position.set(0, 0.22, 0);
      leafMesh.rotation.x = 0.4;
      leafStem.add(leafMesh);

      plantGroup.add(leafStem);
    }

    return plantGroup;
  }

  function createSmartPartition(width: number = 1.12): THREE.Group {
    const partGroup = new THREE.Group();
    partGroup.name = 'Transparent_Smart_Partition';
    const partH = 2.58;

    const frame = new THREE.Mesh(
      new RoundedBoxGeometry(0.04, partH, width, 2, 0.015),
      pearlWhiteMaterial
    );
    frame.position.y = partH / 2;
    partGroup.add(frame);

    const glass = new THREE.Mesh(
      new THREE.BoxGeometry(0.015, partH * 0.94, width * 0.92),
      smartPartitionGlass
    );
    glass.position.y = partH / 2;
    partGroup.add(glass);

    const neonEdge = new THREE.Mesh(
      new THREE.BoxGeometry(0.025, partH * 0.92, 0.02),
      cyanLedMaterial
    );
    neonEdge.position.set(0, partH / 2, width * 0.45);
    partGroup.add(neonEdge);

    return partGroup;
  }

  function createPassengerFigure(isCyanAttire: boolean = false): THREE.Group {
    const person = new THREE.Group();
    person.name = 'Passenger_Figure';

    const attire = isCyanAttire ? passengerAttireCyan : passengerAttireDark;

    const torso = new THREE.Mesh(new RoundedBoxGeometry(0.36, 0.42, 0.22, 2, 0.04), attire);
    torso.position.set(0, 0.58, -0.06);
    torso.rotation.x = -0.1;
    person.add(torso);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.10, 16, 16), passengerSkinMaterial);
    head.position.set(0, 0.88, -0.08);
    person.add(head);

    const hair = new THREE.Mesh(
      new THREE.SphereGeometry(0.105, 14, 12, 0, Math.PI * 2, 0, Math.PI * 0.55),
      darkAeroMaterial
    );
    hair.position.set(0, 0.91, -0.08);
    person.add(hair);

    const legs = new THREE.Mesh(new RoundedBoxGeometry(0.34, 0.14, 0.38, 2, 0.03), attire);
    legs.position.set(0, 0.35, 0.08);
    person.add(legs);

    return person;
  }

  function createSupportColumn(): THREE.Group {
    const colGroup = new THREE.Group();
    colGroup.name = 'Futuristic_Support_Column';
    const colH = 2.62;

    const pillarGeom = new THREE.CylinderGeometry(0.04, 0.04, colH, 16);
    pillarGeom.scale(0.85, 1.0, 1.35);
    const pillar = new THREE.Mesh(pillarGeom, pearlWhiteMaterial);
    pillar.position.y = colH / 2;
    pillar.castShadow = castShadow;
    colGroup.add(pillar);

    const ledGeom = new THREE.BoxGeometry(0.015, colH * 0.94, 0.025);
    const led = new THREE.Mesh(ledGeom, cyanLedMaterial);
    led.position.set(0, colH / 2, 0.052);
    colGroup.add(led);

    [-colH / 2 + 0.03, colH / 2 - 0.03].forEach((cy) => {
      const collar = new THREE.Mesh(new RoundedBoxGeometry(0.12, 0.05, 0.16, 2, 0.015), chromeMaterial);
      collar.position.y = colH / 2 + cy;
      colGroup.add(collar);
    });

    return colGroup;
  }

  // Biometric Smart Seat with Health-Status Vitals Indicator
  function createPassengerSeatPair(): THREE.Group {
    const pair = new THREE.Group();
    [0, 0.54].forEach((xOff) => {
      const seat = new THREE.Group();
      seat.position.x = xOff;

      const shell = new THREE.Mesh(new RoundedBoxGeometry(0.48, 0.64, 0.08, 3, 0.03), pearlWhiteMaterial);
      shell.position.set(0, 0.65, -0.18);
      shell.rotation.x = -0.12;
      seat.add(shell);

      const cushion = new THREE.Mesh(new RoundedBoxGeometry(0.46, 0.12, 0.44, 3, 0.03), leatherIvory);
      cushion.position.set(0, 0.32, 0);
      seat.add(cushion);

      const backrest = new THREE.Mesh(new RoundedBoxGeometry(0.44, 0.58, 0.08, 3, 0.025), leatherIvory);
      backrest.position.set(0, 0.65, -0.14);
      backrest.rotation.x = -0.12;
      seat.add(backrest);

      const headrest = new THREE.Mesh(new RoundedBoxGeometry(0.36, 0.18, 0.12, 3, 0.03), leatherSapphire);
      headrest.position.set(0, 1.02, -0.22);
      headrest.rotation.x = -0.12;
      seat.add(headrest);

      // Biometric Health-Status Vital Sensor Pip (Glowing Cyan Micro-LED)
      const vitalPip = new THREE.Mesh(
        new THREE.SphereGeometry(0.015, 12, 12),
        cyanLedMaterial
      );
      vitalPip.position.set(0.15, 1.08, -0.18);
      seat.add(vitalPip);

      const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.28, 12), chromeMaterial);
      pedestal.position.set(0, 0.14, 0);
      seat.add(pedestal);

      const underGlow = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.015, 0.38),
        cyanLedMaterial
      );
      underGlow.position.set(0, 0.06, 0);
      seat.add(underGlow);

      pair.add(seat);
    });
    return pair;
  }

  function createConferenceTable(): THREE.Group {
    const table = new THREE.Group();
    const top = new THREE.Mesh(new RoundedBoxGeometry(0.72, 0.035, 0.88, 3, 0.02), pearlWhiteMaterial);
    top.position.y = 0.55;
    table.add(top);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.01, 12, 24), cyanLedMaterial);
    ring.rotateX(Math.PI / 2);
    ring.position.y = 0.57;
    table.add(ring);

    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.52, 16), chromeMaterial);
    leg.position.y = 0.26;
    table.add(leg);

    // Floating 3D Holographic Route Projection with AI Assistant Orb
    const tableHolo = createHolographicProjector(0.75);
    tableHolo.position.set(0, 0.57, 0);
    table.add(tableHolo);

    return table;
  }

  function createVipLoungeSuite(): THREE.Group {
    const lounge = new THREE.Group();
    lounge.name = 'VIP_Observation_Lounge';

    const sofaArc = new THREE.Mesh(
      new THREE.CylinderGeometry(1.42, 1.42, 0.44, 32, 1, false, 0, Math.PI),
      leatherIvory
    );
    sofaArc.position.set(0, 0.22, 0);
    lounge.add(sofaArc);

    const backArc = new THREE.Mesh(
      new THREE.CylinderGeometry(1.48, 1.48, 0.52, 32, 1, true, 0, Math.PI),
      leatherSapphire
    );
    backArc.position.set(0, 0.65, 0);
    lounge.add(backArc);

    const sofaUnderGlow = new THREE.Mesh(
      new THREE.CylinderGeometry(1.36, 1.36, 0.02, 32, 1, false, 0, Math.PI),
      cyanLedMaterial
    );
    sofaUnderGlow.position.set(0, 0.02, 0);
    lounge.add(sofaUnderGlow);

    const coffeeTable = new THREE.Mesh(new RoundedBoxGeometry(0.96, 0.04, 0.65, 3, 0.02), pearlWhiteMaterial);
    coffeeTable.position.set(0, 0.48, 0.62);
    lounge.add(coffeeTable);

    const haloRing = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.015, 12, 32), cyanLedMaterial);
    haloRing.rotateX(Math.PI / 2);
    haloRing.position.set(0, 0.46, 0.62);
    lounge.add(haloRing);

    const centerHolo = createHolographicProjector(1.1);
    centerHolo.position.set(0, 0.50, 0.62);
    lounge.add(centerHolo);

    // Visible Quantum AI Core in VIP Lounge
    const vipAiCore = createAiQuantumCoreModule(0.8);
    vipAiCore.position.set(0, 0.48, -0.6);
    lounge.add(vipAiCore);

    const guest1 = createPassengerFigure(true);
    guest1.position.set(-0.65, 0.22, 0.35);
    guest1.rotation.y = 0.6;
    lounge.add(guest1);

    const guest2 = createPassengerFigure(false);
    guest2.position.set(0.65, 0.22, 0.35);
    guest2.rotation.y = -0.6;
    lounge.add(guest2);

    const plantL = createPottedPlant();
    plantL.position.set(-1.18, 0.0, -0.45);
    lounge.add(plantL);

    const plantR = createPottedPlant();
    plantR.position.set(1.18, 0.0, -0.45);
    lounge.add(plantR);

    const barCredenza = new THREE.Mesh(
      new RoundedBoxGeometry(1.6, 0.85, 0.32, 2, 0.03),
      pearlWhiteMaterial
    );
    barCredenza.position.set(0, 0.42, -1.25);
    lounge.add(barCredenza);

    const barTop = new THREE.Mesh(
      new RoundedBoxGeometry(1.64, 0.04, 0.36, 2, 0.02),
      sapphireBlueMaterial
    );
    barTop.position.set(0, 0.86, -1.25);
    lounge.add(barTop);

    const barGlow = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.02, 0.02),
      cyanLedMaterial
    );
    barGlow.position.set(0, 0.83, -1.08);
    lounge.add(barGlow);

    return lounge;
  }

  // Autonomous Pilot Flight Control Center with AI Quantum Core
  function createCockpitAssembly(): THREE.Group {
    const cockpit = new THREE.Group();
    cockpit.name = 'Cockpit_Autonomous_AICenter';

    const pilotSeat = createPassengerSeatPair();
    pilotSeat.position.set(-0.27, 0.98, 2.4);
    cockpit.add(pilotSeat);

    const pilotCaptain = createPassengerFigure(false);
    pilotCaptain.position.set(0, 0.98, 2.4);
    cockpit.add(pilotCaptain);

    // Visible Quantum AI Neuromorphic Core in Cockpit Flight Deck
    const aiCore = createAiQuantumCoreModule(0.9);
    aiCore.position.set(0, 1.34, 3.0);
    cockpit.add(aiCore);

    const dashHousing = new THREE.Mesh(new RoundedBoxGeometry(1.85, 0.40, 0.62, 3, 0.06), darkAeroMaterial);
    dashHousing.position.set(0, 1.36, 3.6);
    dashHousing.rotation.x = -0.16;
    cockpit.add(dashHousing);

    const displayPanel = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.34), cockpitDisplayMaterial);
    displayPanel.position.set(0, 1.42, 3.46);
    displayPanel.rotation.x = -0.16;
    cockpit.add(displayPanel);

    const hud = new THREE.Mesh(
      new THREE.PlaneGeometry(0.82, 0.42),
      hologramWireMaterial
    );
    hud.position.set(0, 1.74, 3.8);
    hud.rotation.x = -0.10;
    cockpit.add(hud);

    const cockpitHolo = createHolographicProjector(0.55);
    cockpitHolo.position.set(0, 1.50, 3.4);
    cockpit.add(cockpitHolo);

    return cockpit;
  }

  // -------------------------------------------------------------------------
  // 6. REFINED LUXURY AERODYNAMIC NOSE (7.30m GENTLE AERODYNAMIC POINT)
  // -------------------------------------------------------------------------

  function buildAerodynamicBulletNose(isLead: boolean): THREE.Group {
    const noseGroup = new THREE.Group();
    noseGroup.name = isLead ? 'LuxuryNose_Lead' : 'LuxuryNose_Tail';

    const hullGeom = createParametricNoseBufferGeometry(NOSE_LENGTH, !isLead, 'hull');
    const hullMesh = new THREE.Mesh(hullGeom, pearlWhiteMaterial);
    hullMesh.castShadow = castShadow;
    hullMesh.receiveShadow = receiveShadow;
    noseGroup.add(hullMesh);

    // Expansive Panoramic Cockpit Glass Canopy with Dark Blue Smart Glass (Integrated into Front Shell)
    const glassGeom = createParametricNoseBufferGeometry(NOSE_LENGTH, !isLead, 'glass');
    const glassMesh = new THREE.Mesh(glassGeom, darkBlueSmartGlassMaterial);
    noseGroup.add(glassMesh);

    const spoilerGeom = createParametricNoseBufferGeometry(NOSE_LENGTH, !isLead, 'spoiler');
    const spoilerMesh = new THREE.Mesh(spoilerGeom, sapphireBlueMaterial);
    noseGroup.add(spoilerMesh);

    const zSign = isLead ? 1 : -1;
    const ledMat = isLead ? cyanLedMaterial : redLedMaterial;

    // A. CONTINUOUS FRONT LED SIGNATURE (Wrap-around light blade across nose brow and fenders)
    const ledPoints: THREE.Vector3[] = [];
    const numSigSegments = 36;
    for (let s = 0; s <= numSigSegments; s++) {
      const t = (s / numSigSegments) * 2 - 1; // -1 to 1
      const bowTaper = Math.cos(t * Math.PI * 0.5);
      const sideX = t * 1.30 * Math.pow(bowTaper, 0.20);
      const zOffset = (0.65 + 0.22 * bowTaper) * NOSE_LENGTH;
      const yLevel = 1.38 + bowTaper * 0.16;
      ledPoints.push(new THREE.Vector3(sideX, yLevel, zSign * zOffset));
    }
    const ledCurve = new THREE.CatmullRomCurve3(ledPoints);
    const ledGeom = new THREE.TubeGeometry(ledCurve, 54, 0.035, 12, false);
    const ledMesh = new THREE.Mesh(ledGeom, ledMat);
    noseGroup.add(ledMesh);

    // Lower Front Chin Aerodynamic Splitter LED Accent
    const chinPoints: THREE.Vector3[] = [];
    for (let s = 0; s <= 24; s++) {
      const t = (s / 24) * 2 - 1;
      const bowTaper = Math.cos(t * Math.PI * 0.5);
      const sideX = t * 1.06 * Math.pow(bowTaper, 0.22);
      const zOffset = (0.86 + 0.10 * bowTaper) * NOSE_LENGTH;
      chinPoints.push(new THREE.Vector3(sideX, 0.76, zSign * zOffset));
    }
    const chinCurve = new THREE.CatmullRomCurve3(chinPoints);
    const chinTube = new THREE.Mesh(
      new THREE.TubeGeometry(chinCurve, 36, 0.022, 10, false),
      ledMat
    );
    noseGroup.add(chinTube);

    // B. INTEGRATED SOLID-STATE LIDAR STRIP (Flush horizontal scanning bar on front chin)
    const lidarHousing = new THREE.Mesh(
      new RoundedBoxGeometry(1.36, 0.065, 0.08, 3, 0.015),
      darkAeroMaterial
    );
    lidarHousing.position.set(0, 1.00, zSign * (NOSE_LENGTH * 0.90));
    lidarHousing.rotation.x = zSign * 0.24;
    noseGroup.add(lidarHousing);

    const lidarLaserBar = new THREE.Mesh(
      new THREE.BoxGeometry(1.30, 0.018, 0.02),
      cyanLedMaterial
    );
    lidarLaserBar.position.set(0, 1.00, zSign * (NOSE_LENGTH * 0.90 + (zSign > 0 ? 0.035 : -0.035)));
    lidarLaserBar.rotation.x = zSign * 0.24;
    noseGroup.add(lidarLaserBar);

    // C. HIDDEN SENSORS (Flush phased-array radar + micro-ultrasonic apertures + AI camera bar)
    const hiddenRadar = new THREE.Mesh(
      new RoundedBoxGeometry(0.56, 0.12, 0.04, 2, 0.01),
      sapphireBlueMaterial
    );
    hiddenRadar.position.set(0, 0.72, zSign * (NOSE_LENGTH * 0.86));
    hiddenRadar.rotation.x = zSign * 0.28;
    noseGroup.add(hiddenRadar);

    // Hidden Ultrasonic Proximity Sensors (4 flush apertures along front bumper)
    [-0.78, -0.38, 0.38, 0.78].forEach((sonarX) => {
      const sonarAperture = new THREE.Mesh(
        new THREE.CylinderGeometry(0.016, 0.016, 0.02, 12).rotateX(Math.PI / 2),
        darkAeroMaterial
      );
      const bowTaper = Math.cos((sonarX / 1.36) * Math.PI * 0.5);
      const sonarZ = zSign * ((0.84 * bowTaper + 0.12) * NOSE_LENGTH);
      sonarAperture.position.set(sonarX, 0.85, sonarZ);
      noseGroup.add(sonarAperture);
    });

    // Flush AI Vision Multi-Spectral Camera Bar above Windshield (Seamless with Roof)
    const sensorBar = new THREE.Mesh(
      new RoundedBoxGeometry(0.68, 0.065, 0.16, 2, 0.015),
      darkAeroMaterial
    );
    sensorBar.position.set(0, 3.82, zSign * (NOSE_LENGTH * 0.08));
    noseGroup.add(sensorBar);

    [-0.22, 0.22].forEach((lensX) => {
      const lens = new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 12), cyanLedMaterial);
      lens.position.set(lensX, 3.82, zSign * (NOSE_LENGTH * 0.08 + (zSign > 0 ? 0.075 : -0.075)));
      noseGroup.add(lens);
    });

    // D. ILLUMINATED E-SPHERE AI LOGO (Proud flush crest on sloped aerodynamic nose)
    const emblemGroup = new THREE.Group();
    emblemGroup.position.set(0, 1.50, zSign * (NOSE_LENGTH * 0.78));
    emblemGroup.rotation.x = zSign * 0.38;

    const emblemRing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 0.025, 32).rotateX(Math.PI / 2),
      chromeMaterial
    );
    emblemGroup.add(emblemRing);

    const emblemGlow = new THREE.Mesh(new THREE.RingGeometry(0.07, 0.155, 28), cyanLedMaterial);
    emblemGlow.position.z = zSign * 0.015;
    if (!isLead) emblemGlow.rotation.y = Math.PI;
    emblemGroup.add(emblemGlow);

    const emblemCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 16, 16),
      sapphireBlueMaterial
    );
    emblemCore.position.z = zSign * 0.012;
    emblemGroup.add(emblemCore);

    noseGroup.add(emblemGroup);
    animatedEmblems.push(emblemGroup);

    // E. LOW-PROFILE HEADLAMP MATRIX (Corner boomerang dynamic swooshes matching reference image)
    if (isLead) {
      [-1.02, 1.02].forEach((hx) => {
        const headlampHousing = new THREE.Mesh(
          new RoundedBoxGeometry(0.25, 0.09, 0.14, 2, 0.015),
          darkAeroMaterial
        );
        headlampHousing.position.set(hx, 1.40, NOSE_LENGTH * 0.68);
        headlampHousing.rotation.y = (hx > 0 ? -1 : 1) * 0.22;
        headlampHousing.rotation.z = (hx > 0 ? 1 : -1) * 0.06;
        noseGroup.add(headlampHousing);

        const headlampLens = new THREE.Mesh(
          new THREE.BoxGeometry(0.21, 0.06, 0.02),
          cyanLedMaterial
        );
        headlampLens.position.set(hx, 1.40, NOSE_LENGTH * 0.68 + 0.055);
        headlampLens.rotation.y = (hx > 0 ? -1 : 1) * 0.22;
        headlampLens.rotation.z = (hx > 0 ? 1 : -1) * 0.06;
        noseGroup.add(headlampLens);

        const spot = new THREE.SpotLight(0x00f0ff, 4.2, 85, Math.PI * 0.28, 0.35);
        spot.position.set(hx, 1.40, NOSE_LENGTH * 0.68);
        spot.target.position.set(hx * 0.5, 0, NOSE_LENGTH + 40);
        noseGroup.add(spot);
        noseGroup.add(spot.target);
      });

      const flightDeck = createCockpitAssembly();
      flightDeck.position.z = 0.2;
      noseGroup.add(flightDeck);
    }

    return noseGroup;
  }

  // -------------------------------------------------------------------------
  // 7. ASSEMBLE 3 ARTICULATED NEXT-GEN AI MAGLEV CARRIAGES
  // -------------------------------------------------------------------------

  const carriageCrossSection = createCarriageCrossSectionShape();

  const trainAssembly = new THREE.Group();
  trainAssembly.name = 'Maglev_Floating_Train_Body';
  root.add(trainAssembly);

  for (let c = 0; c < NUM_CARS; c++) {
    const isLead = c === 0;
    const isTail = c === NUM_CARS - 1;
    const carCenterZ = TRAIN_START_Z - c * TOTAL_PITCH;
    const carGroup = new THREE.Group();
    carGroup.name = `Carriage_${c + 1}`;

    // A. CONTINUOUS SOLID FUSELAGE SHELL
    const shellGeom = new THREE.ExtrudeGeometry(carriageCrossSection, {
      depth: CAR_LENGTH,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    });
    shellGeom.translate(0, 0, -CAR_LENGTH / 2);

    const bodyShell = new THREE.Mesh(shellGeom, pearlWhiteMaterial);
    bodyShell.castShadow = castShadow;
    bodyShell.receiveShadow = receiveShadow;
    carGroup.add(bodyShell);

    // B. METALLIC SAPPHIRE BLUE ACCENT RIBBON & TRIPLE BLUE LED STRIPS
    [-1.61, 1.61].forEach((sideX) => {
      const stripeGeom = new RoundedBoxGeometry(0.04, 0.32, CAR_LENGTH * 0.98, 2, 0.015);
      const stripe = new THREE.Mesh(stripeGeom, sapphireBlueMaterial);
      stripe.position.set(sideX, 1.62, 0);
      carGroup.add(stripe);

      // Beltline Cyan LED Guidance Light Strip
      const ledBeltline = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.025, CAR_LENGTH * 0.98),
        cyanLedMaterial
      );
      ledBeltline.position.set(sideX + (sideX > 0 ? 0.015 : -0.015), 1.45, 0);
      carGroup.add(ledBeltline);

      // Roofline Cyan LED Light Strip
      const ledRoofline = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.025, CAR_LENGTH * 0.98),
        cyanLedMaterial
      );
      ledRoofline.position.set(sideX + (sideX > 0 ? -0.05 : 0.05), 3.68, 0);
      carGroup.add(ledRoofline);

      // Skirt Levitation Flux Cyan LED Strip
      const ledSkirt = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.025, CAR_LENGTH * 0.98),
        cyanLedMaterial
      );
      ledSkirt.position.set(sideX + (sideX > 0 ? -0.15 : 0.15), 0.64, 0);
      carGroup.add(ledSkirt);

      // Sculpted Aerodynamic Side Channels with Internal Sapphire Flow Fin
      const chanGeom = new RoundedBoxGeometry(0.035, 0.22, CAR_LENGTH * 0.92, 2, 0.015);
      const sideChannel = new THREE.Mesh(chanGeom, darkAeroMaterial);
      sideChannel.position.set(sideX, 1.88, 0);
      carGroup.add(sideChannel);

      const finGeom = new THREE.BoxGeometry(0.015, 0.08, CAR_LENGTH * 0.90);
      const flowFin = new THREE.Mesh(finGeom, sapphireBlueMaterial);
      flowFin.position.set(sideX + (sideX > 0 ? 0.012 : -0.012), 1.88, 0);
      carGroup.add(flowFin);

      // Hidden Air-Flow Lines: Subtle boundary layer laminar flow channels along upper shoulder and lower skirt
      const upperFlowLine = new THREE.Mesh(
        new THREE.BoxGeometry(0.012, 0.012, CAR_LENGTH * 0.94),
        sapphireBlueMaterial
      );
      upperFlowLine.position.set(sideX + (sideX > 0 ? -0.06 : 0.06), 3.52, 0);
      carGroup.add(upperFlowLine);

      const lowerFlowLine = new THREE.Mesh(
        new THREE.BoxGeometry(0.014, 0.014, CAR_LENGTH * 0.94),
        darkAeroMaterial
      );
      lowerFlowLine.position.set(sideX + (sideX > 0 ? -0.16 : 0.16), 0.78, 0);
      carGroup.add(lowerFlowLine);

      // Aerodynamic vortex generator fins along the side channel
      [-CAR_LENGTH * 0.25, 0, CAR_LENGTH * 0.25].forEach((finZ) => {
        const vortexFin = new THREE.Mesh(
          new RoundedBoxGeometry(0.018, 0.12, 0.24, 2, 0.01),
          sapphireBlueMaterial
        );
        vortexFin.position.set(sideX + (sideX > 0 ? 0.018 : -0.018), 1.88, finZ);
        vortexFin.rotation.y = sideX > 0 ? 0.08 : -0.08;
        carGroup.add(vortexFin);
      });

      // Flank Branding
      const logoPlate = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 0.9), logoMaterial);
      logoPlate.rotation.y = sideX > 0 ? Math.PI / 2 : -Math.PI / 2;
      logoPlate.position.set(sideX + (sideX > 0 ? 0.03 : -0.03), 3.55, 0);
      carGroup.add(logoPlate);

      // Flush Exterior AI Camera Sensors along roofline
      [-CAR_LENGTH * 0.3, 0, CAR_LENGTH * 0.3].forEach((camZ) => {
        const camPod = new THREE.Mesh(new RoundedBoxGeometry(0.03, 0.05, 0.08, 2, 0.01), darkAeroMaterial);
        camPod.position.set(sideX + (sideX > 0 ? 0.01 : -0.01), 3.66, camZ);
        carGroup.add(camPod);

        const camLens = new THREE.Mesh(new THREE.SphereGeometry(0.012, 10, 10), cyanLedMaterial);
        camLens.position.set(sideX + (sideX > 0 ? 0.026 : -0.026), 3.66, camZ);
        carGroup.add(camLens);
      });
    });

    // C. 200% INCREASED WINDOW SIZE: CONTINUOUS FLOOR-TO-CEILING PANORAMIC SMART GLASS
    [-1.56, 1.56].forEach((glassX) => {
      const windowMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 2.40, CAR_LENGTH * 0.95),
        panoramicGlassMaterial
      );
      windowMesh.position.set(glassX, 2.45, 0);
      carGroup.add(windowMesh);

      // Augmented Reality HUD Flight Graphic Display projected onto Glass
      const arDisplay = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 1.6), arWindowMaterial);
      arDisplay.rotation.y = glassX > 0 ? Math.PI / 2 : -Math.PI / 2;
      arDisplay.position.set(glassX > 0 ? glassX - 0.025 : glassX + 0.025, 2.50, 0);
      carGroup.add(arDisplay);

      const numMullions = Math.floor((CAR_LENGTH * 0.92) / 2.0);
      for (let m = 0; m <= numMullions; m++) {
        const mz = -(CAR_LENGTH * 0.92) / 2 + m * 2.0;
        const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.05, 2.40, 0.08), darkAeroMaterial);
        mullion.position.set(glassX * 0.98, 2.45, mz);
        carGroup.add(mullion);
      }
    });

    // D. FULL-LENGTH PANORAMIC SMART-GLASS ROOF (1.92m wide) & 6G SATCOM ARRAY
    const roofCanopyMesh = new THREE.Mesh(
      new RoundedBoxGeometry(1.92, 0.028, CAR_LENGTH * 0.96, 3, 0.015),
      darkBlueSmartGlassMaterial
    );
    roofCanopyMesh.position.set(0, 3.885, 0);
    carGroup.add(roofCanopyMesh);

    // Integrated crystalline solar micro-cells along center spine
    const solarSpineMesh = new THREE.Mesh(
      new RoundedBoxGeometry(0.96, 0.015, CAR_LENGTH * 0.90, 2, 0.01),
      solarMaterial
    );
    solarSpineMesh.position.set(0, 3.90, 0);
    carGroup.add(solarSpineMesh);

    // 6G AI SatCom Mesh Antenna Array on Roof Center
    const satcomRadome = new THREE.Mesh(
      new RoundedBoxGeometry(0.38, 0.06, 1.8, 3, 0.02),
      titaniumGrayMaterial
    );
    satcomRadome.position.set(0, 3.93, 0);
    carGroup.add(satcomRadome);

    // E. SEAMLESS HIDDEN CAPACITIVE DOORS (Flush Titanium Gray plug doors with Electric Blue micro-seams)
    [-1.61, 1.61].forEach((doorX) => {
      [-CAR_LENGTH * 0.36, CAR_LENGTH * 0.36].forEach((doorZ) => {
        // Ultra-flush door panel matching Titanium Gray body shell
        const doorPanel = new THREE.Mesh(
          new RoundedBoxGeometry(0.015, 2.22, 1.42, 2, 0.01),
          titaniumGrayMaterial
        );
        doorPanel.position.set(doorX + (doorX > 0 ? 0.008 : -0.008), 2.08, doorZ);
        carGroup.add(doorPanel);

        // Capacitive outline micro-seam glowing with Electric Blue
        const doorLedV = new THREE.Mesh(new THREE.BoxGeometry(0.02, 2.18, 0.014), electricBlueLedMaterial);
        doorLedV.position.set(doorX + (doorX > 0 ? 0.012 : -0.012), 2.08, doorZ + 0.70);
        carGroup.add(doorLedV);

        const doorLedH = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.014, 1.40), electricBlueLedMaterial);
        doorLedH.position.set(doorX + (doorX > 0 ? 0.012 : -0.012), 3.17, doorZ);
        carGroup.add(doorLedH);
      });
    });

    // F. UNDERBODY MAGLEV LEVITATION SYSTEM WITH ENERGY RINGS
    const levSystem = createCarriageLevitationSystem();
    carGroup.add(levSystem);

    // G. REALISTIC LUXURY INTERIOR ARCHITECTURE
    const floor = new THREE.Mesh(new RoundedBoxGeometry(2.8, 0.16, CAR_LENGTH * 0.96, 2, 0.02), darkAeroMaterial);
    floor.position.set(0, 0.98, 0);
    carGroup.add(floor);

    const carpet = new THREE.Mesh(
      new THREE.BoxGeometry(0.94, 0.02, CAR_LENGTH * 0.94),
      new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.85 })
    );
    carpet.position.set(0, 1.07, 0);
    carGroup.add(carpet);

    [-0.47, 0.47].forEach((ax) => {
      const aisleLed = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.01, CAR_LENGTH * 0.94), cyanLedMaterial);
      aisleLed.position.set(ax, 1.08, 0);
      carGroup.add(aisleLed);
    });

    const ceilingPanel = new THREE.Mesh(
      new RoundedBoxGeometry(1.4, 0.04, CAR_LENGTH * 0.92, 2, 0.015),
      pearlWhiteMaterial
    );
    ceilingPanel.position.set(0, 3.65, 0);
    carGroup.add(ceilingPanel);

    [-0.72, 0.72].forEach((cx) => {
      const coveGlow = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.02, CAR_LENGTH * 0.9),
        interiorGlowMaterial
      );
      coveGlow.position.set(cx, 3.63, 0);
      carGroup.add(coveGlow);
    });

    [-1.12, 1.12].forEach((rackX) => {
      const rackShelf = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.015, CAR_LENGTH * 0.88),
        panoramicGlassMaterial
      );
      rackShelf.position.set(rackX, 2.95, 0);
      carGroup.add(rackShelf);

      const edgeRail = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.018, CAR_LENGTH * 0.88, 12).rotateX(Math.PI / 2),
        sapphireBlueMaterial
      );
      edgeRail.position.set(rackX + (rackX > 0 ? -0.26 : 0.26), 2.97, 0);
      carGroup.add(edgeRail);

      const handrail = new THREE.Mesh(
        new THREE.CylinderGeometry(0.016, 0.016, CAR_LENGTH * 0.88, 12).rotateX(Math.PI / 2),
        chromeMaterial
      );
      handrail.position.set(rackX + (rackX > 0 ? -0.24 : 0.24), 2.72, 0);
      carGroup.add(handrail);
    });

    // Support columns with LED accent strips (optimised spacing for Car 2 VIP lounge)
    const colZPositions = c === 1 ? [-6.5, 0.2, 3.4, 6.4] : [-6.0, -3.0, 0.0, 3.0, 6.0];
    colZPositions.forEach((cz) => {
      [-0.56, 0.56].forEach((cx) => {
        const col = createSupportColumn();
        col.position.set(cx, 1.02, cz);
        carGroup.add(col);
      });
    });

    [-4.5, 4.5].forEach((dz) => {
      const displayMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.28), passengerDisplayMaterial);
      displayMesh.position.set(0, 3.35, dz);
      carGroup.add(displayMesh);

      const displayBack = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.28), passengerDisplayMaterial);
      displayBack.rotation.y = Math.PI;
      displayBack.position.set(0, 3.35, dz - 0.01);
      carGroup.add(displayBack);
    });

    // Smart Glass Privacy Partitions
    [-7.2, 7.2].forEach((pz) => {
      [-0.85, 0.85].forEach((px) => {
        const partition = createSmartPartition(0.95);
        partition.position.set(px, 1.02, pz);
        carGroup.add(partition);
      });
    });

    // Biophilic Potted Plants
    [-7.4, 7.4].forEach((vz) => {
      const plantVestibule = createPottedPlant();
      plantVestibule.position.set(-1.18, 1.02, vz);
      carGroup.add(plantVestibule);
    });

    // Cabin Furnishings:
    // Car 1 (c === 0): Front Control Car (Cockpit in nose + Executive 2+2 Saloon in body)
    // Car 2 (c === 1): Hybrid Passenger / VIP Car (Executive seating front + VIP Lounge Suite rear)
    // Car 3 (c === 2): Rear Car (Executive 2+2 Saloon in body + Aerodynamic Tail Nose)
    if (c === 1) {
      // 1. Rear Zone: VIP Observation Lounge Suite
      const vipLounge = createVipLoungeSuite();
      vipLounge.position.set(0, 1.05, -3.8);
      carGroup.add(vipLounge);

      // VIP Cabin Dividing Partitions & Decorative Plants
      const vipDividerL = createSmartPartition(1.15);
      vipDividerL.position.set(-0.85, 1.02, 0.1);
      carGroup.add(vipDividerL);

      const vipDividerR = createSmartPartition(1.15);
      vipDividerR.position.set(0.85, 1.02, 0.1);
      vipDividerR.rotation.y = Math.PI;
      carGroup.add(vipDividerR);

      const centerPlant = createPottedPlant();
      centerPlant.position.set(0, 1.05, 0.1);
      carGroup.add(centerPlant);

      // 2. Front Zone: Executive Passenger Seating (3 rows of 2+2 smart seats)
      const vipPassRows = [1.8, 4.0, 6.2];
      vipPassRows.forEach((rz, rIdx) => {
        const leftPair = createPassengerSeatPair();
        leftPair.position.set(-1.18, 1.05, rz);
        carGroup.add(leftPair);

        const rightPair = createPassengerSeatPair();
        rightPair.position.set(0.64, 1.05, rz);
        carGroup.add(rightPair);

        const passL = createPassengerFigure(rIdx % 2 === 0);
        passL.position.set(-1.18, 1.05, rz);
        carGroup.add(passL);

        const passR = createPassengerFigure(rIdx % 2 !== 0);
        passR.position.set(1.18, 1.05, rz);
        carGroup.add(passR);

        if (rIdx < vipPassRows.length - 1) {
          const tableL = createConferenceTable();
          tableL.position.set(-0.91, 1.05, rz + 1.1);
          carGroup.add(tableL);

          const tableR = createConferenceTable();
          tableR.position.set(0.91, 1.05, rz + 1.1);
          carGroup.add(tableR);
        }
      });
    } else {
      // Car 1 & Car 3: Executive Passenger Saloon
      const numRows = 5;
      for (let r = 0; r < numRows; r++) {
        const rz = -CAR_LENGTH * 0.30 + (CAR_LENGTH * 0.60 / (numRows - 1)) * r;

        const leftPair = createPassengerSeatPair();
        leftPair.position.set(-1.18, 1.05, rz);
        carGroup.add(leftPair);

        const rightPair = createPassengerSeatPair();
        rightPair.position.set(0.64, 1.05, rz);
        carGroup.add(rightPair);

        if (r % 2 === 0) {
          const passL = createPassengerFigure(r % 4 === 0);
          passL.position.set(-1.18, 1.05, rz);
          carGroup.add(passL);

          const passR = createPassengerFigure(r % 4 !== 0);
          passR.position.set(1.18, 1.05, rz);
          carGroup.add(passR);
        }

        if (r % 2 === 0 && r < numRows - 1) {
          const tableL = createConferenceTable();
          tableL.position.set(-0.91, 1.05, rz + 1.0);
          carGroup.add(tableL);

          const tableR = createConferenceTable();
          tableR.position.set(0.91, 1.05, rz + 1.0);
          carGroup.add(tableR);
        }
      }
    }

    carGroup.position.z = carCenterZ;

    if (isLead) {
      const leadNose = buildAerodynamicBulletNose(true);
      leadNose.position.z = CAR_LENGTH / 2;
      carGroup.add(leadNose);
    }
    if (isTail) {
      const tailNose = buildAerodynamicBulletNose(false);
      tailNose.position.z = -CAR_LENGTH / 2;
      carGroup.add(tailNose);
    }

    trainAssembly.add(carGroup);
    namedNodes[`car${c + 1}`] = carGroup;

    if (c < NUM_CARS - 1) {
      const flushCowling = createFlushInterCarCowling();
      flushCowling.position.z = carCenterZ - TOTAL_PITCH / 2;
      trainAssembly.add(flushCowling);
    }
  }

  // -------------------------------------------------------------------------
  // RUNTIME ANIMATION LOOP & NEXT-GEN AI SCMAGLEV TELEMETRY
  // -------------------------------------------------------------------------

  const cruiseSpeedKmh = options.speedKmh ?? 650;
  const speedMps = (cruiseSpeedKmh * 1000) / 3600;

  root.userData.tick = (dt: number, elapsed: number) => {
    // 1. High-speed magnetic flux energy particles traveling under train at 650 km/h
    energyParticles.update(dt, speedMps);

    // 2. Effortless magnetic levitation cushion resonance & floating sway (12cm air gap)
    const levFloat = Math.sin(elapsed * 5.2) * 0.007;
    const levRoll = Math.sin(elapsed * 2.6) * 0.003;
    const levPitch = Math.cos(elapsed * 3.8) * 0.0016;

    trainAssembly.position.y = levFloat;
    trainAssembly.rotation.z = levRoll;
    trainAssembly.rotation.x = levPitch;

    // 3. Traveling wave electromagnetic stator coil pulsation on guideway
    const wavePhase = (elapsed * 8.5) % (Math.PI * 2);
    statorCoilMaterial.emissiveIntensity = 3.0 + Math.sin(wavePhase) * 1.0;

    // 4. Dynamic Electric Blue LED and branding breathing glow
    const breathe = 1.0 + Math.sin(elapsed * 3.2) * 0.16;
    electricBlueLedMaterial.emissiveIntensity = 5.4 * breathe;
    redLedMaterial.emissiveIntensity = 4.4 * breathe;

    // 5. Dynamic 3D Holographic displays rotation and floating bobbing
    animatedHolograms.forEach((holo, idx) => {
      holo.rotation.y += dt * (0.8 + (idx % 3) * 0.25);
      holo.rotation.x = Math.sin(elapsed * 1.6 + idx) * 0.12;
      holo.position.y = (idx === 0 ? 0.50 : 0.38) + Math.sin(elapsed * 2.4 + idx) * 0.02;
    });

    // 6. Quantum AI Neuromorphic Core Gimbals Rotation
    animatedAiCores.forEach((coreGimbal, idx) => {
      coreGimbal.rotation.y += dt * (1.2 + idx * 0.4);
      coreGimbal.rotation.x += dt * 0.6;
    });

    // 7. Visible Magnetic Field Effects: Rotating concentric flux rings & induction plasma
    animatedMagneticFluxRings.forEach((mRing, idx) => {
      mRing.rotation.z += dt * (0.8 + (idx % 3) * 0.4);
      const ringPulse = 1.0 + Math.sin(elapsed * 5.6 + idx * 0.8) * 0.06;
      mRing.scale.set(ringPulse, ringPulse, 1.0);
    });

    // 8. Illuminated E-Sphere AI Logo Breathing Pulse
    animatedEmblems.forEach((emblem, idx) => {
      const emblemPulse = 1.0 + Math.sin(elapsed * 3.4 + idx) * 0.04;
      emblem.scale.setScalar(emblemPulse);
    });
  };

  root.userData.sculptRuntime = {
    nodes: namedNodes,
    destructionGroups: {
      carriages: Object.keys(namedNodes),
    },
    provenance: {
      route: 'E-Sphere Rail X · 2055 Flagship Smart City Autonomous Hyper-Maglev System · 650 km/h · 120mm Air Gap',
    },
  };

  return root;
}

/**
 * Automotive Look-Dev Lighting Rig for E-Sphere Rail X (Titanium Silver & Electric Blue).
 */
export function createESphereRailLookDevLights(): THREE.Group {
  const lightGroup = new THREE.Group();
  lightGroup.name = 'ESphereRailX_LookDevLights';

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
  keyLight.position.set(18, 30, 22);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 70;
  keyLight.shadow.bias = -0.0003;
  lightGroup.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xcfd8dc, 1.5);
  fillLight.position.set(-18, 14, -18);
  lightGroup.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0x0077fe, 2.4);
  rimLight.position.set(0, 20, -30);
  lightGroup.add(rimLight);

  const trackBounceLight = new THREE.DirectionalLight(0x00a3ff, 0.7);
  trackBounceLight.position.set(0, -5, 0);
  lightGroup.add(trackBounceLight);

  const ambient = new THREE.AmbientLight(0xf0f4f8, 0.42);
  lightGroup.add(ambient);

  return lightGroup;
}
