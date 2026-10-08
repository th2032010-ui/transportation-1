import * as THREE from 'three';

export interface EsphereOneOptions {
  bodyColor?: number | string;
  ledColor?: number | string;
  ledIntensity?: number;
  glassTransmission?: number;
  glassOpacity?: number;
  wireframe?: boolean;
}

export interface EsphereOneRuntime {
  root: THREE.Group;
  materials: {
    body: THREE.MeshPhysicalMaterial;
    glass: THREE.MeshPhysicalMaterial;
    led: THREE.MeshStandardMaterial;
    wheelLed: THREE.MeshStandardMaterial;
    ambientInterior: THREE.MeshStandardMaterial;
    interiorLeather: THREE.MeshStandardMaterial;
    darkAero: THREE.MeshStandardMaterial;
    chrome: THREE.MeshStandardMaterial;
    hologram: THREE.MeshBasicMaterial;
  };
  nodes: {
    canopy: THREE.Object3D;
    aiSphere: THREE.Object3D;
    lidar: THREE.Object3D;
    wheels: THREE.Object3D[];
    underglow: THREE.Object3D;
    activeAeroRearFlaps: THREE.Object3D[];
    activeAeroFrontShutters: THREE.Object3D;
    doorSeams: THREE.Object3D;
    interiorAmbientRibbons: THREE.Object3D;
  };
  userData: {
    tick: (delta: number, elapsed: number) => void;
    setCanopyOpen: (openAmount: number) => void;
    setActiveAero: (deployAmount: number) => void;
    setUnderglow: (enabled: boolean) => void;
    setLedIntensity: (intensity: number) => void;
    setAmbientIntensity: (intensity: number) => void;
  };
}

/**
 * Creates the upgraded procedural 3D model for "E-Sphere One"
 * Dimensions: Length 4.2m, Width 2.0m, Height 1.8m
 */
