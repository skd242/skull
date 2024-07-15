let scene, camera, renderer, controls;

function init() {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 2);

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0xffffff, 0); // Set background color to white and make it transparent
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('3d-container').appendChild(renderer.domElement);

    // Add orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1; // Set the minimum zoom distance
    controls.maxDistance = 5; // Set the maximum zoom distance

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Load the 3D model
    const loader = new THREE.GLTFLoader();
    loader.load('Wood.glb', function (gltf) {
        scene.add(gltf.scene);
        console.log('Model loaded successfully');
    }, undefined, function (error) {
        console.error('An error occurred while loading the model:', error);
    });

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
}

init();
animate();
