import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createEsphereOneModel, type EsphereOneRuntime } from './createEsphereOneModel';

interface ViewPreset {
  name: string;
  pos: [number, number, number];
  target: [number, number, number];
  desc: string;
}

const VIEW_PRESETS: Record<string, ViewPreset> = {
  front: {
    name: 'Front View',
    pos: [0, 0.95, 4.8],
    target: [0, 0.85, 0],
    desc: 'Continuous aerodynamic rounded nose, active front air shutters, curved cyan LED ribbon, and sculpted muscular wheel arches.',
  },
  rear: {
    name: 'Rear View',
    pos: [0, 0.95, -4.8],
    target: [0, 0.85, 0],
    desc: 'Aerodynamic rear pod with active deployable twin wing flaps, dual diffuser, and wrap-around LED taillight.',
  },
  left: {
    name: 'Left Side View',
    pos: [-4.8, 1.0, 0],
    target: [0, 0.85, 0],
    desc: 'Fluid side profile featuring 10% reduced wheels, thicker flared arches, subtle shoulder contour lines, and flush hidden door sensors.',
  },
  right: {
    name: 'Right Side View',
    pos: [4.8, 1.0, 0],
    target: [0, 0.85, 0],
    desc: 'Right profile showing silver-blue metallic paint reflections, A-frame structural truss, and optical refractive glass dome.',
  },
  top: {
    name: 'Top View',
    pos: [0, 6.0, 0.001],
    target: [0, 0.85, 0],
    desc: 'Plan view showing 65% optical glass canopy, roof LiDAR puck, and visible luxury interior with ambient neon piping.',
  },
  perspective: {
    name: 'Perspective View',
    pos: [3.8, 2.2, 3.8],
    target: [0, 0.8, 0],
    desc: 'Dynamic 3/4 beauty view highlighting liquid silver-blue metallic clearcoat reflections and glowing underglow.',
  },
  interior: {
    name: 'Interior Focus',
    pos: [0.75, 1.15, 0.65],
    target: [0, 0.72, 0.05],
    desc: 'Luxury cabin with ambient neon contour lighting, white semi-aniline leather seats, floating dashboard, and glowing AI sphere.',
  },
};

class EsphereStudio {
  private container: HTMLElement;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private pmremGenerator!: THREE.PMREMGenerator;

  private vehicle!: EsphereOneRuntime;
  private floorGrid!: THREE.GridHelper;
  private studioFloor!: THREE.Mesh;

  // Camera animation interpolation
  private isTransitioningCamera = false;
  private camStartPos = new THREE.Vector3();
  private camTargetPos = new THREE.Vector3();
  private lookStartPos = new THREE.Vector3();
  private lookTargetPos = new THREE.Vector3();
  private camTransitionProgress = 1;
  private readonly CAM_TRANSITION_SPEED = 2.4;

  // Interactive states
  private isTurntable = false;
  private isNightMode = false;
  private isCanopyOpen = false;
  private canopyOpenAmount = 0;
  private canopyTargetOpen = 0;
  private activeAeroState = 1; // 0 = stowed, 1 = cruising, 2 = airbrake

  // Studio lights
  private keyLight!: THREE.DirectionalLight;
  private fillLight!: THREE.DirectionalLight;
  private rimLight!: THREE.DirectionalLight;
  private ambientLight!: THREE.AmbientLight;

  constructor(container: HTMLElement) {
    this.container = container;
    this.initScene();
    this.initLighting();
    this.initVehicle();
    this.initUI();
    this.setupEvents();
    this.animate(0);
  }

