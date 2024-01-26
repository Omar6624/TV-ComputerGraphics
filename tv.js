import * as THREE from 'three'

//renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);
//scene
const scene = new THREE.Scene()
//camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000);

const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper)
// camera.position.z = 6;
// camera.position.y = .01;

// Create a light source
const light = new THREE.PointLight(0xffffff, 1);
// light.position.set(0, 3, 2);
scene.add(light);

// Create room
const roomGeometry = new THREE.BoxGeometry(10, 5, 10);
const wallTexture = new THREE.TextureLoader().load('texture/wall-texture.jpg');
const floorTexture = new THREE.TextureLoader().load('texture/floor-texture.avif');

const roomMaterials = [
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide }), // Right face - red color
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide }), // Left face - green color
    new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide }), // Top face - blue color
    new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.BackSide }), // Bottom face - yellow color
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide }), // Front face - magenta color
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide })  // Back face - cyan color
];
const room = new THREE.Mesh(roomGeometry, roomMaterials);
room.position.set(0, 1, 0);
scene.add(room);

//tvstand
let Tablegeometry = new THREE.BoxGeometry(5, 0.5, 1);
let texture1 = new THREE.TextureLoader().load('texture/table-texture.jpg')
let tableTex = new THREE.MeshBasicMaterial({ map: texture1 })
let table = new THREE.Mesh(Tablegeometry, tableTex)
table.position.set(0, -1, 0)
// scene.add(table)


//tv
let geometry = new THREE.BoxGeometry(3, 2.2, .1);
let backTex = new THREE.MeshBasicMaterial({ color: 0x000000 })
let TextureLoader = new THREE.TextureLoader()
let imageSrc = TextureLoader.load('texture/matt.jpg')
let imageTex = new THREE.MeshBasicMaterial({ map: imageSrc })




let materials = [
    imageTex, // Right side
    imageTex, // Left side
    imageTex, // Top side
    imageTex, // Bottom side
    imageTex, // Front side
    backTex // Back side with image
];

let tv = new THREE.Mesh(geometry, materials)
tv.position.set(0, 0.7, 0)
// scene.add(tv)

//legg
let tvLegGeometry = new THREE.BoxGeometry(0.1, 1, 0.1)
let leg1 = new THREE.Mesh(tvLegGeometry, imageTex)
leg1.position.set(0.2, -0.3, 0.1);
let leg2 = leg1.clone()
leg2.position.set(-0.2, -0.3, 0.1)
// scene.add(leg2)
// scene.add(leg1)

//triangle thing in the back

let tri = new THREE.TetrahedronGeometry(.17, 4)
// let triTex = new THREE.MeshBasicMaterial({ map: imageSrc })
let t = new THREE.Mesh(tri, imageTex)
let t2 = t.clone()
t.position.set(0.2, -0.76, 0.1)
t2.position.set(-0.2, -0.76, 0.1)





//borderTV


let Bgeo = new THREE.BoxGeometry(3, 0.1, .1)
// let BoarderTex = new THREE.MeshBasicMaterial({ map: imageSrc })
let BoarderH = new THREE.Mesh(Bgeo, imageTex)
BoarderH.position.set(0, -0.35, -0.01)
let BoarderH2 = BoarderH.clone()
BoarderH2.position.set(0, 1.75, -0.01)



let Bgeo2 = new THREE.BoxGeometry(.1, 2, .1)
let BoarderTex2 = new THREE.MeshBasicMaterial({ map: imageSrc })
let BoarderV = new THREE.Mesh(Bgeo2, BoarderTex2)
BoarderV.position.set(1.45, .7, -0.01)
let BoarderV2 = BoarderV.clone()
BoarderV2.position.set(-1.45, .7, -0.01)



const group = new THREE.Group();
group.add(tv, leg1, leg2, table, BoarderH, BoarderH2, BoarderV, BoarderV2, t, t2);

scene.add(group)




// const animate = () => {
//     tv.rotation.y += 0.001
//     renderer.render(scene, camera)
// }

// renderer.setAnimationLoop(animate)


// Animation loop
function animate() {
    requestAnimationFrame(animate);

    let radius = 7
    let angle = Date.now() * 0.0003
    camera.position.x = Math.cos(angle) * radius;
    camera.position.z = Math.sin(angle) * radius;
    // camera.position = Math.cos(angle) * radius;
    // scene.rotation.y = Math.cos(angle) * radius;
    camera.lookAt(tv.position);

    renderer.render(scene, camera);
}
animate();