export function createEsphereOneModel(options: EsphereOneOptions = {}): EsphereOneRuntime {
  const root = new THREE.Group();
  root.name = 'EsphereOne_Root';

  // Target Color Scheme: Metallic Silver Body (#D8DCE3), Panoramic Glass (#E0F2FE), Neon Cyan LEDs (#00EAFF)
  const bodyColor = new THREE.Color(options.bodyColor ?? '#D8DCE3');
  const ledColor = new THREE.Color(options.ledColor ?? '#00EAFF');
  const ledIntensity = options.ledIntensity ?? 4.2;
  const rimColor = new THREE.Color('#2A2D34');

  // -------------------------------------------------------------
  // MATERIALS (High Contrast, Deep Automotive High-Gloss Royal Blue)
  // -------------------------------------------------------------
  // 1. Royal Blue Metallic Body Paint (#3B82F6) with pearl reflections & white specular highlights
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: bodyColor,
    metalness: 0.68,
    roughness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    reflectivity: 1.0,
    sheen: 0.75,
    sheenColor: new THREE.Color('#93C5FD'), // Pearl metallic highlight reflection
    sheenRoughness: 0.2,
    wireframe: !!options.wireframe,
  });

  // 2. Wheel Rims: Deep Navy Blue (#1E40AF) metallic
  const wheelRimMaterial = new THREE.MeshPhysicalMaterial({
    color: rimColor,
    metalness: 0.82,
    roughness: 0.16,
    clearcoat: 0.85,
    clearcoatRoughness: 0.04,
    reflectivity: 0.9,
    wireframe: !!options.wireframe,
  });

  // Dark aero trim (carbon / dark titanium)
  const darkAeroMaterial = new THREE.MeshStandardMaterial({
    color: 0x111317,
    metalness: 0.88,
    roughness: 0.22,
    wireframe: !!options.wireframe,
  });

  // Structural chassis / floor material
  const chassisMaterial = new THREE.MeshStandardMaterial({
    color: 0x181a1f,
    metalness: 0.75,
    roughness: 0.35,
    wireframe: !!options.wireframe,
  });

  // 3. Glass: Light Ice Blue (#E0F2FE), Crystal Clear Transparent with Optical Refraction
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#E0F2FE'),
    transmission: options.glassTransmission ?? 0.96,
    opacity: options.glassOpacity ?? 0.22,
    transparent: true,
    roughness: 0.012,
    metalness: 0.02,
    ior: 1.52,
    thickness: 0.08,
    attenuationColor: new THREE.Color('#BAE6FD'),
    attenuationDistance: 1.1,
    specularIntensity: 1.0,
    specularColor: new THREE.Color('#FFFFFF'), // Crisp white highlights on curved glass
    depthWrite: false,
    side: THREE.DoubleSide,
    wireframe: !!options.wireframe,
  });

  // 4. LED: Neon Cyan (#00E5FF)
  const ledMaterial = new THREE.MeshStandardMaterial({
    color: ledColor,
    emissive: ledColor,
    emissiveIntensity: ledIntensity,
    roughness: 0.12,
    metalness: 0.1,
  });

  // Ambient Interior Soft Neon Piping Material
  const ambientInteriorMaterial = new THREE.MeshStandardMaterial({
    color: ledColor,
    emissive: ledColor,
    emissiveIntensity: 3.2,
    roughness: 0.18,
    metalness: 0.1,
  });

  const wheelLedMaterial = new THREE.MeshStandardMaterial({
    color: ledColor,
    emissive: ledColor,
    emissiveIntensity: ledIntensity * 1.2,
    roughness: 0.1,
    metalness: 0.2,
  });

  // Interior Luxury White Semi-Aniline Leather
  const interiorLeather = new THREE.MeshStandardMaterial({
    color: 0xf9fafb,
    roughness: 0.42,
    metalness: 0.04,
  });

  // Interior Dark Accent Leather
  const interiorAccent = new THREE.MeshStandardMaterial({
    color: 0x181a1f,
    roughness: 0.32,
    metalness: 0.25,
  });

  // Chrome / Brushed Aluminum details
  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.98,
    roughness: 0.08,
  });

  // Holographic interface material
  const hologramMaterial = new THREE.MeshBasicMaterial({
    color: 0x00eaff,
    transparent: true,
    opacity: 0.7,
    side: THREE.DoubleSide,
    wireframe: true,
  });

  // Tire rubber
  const tireMaterial = new THREE.MeshStandardMaterial({
    color: 0x111214,
    roughness: 0.88,
    metalness: 0.05,
  });

  // Seam line material (fine micro-groove)
  const seamMaterial = new THREE.MeshBasicMaterial({
    color: 0x111316,
  });

  // -------------------------------------------------------------
  // CHASSIS & LOWER FLOOR
  // -------------------------------------------------------------
  const chassisGroup = new THREE.Group();
  chassisGroup.name = 'Chassis_Base';

  // Flat structural skate floor (Length ~3.8m, Width ~1.8m, Height ~0.16m)
  const floorGeom = new THREE.BoxGeometry(1.68, 0.14, 3.6, 8, 2, 16);
  const floorMesh = new THREE.Mesh(floorGeom, chassisMaterial);
  floorMesh.position.set(0, 0.34, 0);
  floorMesh.castShadow = true;
  floorMesh.receiveShadow = true;
  chassisGroup.add(floorMesh);

  // Side rocker panels with sleek bevels (Left & Right)
  [-0.92, 0.92].forEach((xPos) => {
    const sillGeom = new THREE.BoxGeometry(0.18, 0.16, 2.5);
    const sillMesh = new THREE.Mesh(sillGeom, bodyMaterial);
    sillMesh.position.set(xPos, 0.36, 0);
    sillMesh.castShadow = true;
    chassisGroup.add(sillMesh);

    // Glowing cyan sill accent strip
    const sillLedGeom = new THREE.BoxGeometry(0.02, 0.025, 2.3);
    const sillLed = new THREE.Mesh(sillLedGeom, ledMaterial);
    sillLed.position.set(xPos + (xPos > 0 ? 0.095 : -0.095), 0.32, 0);
    chassisGroup.add(sillLed);
  });

  root.add(chassisGroup);

  // -------------------------------------------------------------
  // AERODYNAMIC BODYWORK: FRONT & REAR BULBOUS PODS
  // -------------------------------------------------------------
  const bodyGroup = new THREE.Group();
  bodyGroup.name = 'Aero_Body';

  // 1. FRONT BULBOUS POD (EXACT RECONSTRUCTION FROM REFERENCE IMAGE)
  // Features: Voluptuous dual-fender humps over wheels, smooth sloping nose,
  // upright circular emblem disc at nose apex, and horizontal lower cyan LED pinstripe.
  const frontPodGroup = new THREE.Group();
  frontPodGroup.position.set(0, 0, 0);

  // Central sloping hood & rounded nose shell
  const frontNoseGeom = new THREE.SphereGeometry(1.02, 48, 36, 0, Math.PI * 2, 0, Math.PI * 0.55);
  frontNoseGeom.scale(0.92, 0.54, 0.95);
  const frontNose = new THREE.Mesh(frontNoseGeom, bodyMaterial);
  frontNose.position.set(0, 0.62, 1.42);
  frontNose.rotation.x = 0.12; // Gentle forward slope matching reference
  frontNose.castShadow = true;
  frontNose.receiveShadow = true;
  frontPodGroup.add(frontNose);

  // Left & Right voluptuous fender humps rising over the front wheels (as seen in reference)
  [-0.78, 0.78].forEach((xFender) => {
    const fenderGeom = new THREE.SphereGeometry(0.54, 36, 24);
    fenderGeom.scale(0.48, 0.62, 0.94);
    const fenderMesh = new THREE.Mesh(fenderGeom, bodyMaterial);
    fenderMesh.position.set(xFender, 0.68, 1.35);
    fenderMesh.rotation.x = 0.08;
    fenderMesh.castShadow = true;
    fenderMesh.receiveShadow = true;
    frontPodGroup.add(fenderMesh);
  });

  // Lower front chin aerodynamic undertray
  const frontChinGeom = new THREE.CylinderGeometry(0.92, 0.82, 0.22, 36, 1, false, -Math.PI * 0.5, Math.PI);
  frontChinGeom.scale(1.0, 1.0, 0.62);
  const frontChin = new THREE.Mesh(frontChinGeom, darkAeroMaterial);
  frontChin.position.set(0, 0.36, 1.74);
  frontChin.rotation.y = Math.PI * 0.5;
  frontPodGroup.add(frontChin);

  // Horizontal lower cyan LED pinstripe wrapping around lower nose perimeter (as seen in reference)
  const frontLightCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.90, 0.37, 1.35),
    new THREE.Vector3(-0.84, 0.36, 1.75),
    new THREE.Vector3(-0.52, 0.36, 2.04),
    new THREE.Vector3(0.0, 0.36, 2.12),
    new THREE.Vector3(0.52, 0.36, 2.04),
    new THREE.Vector3(0.84, 0.36, 1.75),
    new THREE.Vector3(0.90, 0.37, 1.35),
  ]);
  const frontLightGeom = new THREE.TubeGeometry(frontLightCurve, 48, 0.012, 8, false);
  const frontLight = new THREE.Mesh(frontLightGeom, ledMaterial);
  frontPodGroup.add(frontLight);

  // Vertical circular emblem disc at nose leading edge (exact match to reference image)
  const frontEmblemGroup = new THREE.Group();
  frontEmblemGroup.position.set(0, 0.52, 2.14);

  const emblemRimGeom = new THREE.CylinderGeometry(0.048, 0.048, 0.012, 28);
  emblemRimGeom.rotateX(Math.PI * 0.5); // Stand vertically facing forward
  const emblemRim = new THREE.Mesh(emblemRimGeom, chromeMaterial);
  frontEmblemGroup.add(emblemRim);

  const emblemCyanGeom = new THREE.RingGeometry(0.024, 0.040, 24);
  const emblemCyan = new THREE.Mesh(emblemCyanGeom, ledMaterial);
  emblemCyan.position.z = 0.007;
  frontEmblemGroup.add(emblemCyan);

  frontPodGroup.add(frontEmblemGroup);
  bodyGroup.add(frontPodGroup);

  // 2. REAR BULBOUS POD (MATCHING DUAL-FENDER ARCHITECTURE)
  const rearPodGroup = new THREE.Group();
  rearPodGroup.position.set(0, 0, 0);

  // Central sloping rear deck & rounded tail shell
  const rearTailGeom = new THREE.SphereGeometry(1.02, 48, 36, 0, Math.PI * 2, 0, Math.PI * 0.55);
  rearTailGeom.scale(0.92, 0.56, 0.95);
  const rearTail = new THREE.Mesh(rearTailGeom, bodyMaterial);
  rearTail.position.set(0, 0.64, -1.42);
  rearTail.rotation.x = -0.12;
  rearTail.castShadow = true;
  rearTail.receiveShadow = true;
  rearPodGroup.add(rearTail);

  // Left & Right voluptuous rear fender humps
  [-0.78, 0.78].forEach((xFender) => {
    const fenderGeom = new THREE.SphereGeometry(0.54, 36, 24);
    fenderGeom.scale(0.48, 0.62, 0.94);
    const fenderMesh = new THREE.Mesh(fenderGeom, bodyMaterial);
    fenderMesh.position.set(xFender, 0.68, -1.35);
    fenderMesh.rotation.x = -0.08;
    fenderMesh.castShadow = true;
    fenderMesh.receiveShadow = true;
    rearPodGroup.add(fenderMesh);
  });

  // Lower rear aerodynamic diffuser
  const rearDiffuserGeom = new THREE.CylinderGeometry(0.90, 0.96, 0.22, 36, 1, false, -Math.PI * 0.5, Math.PI);
  rearDiffuserGeom.scale(1.02, 1.0, 0.60);
  const rearDiffuser = new THREE.Mesh(rearDiffuserGeom, darkAeroMaterial);
  rearDiffuser.position.set(0, 0.36, -1.72);
  rearDiffuser.rotation.y = -Math.PI * 0.5;
  rearPodGroup.add(rearDiffuser);

  // Horizontal lower cyan LED pinstripe wrapping around rear perimeter
  const rearLightCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.90, 0.37, -1.35),
    new THREE.Vector3(-0.84, 0.36, -1.75),
    new THREE.Vector3(-0.52, 0.36, -2.04),
    new THREE.Vector3(0.0, 0.36, -2.12),
    new THREE.Vector3(0.52, 0.36, -2.04),
    new THREE.Vector3(0.84, 0.36, -1.75),
    new THREE.Vector3(0.90, 0.37, -1.35),
  ]);
  const rearLightGeom = new THREE.TubeGeometry(rearLightCurve, 48, 0.012, 8, false);
  const rearLight = new THREE.Mesh(rearLightGeom, ledMaterial);
  rearPodGroup.add(rearLight);

  // Vertical circular emblem disc at rear apex (matching reference image)
  const rearEmblemGroup = new THREE.Group();
  rearEmblemGroup.position.set(0, 0.52, -2.14);
  const rearEmblemRim = new THREE.Mesh(emblemRimGeom, chromeMaterial);
  rearEmblemGroup.add(rearEmblemRim);
  const rearEmblemCyan = new THREE.Mesh(emblemCyanGeom, ledMaterial);
  rearEmblemCyan.position.z = -0.007;
  rearEmblemCyan.rotation.y = Math.PI;
  rearEmblemGroup.add(rearEmblemCyan);
  rearPodGroup.add(rearEmblemGroup);

  // ACTIVE AERODYNAMIC REAR WING FLAPS (Twin adaptive flaps deployed on demand)
  const rearFlapsList: THREE.Object3D[] = [];
  [-0.42, 0.42].forEach((xFlap) => {
    const flapPivot = new THREE.Group();
    flapPivot.position.set(xFlap, 1.05, -1.65);

    // Aerodynamic winglet blade
    const flapGeom = new THREE.BoxGeometry(0.32, 0.022, 0.18);
    const flapMesh = new THREE.Mesh(flapGeom, darkAeroMaterial);
    flapMesh.position.set(0, 0.02, -0.08);
    flapMesh.castShadow = true;
    flapPivot.add(flapMesh);

    // Glowing cyan trailing edge on active flaps
    const flapEdgeGeom = new THREE.BoxGeometry(0.32, 0.008, 0.015);
    const flapEdge = new THREE.Mesh(flapEdgeGeom, ledMaterial);
    flapEdge.position.set(0, 0.02, -0.17);
    flapPivot.add(flapEdge);

    // Default angle: slightly raised 12 degrees
    flapPivot.rotation.x = 0.22;
    rearPodGroup.add(flapPivot);
    rearFlapsList.push(flapPivot);
  });

  bodyGroup.add(rearPodGroup);

  // 3. SUBTLE BODY CONTOUR LINES (Upper Shoulder & Rocker Creases)
  const contourGroup = new THREE.Group();
  contourGroup.name = 'Body_Contour_Lines';

  [-0.94, 0.94].forEach((xSide) => {
    // Upper shoulder aerodynamic swoosh curve
    const shoulderCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(xSide * 0.75, 0.72, 1.8),
      new THREE.Vector3(xSide * 0.98, 0.78, 1.2),
      new THREE.Vector3(xSide * 0.92, 0.76, 0.0),
      new THREE.Vector3(xSide * 0.98, 0.79, -1.2),
      new THREE.Vector3(xSide * 0.75, 0.74, -1.8),
    ]);
    const shoulderGeom = new THREE.TubeGeometry(shoulderCurve, 48, 0.012, 8, false);
    const shoulderMesh = new THREE.Mesh(shoulderGeom, bodyMaterial);
    contourGroup.add(shoulderMesh);

    // Lower rocker accent crease
    const rockerCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(xSide * 0.88, 0.44, 1.1),
      new THREE.Vector3(xSide * 0.95, 0.42, 0.0),
      new THREE.Vector3(xSide * 0.88, 0.44, -1.1),
    ]);
    const rockerGeom = new THREE.TubeGeometry(rockerCurve, 32, 0.01, 8, false);
    const rockerMesh = new THREE.Mesh(rockerGeom, bodyMaterial);
    contourGroup.add(rockerMesh);
  });
  bodyGroup.add(contourGroup);

  // 4. HIDDEN DOOR MECHANISM (Flush capacitive touch sensor & door shutline)
  const doorSeamsGroup = new THREE.Group();
  doorSeamsGroup.name = 'Hidden_Door_Mechanism';

  [-0.96, 0.96].forEach((xSide) => {
    // Micro-recessed door boundary seamline
    const doorShutline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(xSide, 0.42, 1.05),
      new THREE.Vector3(xSide, 0.78, 1.05),
      new THREE.Vector3(xSide * 0.88, 1.28, 0.0),
      new THREE.Vector3(xSide, 0.78, -1.05),
      new THREE.Vector3(xSide, 0.42, -1.05),
    ]);
    const seamGeom = new THREE.TubeGeometry(doorShutline, 48, 0.003, 6, false);
    const seamMesh = new THREE.Mesh(seamGeom, seamMaterial);
    doorSeamsGroup.add(seamMesh);

    // Flush capacitive touch sensor handle with subtle illuminated glyph
    const handleGeom = new THREE.BoxGeometry(0.015, 0.025, 0.12);
    const handleMesh = new THREE.Mesh(handleGeom, darkAeroMaterial);
    handleMesh.position.set(xSide + (xSide > 0 ? 0.005 : -0.005), 0.68, 0.12);
    doorSeamsGroup.add(handleMesh);

    const sensorGlyphGeom = new THREE.BoxGeometry(0.016, 0.006, 0.07);
    const sensorGlyph = new THREE.Mesh(sensorGlyphGeom, ledMaterial);
    sensorGlyph.position.set(xSide + (xSide > 0 ? 0.006 : -0.006), 0.68, 0.12);
    doorSeamsGroup.add(sensorGlyph);
  });
  bodyGroup.add(doorSeamsGroup);

  // 5. INCREASED WHEEL ARCH THICKNESS (Sculpted Muscular Flared Lips)
  const wheelArchPositions: [number, number, number][] = [
    [-0.92, 0.54, 1.35],  // Front Left
    [0.92, 0.54, 1.35],   // Front Right
    [-0.92, 0.54, -1.35], // Rear Left
    [0.92, 0.54, -1.35],  // Rear Right
  ];

  wheelArchPositions.forEach(([x, y, z]) => {
    const archGroup = new THREE.Group();
    archGroup.position.set(x, y, z);

    // Thick sculpted outer flare with pronounced lip (thickness increased)
    const archCurve = new THREE.EllipseCurve(0, 0, 0.44, 0.44, 0, Math.PI, false, 0);
    const archPoints = archCurve.getPoints(36).map((p) => new THREE.Vector3(0, p.y, p.x));
    const archSpline = new THREE.CatmullRomCurve3(archPoints);

    // Robust 0.045m thick tubular flare profile (vs previous thin sheet)
    const thickArchGeom = new THREE.TubeGeometry(archSpline, 36, 0.045, 12, false);
    const thickArchMesh = new THREE.Mesh(thickArchGeom, bodyMaterial);
    thickArchMesh.castShadow = true;
    archGroup.add(thickArchMesh);

    // Inner dark titanium aero fender well lining
    const wellGeom = new THREE.CylinderGeometry(0.42, 0.46, 0.22, 28, 1, true, 0, Math.PI);
    wellGeom.rotateZ(Math.PI * 0.5);
    wellGeom.rotateY(x > 0 ? 0 : Math.PI);
    const wellMesh = new THREE.Mesh(wellGeom, darkAeroMaterial);
    archGroup.add(wellMesh);

    bodyGroup.add(archGroup);
  });

  root.add(bodyGroup);

  // -------------------------------------------------------------
  // HYPER-REALISTIC GLASS CANOPY DOME (~65% of vehicle length)
  // -------------------------------------------------------------
  const canopyGroup = new THREE.Group();
  canopyGroup.name = 'Glass_Canopy';
  canopyGroup.position.set(0, 0.55, 0.05);

  // Smooth elongated dome covering z from -1.35 to +1.45 (66% of 4.2m)
  const domeGeom = new THREE.SphereGeometry(1.0, 56, 36, 0, Math.PI * 2, 0, Math.PI * 0.5);
  domeGeom.scale(0.94, 1.25, 1.45);
  const domeMesh = new THREE.Mesh(domeGeom, glassMaterial);
  domeMesh.castShadow = true;
  canopyGroup.add(domeMesh);

  // Dual-layer interior glass refraction rim for optical realism
  const glassTrimGeom = new THREE.TorusGeometry(1.0, 0.016, 14, 64, Math.PI);
  glassTrimGeom.scale(0.95, 1.23, 1.43);
  glassTrimGeom.rotateX(Math.PI * 0.5);
  const glassTrim = new THREE.Mesh(glassTrimGeom, chromeMaterial);
  glassTrim.position.set(0, 0.01, 0);
  canopyGroup.add(glassTrim);

  root.add(canopyGroup);

  // -------------------------------------------------------------
  // FUTURISTIC A-SHAPED SIDE SUPPORT FRAME
  // -------------------------------------------------------------
  const frameGroup = new THREE.Group();
  frameGroup.name = 'Side_A_Frames';

  [-0.94, 0.94].forEach((xSign) => {
    const sideFrame = new THREE.Group();
    sideFrame.position.set(xSign, 0.55, 0.05);

    const archCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.0, 1.28),
      new THREE.Vector3(xSign * -0.06, 0.85, 0.65),
      new THREE.Vector3(xSign * -0.1, 1.23, 0.0),
      new THREE.Vector3(xSign * -0.06, 0.85, -0.65),
      new THREE.Vector3(0, 0.0, -1.28),
    ]);

    const archTubeGeom = new THREE.TubeGeometry(archCurve, 42, 0.028, 12, false);
    const archBeam = new THREE.Mesh(archTubeGeom, bodyMaterial);
    archBeam.castShadow = true;
    sideFrame.add(archBeam);

    // Illuminated cyan accent line along exterior edge
    const ledTubeGeom = new THREE.TubeGeometry(archCurve, 42, 0.009, 8, false);
    const ledEdge = new THREE.Mesh(ledTubeGeom, ledMaterial);
    ledEdge.position.set(xSign * 0.015, 0.01, 0);
    sideFrame.add(ledEdge);

    frameGroup.add(sideFrame);
  });

  root.add(frameGroup);

  // -------------------------------------------------------------
  // AUTONOMOUS SENSOR: ROOF-MOUNTED LIDAR MODULE
  // -------------------------------------------------------------
  const lidarGroup = new THREE.Group();
  lidarGroup.name = 'Roof_LiDAR';
  lidarGroup.position.set(0, 1.80, 0.05);

  const lidarBaseGeom = new THREE.CylinderGeometry(0.14, 0.18, 0.045, 32);
  const lidarBase = new THREE.Mesh(lidarBaseGeom, darkAeroMaterial);
  lidarGroup.add(lidarBase);

  const lidarPodGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.065, 32);
  const lidarPod = new THREE.Mesh(lidarPodGeom, darkAeroMaterial);
  lidarPod.position.y = 0.055;
  lidarGroup.add(lidarPod);

  const lidarLedGeom = new THREE.TorusGeometry(0.122, 0.008, 12, 36);
  lidarLedGeom.rotateX(Math.PI * 0.5);
  const lidarLed = new THREE.Mesh(lidarLedGeom, ledMaterial);
  lidarLed.position.y = 0.055;
  lidarGroup.add(lidarLed);

  const lidarCapGeom = new THREE.CylinderGeometry(0.11, 0.11, 0.015, 32);
  const lidarCap = new THREE.Mesh(lidarCapGeom, chromeMaterial);
  lidarCap.position.y = 0.092;
  lidarGroup.add(lidarCap);

  root.add(lidarGroup);

  // -------------------------------------------------------------
  // LUXURY INTERIOR WITH RICH AMBIENT INTERIOR LIGHTING
  // -------------------------------------------------------------
  const interiorGroup = new THREE.Group();
  interiorGroup.name = 'Luxury_Interior';
  interiorGroup.position.set(0, 0.42, 0.05);

  // Cabin floor deck
  const deckGeom = new THREE.BoxGeometry(1.42, 0.05, 2.3);
  const deckMesh = new THREE.Mesh(deckGeom, interiorAccent);
  deckMesh.position.y = 0.02;
  interiorGroup.add(deckMesh);

  // 1. AMBIENT INTERIOR LIGHTING PACKAGE
  const ambientRibbonsGroup = new THREE.Group();
  ambientRibbonsGroup.name = 'Ambient_Interior_Light_Package';

  // Floor perimeter halo light runners
  [-0.64, 0.64].forEach((xDeck) => {
    const runnerGeom = new THREE.BoxGeometry(0.015, 0.01, 2.1);
    const runner = new THREE.Mesh(runnerGeom, ambientInteriorMaterial);
    runner.position.set(xDeck, 0.045, 0);
    ambientRibbonsGroup.add(runner);
  });

  // 2 LUXURY ERGONOMIC SEATS (with perimeter ambient back-glow)
  [-0.38, 0.38].forEach((xSeat) => {
    const seatGroup = new THREE.Group();
    seatGroup.position.set(xSeat, 0.06, -0.05);

    // Base cushion
    const baseGeom = new THREE.BoxGeometry(0.48, 0.12, 0.52, 4, 2, 4);
    const seatBase = new THREE.Mesh(baseGeom, interiorLeather);
    seatBase.position.set(0, 0.12, 0);
    seatBase.castShadow = true;
    seatGroup.add(seatBase);

    // Backrest
    const backGeom = new THREE.BoxGeometry(0.46, 0.65, 0.12, 4, 6, 2);
    const seatBack = new THREE.Mesh(backGeom, interiorLeather);
    seatBack.position.set(0, 0.46, -0.22);
    seatBack.rotation.x = -0.18;
    seatBack.castShadow = true;
    seatGroup.add(seatBack);

    // Headrest
    const headGeom = new THREE.BoxGeometry(0.24, 0.18, 0.1, 3, 3, 2);
    const headrest = new THREE.Mesh(headGeom, interiorLeather);
    headrest.position.set(0, 0.84, -0.3);
    headrest.rotation.x = -0.18;
    seatGroup.add(headrest);

    // Ambient cyan seat contour piping along spine and headrest
    const spineLedGeom = new THREE.BoxGeometry(0.015, 0.54, 0.015);
    const spineLed = new THREE.Mesh(spineLedGeom, ambientInteriorMaterial);
    spineLed.position.set(0, 0.46, -0.15);
    spineLed.rotation.x = -0.18;
    seatGroup.add(spineLed);

    const headHaloGeom = new THREE.TorusGeometry(0.12, 0.006, 8, 24);
    headHaloGeom.rotateY(Math.PI * 0.5);
    const headHalo = new THREE.Mesh(headHaloGeom, ambientInteriorMaterial);
    headHalo.position.set(0, 0.84, -0.3);
    headHalo.scale.set(0.8, 1.1, 0.8);
    seatGroup.add(headHalo);

    // Floating armrest
    const armGeom = new THREE.BoxGeometry(0.07, 0.05, 0.35);
    const armrest = new THREE.Mesh(armGeom, interiorLeather);
    armrest.position.set(xSeat > 0 ? 0.26 : -0.26, 0.28, 0.02);
    seatGroup.add(armrest);

    interiorGroup.add(seatGroup);
  });

  // FLOATING CENTER CONSOLE (With continuous ambient side piping)
  const consoleGeom = new THREE.BoxGeometry(0.24, 0.18, 1.4);
  const centerConsole = new THREE.Mesh(consoleGeom, interiorAccent);
  centerConsole.position.set(0, 0.18, 0.1);
  interiorGroup.add(centerConsole);

  [-0.125, 0.125].forEach((xPiping) => {
    const pipeGeom = new THREE.BoxGeometry(0.01, 0.012, 1.36);
    const pipe = new THREE.Mesh(pipeGeom, ambientInteriorMaterial);
    pipe.position.set(xPiping, 0.265, 0.1);
    ambientRibbonsGroup.add(pipe);
  });

  // SMART AI ASSISTANT SPHERE (Floating between the seats)
  const aiSphereGroup = new THREE.Group();
  aiSphereGroup.position.set(0, 0.44, 0.15);

  const pedestalGeom = new THREE.CylinderGeometry(0.08, 0.10, 0.025, 24);
  const pedestal = new THREE.Mesh(pedestalGeom, darkAeroMaterial);
  pedestal.position.y = -0.12;
  aiSphereGroup.add(pedestal);

  const pedestalRingGeom = new THREE.RingGeometry(0.05, 0.075, 24);
  pedestalRingGeom.rotateX(-Math.PI * 0.5);
  const pedestalRing = new THREE.Mesh(pedestalRingGeom, ledMaterial);
  pedestalRing.position.y = -0.105;
  aiSphereGroup.add(pedestalRing);

  // Outer geodesic wireframe sphere
  const outerSphereGeom = new THREE.IcosahedronGeometry(0.075, 1);
  const outerSphere = new THREE.Mesh(outerSphereGeom, hologramMaterial);
  aiSphereGroup.add(outerSphere);

  // Inner glowing core
  const coreSphereGeom = new THREE.SphereGeometry(0.045, 24, 24);
  const coreSphere = new THREE.Mesh(coreSphereGeom, ledMaterial);
  aiSphereGroup.add(coreSphere);

  const ring1Geom = new THREE.TorusGeometry(0.09, 0.003, 8, 32);
  const ring1 = new THREE.Mesh(ring1Geom, ledMaterial);
  ring1.rotation.x = Math.PI * 0.35;
  aiSphereGroup.add(ring1);

  const ring2Geom = new THREE.TorusGeometry(0.095, 0.003, 8, 32);
  const ring2 = new THREE.Mesh(ring2Geom, ledMaterial);
  ring2.rotation.y = Math.PI * 0.45;
  aiSphereGroup.add(ring2);

  interiorGroup.add(aiSphereGroup);

  // FLOATING MINIMALIST DASHBOARD WITH UNDER-GLOW CONTOUR
  const dashGroup = new THREE.Group();
  dashGroup.position.set(0, 0.48, 0.78);

  const dashGeom = new THREE.BoxGeometry(1.36, 0.12, 0.34, 4, 2, 4);
  const dashMesh = new THREE.Mesh(dashGeom, interiorAccent);
  dashGroup.add(dashMesh);

  // Dashboard ambient under-glow ribbon
  const dashLedGeom = new THREE.BoxGeometry(1.34, 0.015, 0.015);
  const dashLed = new THREE.Mesh(dashLedGeom, ambientInteriorMaterial);
  dashLed.position.set(0, -0.055, 0.12);
  dashGroup.add(dashLed);

  // Holographic display
  const hudGeom = new THREE.PlaneGeometry(0.85, 0.22, 12, 6);
  const posAttr = hudGeom.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    posAttr.setZ(i, -x * x * 0.15);
  }
  hudGeom.computeVertexNormals();

  const hudMesh = new THREE.Mesh(hudGeom, hologramMaterial);
  hudMesh.position.set(0, 0.20, -0.02);
  hudMesh.rotation.x = -0.15;
  dashGroup.add(hudMesh);

  interiorGroup.add(dashGroup);
  interiorGroup.add(ambientRibbonsGroup);
  root.add(interiorGroup);

  // -------------------------------------------------------------
  // IMPROVED WHEELS: REDUCED IN SIZE BY 10% (Scale 0.9)
  // Radius: 0.342m (vs previous 0.38m), Width: 0.216m
  // -------------------------------------------------------------
  const wheelsList: THREE.Object3D[] = [];
  const WHEEL_SCALE = 0.90; // Exactly 10% reduction
  const wheelY = 0.342;     // Ground tangent contact point

  const wheelConfigs: { x: number; y: number; z: number; isLeft: boolean }[] = [
    { x: -0.92, y: wheelY, z: 1.35, isLeft: true },   // Front Left
    { x: 0.92, y: wheelY, z: 1.35, isLeft: false },  // Front Right
    { x: -0.92, y: wheelY, z: -1.35, isLeft: true },  // Rear Left
    { x: 0.92, y: wheelY, z: -1.35, isLeft: false }, // Rear Right
  ];

  wheelConfigs.forEach(({ x, y, z, isLeft }, idx) => {
    const wheelGroup = new THREE.Group();
    wheelGroup.name = `Wheel_${idx}_${isLeft ? 'L' : 'R'}`;
    wheelGroup.position.set(x, y, z);
    wheelGroup.scale.set(WHEEL_SCALE, WHEEL_SCALE, WHEEL_SCALE);

    // Tire (Black rubber, rounded profile)
    const tireGeom = new THREE.TorusGeometry(0.34, 0.10, 24, 40);
    tireGeom.rotateY(Math.PI * 0.5);
    const tire = new THREE.Mesh(tireGeom, tireMaterial);
    tire.castShadow = true;
    wheelGroup.add(tire);

    // Dark Gray Aero Disc Rim Cover
    const rimGeom = new THREE.CylinderGeometry(0.33, 0.33, 0.18, 36);
    rimGeom.rotateZ(Math.PI * 0.5);
    const rim = new THREE.Mesh(rimGeom, darkAeroMaterial);
    wheelGroup.add(rim);

    // Outer Aerodynamic Disc Face with Deep Navy Blue Finish (#1E40AF)
    const discGeom = new THREE.CylinderGeometry(0.31, 0.31, 0.025, 36);
    discGeom.rotateZ(Math.PI * 0.5);
    const discMesh = new THREE.Mesh(discGeom, wheelRimMaterial);
    discMesh.position.x = isLeft ? -0.095 : 0.095;
    wheelGroup.add(discMesh);

    // CYAN GLOWING LED RING (Inner face)
    const ledRingGeom = new THREE.RingGeometry(0.24, 0.275, 40);
    ledRingGeom.rotateY(isLeft ? -Math.PI * 0.5 : Math.PI * 0.5);
    const ledRing = new THREE.Mesh(ledRingGeom, wheelLedMaterial);
    ledRing.position.x = isLeft ? -0.11 : 0.11;
    wheelGroup.add(ledRing);

    // Center Hub Cap with glowing cyan dot
    const centerCapGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.02, 24);
    centerCapGeom.rotateZ(Math.PI * 0.5);
    const centerCap = new THREE.Mesh(centerCapGeom, darkAeroMaterial);
    centerCap.position.x = isLeft ? -0.105 : 0.105;
    wheelGroup.add(centerCap);

    const centerDotGeom = new THREE.CircleGeometry(0.025, 24);
    centerDotGeom.rotateY(isLeft ? -Math.PI * 0.5 : Math.PI * 0.5);
    const centerDot = new THREE.Mesh(centerDotGeom, wheelLedMaterial);
    centerDot.position.x = isLeft ? -0.118 : 0.118;
    wheelGroup.add(centerDot);

    root.add(wheelGroup);
    wheelsList.push(wheelGroup);
  });

  // -------------------------------------------------------------
  // CYAN UNDERGLOW BENEATH VEHICLE
  // -------------------------------------------------------------
  const underglowGroup = new THREE.Group();
  underglowGroup.name = 'Cyan_Underglow';

  const underglowGeom = new THREE.PlaneGeometry(1.65, 3.4);
  underglowGeom.rotateX(-Math.PI * 0.5);
  const underglowMat = new THREE.MeshBasicMaterial({
    color: ledColor,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const underglowMesh = new THREE.Mesh(underglowGeom, underglowMat);
  underglowMesh.position.set(0, 0.035, 0);
  underglowGroup.add(underglowMesh);

  [-0.65, 0.65].forEach((xBar) => {
    const barGeom = new THREE.BoxGeometry(0.04, 0.015, 2.6);
    const barMesh = new THREE.Mesh(barGeom, ledMaterial);
    barMesh.position.set(xBar, 0.26, 0);
    underglowGroup.add(barMesh);
  });

  root.add(underglowGroup);

  // -------------------------------------------------------------
  // RUNTIME ANIMATION & INTERACTION HOOKS
  // -------------------------------------------------------------
  let activeAeroTargetAngle = 0.22;
  let activeAeroCurrentAngle = 0.22;

  const tick = (delta: number, elapsed: number) => {
    // 1. Floating AI Sphere bobbing & rotation
    if (aiSphereGroup) {
      aiSphereGroup.position.y = 0.44 + Math.sin(elapsed * 2.2) * 0.035;
      outerSphere.rotation.y += delta * 0.6;
      outerSphere.rotation.x += delta * 0.3;
      ring1.rotation.z += delta * 1.2;
      ring2.rotation.x += delta * 0.9;
      const pulse = 1.0 + Math.sin(elapsed * 4.0) * 0.15;
      coreSphere.scale.set(pulse, pulse, pulse);
    }

    // 2. Slow continuous rotation of roof LiDAR sensor
    if (lidarPod) {
      lidarPod.rotation.y += delta * 3.5;
    }

    // 3. Subtle breathing glow on underglow & ambient interior
    if (underglowMat) {
      underglowMat.opacity = 0.45 + Math.sin(elapsed * 2.5) * 0.12;
    }
    if (ambientInteriorMaterial) {
      ambientInteriorMaterial.emissiveIntensity = 2.8 + Math.sin(elapsed * 2.0) * 0.4;
    }

    // 4. Active Aero rear flaps smooth transition
    if (Math.abs(activeAeroCurrentAngle - activeAeroTargetAngle) > 0.005) {
      activeAeroCurrentAngle += (activeAeroTargetAngle - activeAeroCurrentAngle) * 0.1;
      rearFlapsList.forEach((flap) => {
        flap.rotation.x = activeAeroCurrentAngle;
      });
    }
  };

  const setCanopyOpen = (openAmount: number) => {
    const clamped = Math.max(0, Math.min(1, openAmount));
    canopyGroup.position.y = 0.55 + clamped * 0.75;
    canopyGroup.rotation.x = clamped * 0.35;
  };

  const setActiveAero = (deployAmount: number) => {
    // 0 = flush stowed (0 rad), 1 = full airbrake (0.55 rad ~ 32 deg)
    activeAeroTargetAngle = deployAmount * 0.55;
  };

  const setUnderglow = (enabled: boolean) => {
    underglowGroup.visible = enabled;
  };

  const setLedIntensity = (intensity: number) => {
    ledMaterial.emissiveIntensity = intensity;
    wheelLedMaterial.emissiveIntensity = intensity * 1.15;
  };

  const setAmbientIntensity = (intensity: number) => {
    ambientInteriorMaterial.emissiveIntensity = intensity;
  };

  const runtime: EsphereOneRuntime = {
    root,
    materials: {
      body: bodyMaterial,
      glass: glassMaterial,
      led: ledMaterial,
      wheelLed: wheelLedMaterial,
      ambientInterior: ambientInteriorMaterial,
      interiorLeather,
      darkAero: darkAeroMaterial,
      chrome: chromeMaterial,
      hologram: hologramMaterial,
    },
    nodes: {
      canopy: canopyGroup,
      aiSphere: aiSphereGroup,
      lidar: lidarGroup,
      wheels: wheelsList,
      underglow: underglowGroup,
      activeAeroRearFlaps: rearFlapsList,
      activeAeroFrontShutters: frontChin,
      doorSeams: doorSeamsGroup,
      interiorAmbientRibbons: ambientRibbonsGroup,
    },
    userData: {
      tick,
      setCanopyOpen,
      setActiveAero,
      setUnderglow,
      setLedIntensity,
      setAmbientIntensity,
    },
  };

  (root as any).userData.sculptRuntime = runtime;
  return runtime;
}