  private initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf4f6f9);

    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
    this.camera.position.set(...VIEW_PRESETS.perspective.pos);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.02;
    this.controls.minDistance = 0.8;
    this.controls.maxDistance = 16.0;
    this.controls.target.set(...VIEW_PRESETS.perspective.target);

    // High quality IBL reflections for liquid silver-blue paint & refractive glass
    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.pmremGenerator.compileEquirectangularShader();
    const envScene = new RoomEnvironment();
    this.scene.environment = this.pmremGenerator.fromScene(envScene).texture;

    // Studio Cyclorama Floor
    const floorGeom = new THREE.PlaneGeometry(36, 36);
    floorGeom.rotateX(-Math.PI * 0.5);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xeef1f5,
      roughness: 0.25,
      metalness: 0.15,
    });
    this.studioFloor = new THREE.Mesh(floorGeom, floorMat);
    this.studioFloor.receiveShadow = true;
    this.studioFloor.position.y = -0.002;
    this.scene.add(this.studioFloor);

    // Radial studio turntable disc
    const discGeom = new THREE.CircleGeometry(5.2, 64);
    discGeom.rotateX(-Math.PI * 0.5);
    const discMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.12,
      metalness: 0.38,
    });
    const turntableDisc = new THREE.Mesh(discGeom, discMat);
    turntableDisc.receiveShadow = true;
    turntableDisc.position.y = 0.001;
    this.scene.add(turntableDisc);

    this.floorGrid = new THREE.GridHelper(10, 20, 0x00eaff, 0xd0d5dd);
    this.floorGrid.position.y = 0.003;
    (this.floorGrid.material as THREE.Material).transparent = true;
    (this.floorGrid.material as THREE.Material).opacity = 0.22;
    this.scene.add(this.floorGrid);
  }

  private initLighting() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(this.ambientLight);

    this.keyLight = new THREE.DirectionalLight(0xffffff, 1.85);
    this.keyLight.position.set(5, 8, 5);
    this.keyLight.castShadow = true;
    this.keyLight.shadow.mapSize.width = 2048;
    this.keyLight.shadow.mapSize.height = 2048;
    this.keyLight.shadow.camera.near = 1;
    this.keyLight.shadow.camera.far = 25;
    this.keyLight.shadow.camera.left = -4;
    this.keyLight.shadow.camera.right = 4;
    this.keyLight.shadow.camera.top = 4;
    this.keyLight.shadow.camera.bottom = -4;
    this.keyLight.shadow.bias = -0.0004;
    this.keyLight.shadow.radius = 3;
    this.scene.add(this.keyLight);

    this.fillLight = new THREE.DirectionalLight(0xdbeafe, 1.1);
    this.fillLight.position.set(-6, 5, -4);
    this.scene.add(this.fillLight);

    this.rimLight = new THREE.DirectionalLight(0xffffff, 1.3);
    this.rimLight.position.set(0, 9, 0);
    this.scene.add(this.rimLight);
  }

  private initVehicle() {
    this.vehicle = createEsphereOneModel({
      bodyColor: '#D8DCE3', // Premium Metallic Silver
      ledColor: '#00EAFF',  // Cyan LED Accents
      ledIntensity: 4.2,
      glassTransmission: 0.98,
      glassOpacity: 0.18,
    });
    this.scene.add(this.vehicle.root);
  }

  public setView(viewKey: string) {
    const preset = VIEW_PRESETS[viewKey];
    if (!preset) return;

    this.camStartPos.copy(this.camera.position);
    this.camTargetPos.set(...preset.pos);

    this.lookStartPos.copy(this.controls.target);
    this.lookTargetPos.set(...preset.target);

    this.camTransitionProgress = 0;
    this.isTransitioningCamera = true;

    document.querySelectorAll('.view-tab').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === viewKey);
    });

    const titleEl = document.getElementById('current-view-title');
    const descEl = document.getElementById('current-view-desc');
    if (titleEl) titleEl.textContent = preset.name;
    if (descEl) descEl.textContent = preset.desc;
  }

  public toggleTurntable() {
    this.isTurntable = !this.isTurntable;
    const btn = document.getElementById('btn-turntable');
    if (btn) btn.classList.toggle('active', this.isTurntable);
  }

  public toggleNightMode() {
    this.isNightMode = !this.isNightMode;
    const btn = document.getElementById('btn-night');
    if (btn) btn.classList.toggle('active', this.isNightMode);

    if (this.isNightMode) {
      this.scene.background = new THREE.Color(0x0a0c10);
      (this.studioFloor.material as THREE.MeshStandardMaterial).color.set(0x0e1117);
      this.ambientLight.intensity = 0.2;
      this.keyLight.intensity = 0.6;
      this.fillLight.intensity = 0.3;
      this.rimLight.intensity = 0.5;
      this.vehicle.userData.setLedIntensity(4.8);
      this.vehicle.userData.setAmbientIntensity(3.8);
      this.renderer.toneMappingExposure = 1.3;
    } else {
      this.scene.background = new THREE.Color(0xf4f6f9);
      (this.studioFloor.material as THREE.MeshStandardMaterial).color.set(0xeef1f5);
      this.ambientLight.intensity = 0.75;
      this.keyLight.intensity = 1.85;
      this.fillLight.intensity = 1.1;
      this.rimLight.intensity = 1.3;
      this.vehicle.userData.setLedIntensity(3.8);
      this.vehicle.userData.setAmbientIntensity(2.8);
      this.renderer.toneMappingExposure = 1.08;
    }
  }

  public toggleCanopy() {
    this.isCanopyOpen = !this.isCanopyOpen;
    this.canopyTargetOpen = this.isCanopyOpen ? 1.0 : 0.0;
    const btn = document.getElementById('btn-canopy');
    if (btn) btn.classList.toggle('active', this.isCanopyOpen);
  }

  public cycleActiveAero() {
    this.activeAeroState = (this.activeAeroState + 1) % 3;
    const btn = document.getElementById('btn-aero');
    const stateEl = document.getElementById('aero-state');
    const amounts = [0.0, 0.45, 1.0]; // Stowed, Cruising, Airbrake
    const labels = ['Stowed', 'Cruising (Aero)', 'Airbrake (Max)'];
    this.vehicle.userData.setActiveAero(amounts[this.activeAeroState]);
    if (stateEl) stateEl.textContent = labels[this.activeAeroState];
    if (btn) btn.classList.toggle('active', this.activeAeroState > 0);
  }

  public toggleUnderglow() {
    const underglow = this.vehicle.nodes.underglow;
    underglow.visible = !underglow.visible;
    const btn = document.getElementById('btn-underglow');
    if (btn) btn.classList.toggle('active', underglow.visible);
  }

  public setPaintColor(hex: number) {
    this.vehicle.materials.body.color.setHex(hex);
  }

  public captureSnapshot() {
    this.renderer.render(this.scene, this.camera);
    const dataURL = this.renderer.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `E-Sphere-One_${document.getElementById('current-view-title')?.textContent?.replace(/\s+/g, '_') || 'Render'}.png`;
    link.href = dataURL;
    link.click();
  }

  private initUI() {
    document.querySelectorAll('.view-tab').forEach((el) => {
      el.addEventListener('click', () => {
        const view = el.getAttribute('data-view');
        if (view) this.setView(view);
      });
    });

    document.getElementById('btn-turntable')?.addEventListener('click', () => this.toggleTurntable());
    document.getElementById('btn-night')?.addEventListener('click', () => this.toggleNightMode());
    document.getElementById('btn-canopy')?.addEventListener('click', () => this.toggleCanopy());
    document.getElementById('btn-aero')?.addEventListener('click', () => this.cycleActiveAero());
    document.getElementById('btn-underglow')?.addEventListener('click', () => this.toggleUnderglow());
    document.getElementById('btn-snapshot')?.addEventListener('click', () => this.captureSnapshot());

    // Paint swatch options
    document.querySelectorAll('.color-swatch').forEach((swatch) => {
      swatch.addEventListener('click', (e) => {
        document.querySelectorAll('.color-swatch').forEach((s) => s.classList.remove('selected'));
        (e.currentTarget as HTMLElement).classList.add('selected');
        const color = (e.currentTarget as HTMLElement).getAttribute('data-color');
        if (color) this.setPaintColor(parseInt(color, 16));
      });
    });

    const ledSlider = document.getElementById('slider-led') as HTMLInputElement | null;
    if (ledSlider) {
      ledSlider.addEventListener('input', () => {
        this.vehicle.userData.setLedIntensity(parseFloat(ledSlider.value));
      });
    }

    const ambientSlider = document.getElementById('slider-ambient') as HTMLInputElement | null;
    if (ambientSlider) {
      ambientSlider.addEventListener('input', () => {
        this.vehicle.userData.setAmbientIntensity(parseFloat(ambientSlider.value));
      });
    }

    this.setView('perspective');
  }

  private setupEvents() {
    window.addEventListener('resize', () => {
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === '1') this.setView('front');
      if (e.key === '2') this.setView('rear');
      if (e.key === '3') this.setView('left');
      if (e.key === '4') this.setView('right');
      if (e.key === '5') this.setView('top');
      if (e.key === '6') this.setView('perspective');
      if (e.key === '7') this.setView('interior');
      if (e.key === ' ') {
        e.preventDefault();
        this.toggleTurntable();
      }
    });
  }

  private animate = (time: number) => {
    requestAnimationFrame(this.animate);
    const delta = 0.016;
    const elapsed = time * 0.001;

    if (this.isTransitioningCamera) {
      this.camTransitionProgress += delta * this.CAM_TRANSITION_SPEED;
      const t = Math.min(1.0, this.camTransitionProgress);
      const ease = t * t * (3 - 2 * t);

      this.camera.position.lerpVectors(this.camStartPos, this.camTargetPos, ease);
      this.controls.target.lerpVectors(this.lookStartPos, this.lookTargetPos, ease);
      this.controls.update();

      if (t >= 1.0) {
        this.isTransitioningCamera = false;
      }
    } else {
      this.controls.update();
    }

    if (Math.abs(this.canopyOpenAmount - this.canopyTargetOpen) > 0.002) {
      this.canopyOpenAmount += (this.canopyTargetOpen - this.canopyOpenAmount) * 0.1;
      this.vehicle.userData.setCanopyOpen(this.canopyOpenAmount);
    }

    if (this.isTurntable && !this.isTransitioningCamera) {
      this.vehicle.root.rotation.y += delta * 0.35;
    } else if (!this.isTurntable && Math.abs(this.vehicle.root.rotation.y) > 0.001) {
      this.vehicle.root.rotation.y *= 0.95;
      if (Math.abs(this.vehicle.root.rotation.y) < 0.001) this.vehicle.root.rotation.y = 0;
    }

    this.vehicle.userData.tick(delta, elapsed);
    this.renderer.render(this.scene, this.camera);
  };
}

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('viewport-container');
  if (container) {
    (window as any).__ESPHERE_STUDIO__ = new EsphereStudio(container);
  }
});
