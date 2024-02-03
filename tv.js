import * as THREE from 'three'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableKeys = true;


const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

// Create room
const roomGeometry = new THREE.BoxGeometry(10, 5, 10);
const wallTexture = new THREE.TextureLoader().load('texture/wall-texture.jpg');
const floorTexture = new THREE.TextureLoader().load('texture/floor-texture.avif');

const roomMaterials = [
    new THREE.MeshLambertMaterial({ map: wallTexture, side: THREE.BackSide }), // Right face - red color
    new THREE.MeshLambertMaterial({ map: wallTexture, side: THREE.BackSide }), // Left face - green color
    new THREE.MeshLambertMaterial({ color: 0x000000, side: THREE.BackSide }), // Top face - blue color
    new THREE.MeshLambertMaterial({ map: floorTexture, side: THREE.BackSide }), // Bottom face - yellow color
    new THREE.MeshLambertMaterial({ map: wallTexture, side: THREE.BackSide }), // Front face - magenta color
    new THREE.MeshLambertMaterial({ map: wallTexture, side: THREE.BackSide })  // Back face - cyan color
];
const room = new THREE.Mesh(roomGeometry, roomMaterials);
room.position.set(0, 1.2, 0);
scene.add(room);

//tvstand
let Tablegeometry = new THREE.BoxGeometry(5, 0.5, 1);
let texture1 = new THREE.TextureLoader().load('texture/table-texture.jpg')
let tableTex = new THREE.MeshLambertMaterial({ map: texture1 })
let table = new THREE.Mesh(Tablegeometry, tableTex)
table.position.set(0, -1, 0)
// scene.add(table)


//tv
let geometry = new THREE.BoxGeometry(3, 2.2, .1);
let t = new THREE.TextureLoader().load('texture/tvs.jpg')
let backTex = new THREE.MeshPhongMaterial({ map: t })
let imageSrc = new THREE.TextureLoader().load('texture/matt.jpg')
let imageTex = new THREE.MeshLambertMaterial({ map: imageSrc })

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

// const TexAnime = (path, index) => {
//     if (index >= path.length) {
//         index = 0
//     }
//     new THREE.TextureLoader().load(`texture/gif/${path[index]}`, (texture) => {
//         let geometry = new THREE.BoxGeometry(3, 2.2, .1);
//         let backTex = new THREE.MeshPhongMaterial({ map: texture })
//         let imageSrc = new THREE.TextureLoader().load('texture/matt.jpg')
//         let imageTex = new THREE.MeshLambertMaterial({ map: imageSrc })
//         let materials = [
//             imageTex, // Right side
//             imageTex, // Left side
//             imageTex, // Top side
//             imageTex, // Bottom side
//             imageTex, // Front side
//             backTex // Back side with image
//         ];
//         let tv = new THREE.Mesh(geometry, materials)
//         tv.position.set(0, 0.7, 0)
//         scene.add(tv);
//         renderer.render(scene, camera);
//         return tv
//     })

// }




//animate tv screen
function animateTexture() {

    t.offset.x += 0.01;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    renderer.render(scene, camera);
    requestAnimationFrame(animateTexture);
}

animateTexture();


//legg
let tvLegGeometry = new THREE.CylinderGeometry(0.14, 0.14, 1, 6)
let tds = new THREE.TextureLoader().load('texture/ds.webp')
let akk = new THREE.MeshLambertMaterial({ map: tds })
let leg1 = new THREE.Mesh(tvLegGeometry, akk)
leg1.position.set(0, -0.3, 0.1);


//thing in the back

const length = .001, width = .001;

const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, width);
shape.lineTo(length, width);
shape.lineTo(length, 0);
shape.lineTo(0, 0);

const extrudeSettings = {
    steps: 3,
    depth: .2,
    // bevelEnabled: true,
    bevelThickness: .12,
    bevelSize: .6,
    bevelOffset: 0,
    bevelSegments: 2
};

//
const block = new THREE.ExtrudeGeometry(shape, extrudeSettings);
// const m = new THREE.MeshLambertMaterial({ color: 0x0fff00 });
const mesh = new THREE.Mesh(block, imageTex);
scene.add(mesh);
mesh.position.set(0, .5, .1)

//ring

const ring = new THREE.RingGeometry(.12, .4, 10);
const texring = new THREE.MeshLambertMaterial({ color: 0x00000, side: THREE.DoubleSide });
const Ringmesh = new THREE.Mesh(ring, texring);
Ringmesh.lookAt(tv.position)
Ringmesh.position.set(0, -.74, .1)
scene.add(Ringmesh);


//button
const btn = new THREE.CircleGeometry(.04, 32);
const m = new THREE.MeshPhongMaterial({ color: 0xfc2617 });
const circle = new THREE.Mesh(btn, m);
circle.lookAt(0, 0, -5)
circle.position.set(-1.2, -.35, -0.1)
scene.add(circle);


//borderTV

let Bgeo = new THREE.BoxGeometry(3, 0.1, .1)
// let BoarderTex = new THREE.MeshBasicMaterial({ map: imageSrc })
let BoarderH = new THREE.Mesh(Bgeo, imageTex)
BoarderH.position.set(0, -0.35, -0.01)
let BoarderH2 = BoarderH.clone()
BoarderH2.position.set(0, 1.75, -0.01)

let Bgeo2 = new THREE.BoxGeometry(.1, 2, .1)
let BoarderV = new THREE.Mesh(Bgeo2, imageTex)
BoarderV.position.set(1.45, .7, -0.01)
let BoarderV2 = BoarderV.clone()
BoarderV2.position.set(-1.45, .7, -0.01)



const group = new THREE.Group();
group.add(tv, leg1, table, BoarderH, BoarderH2, BoarderV, BoarderV2);

scene.add(group)

//light 

const ambientLight = new THREE.AmbientLight(0xffffff, 2)
scene.add(ambientLight)

const light = new THREE.PointLight(0xFFD57A, 50, 7);
scene.add(light)


//rectarealight
RectAreaLightUniformsLib.init()
let Rlight1 = new THREE.RectAreaLight(0xD1D5E6, 1, 5, .1)
// Rlight1.power(2.2)
Rlight1.position.set(0, -1.2, -0.51)
Rlight1.lookAt(0, -1.2, -10)
scene.add(Rlight1)
let Rlight2 = Rlight1.clone()
Rlight2.position.set(0, -1.2, 0.51)
Rlight2.lookAt(0, -1.2, 10)
scene.add(Rlight2)



const rectLightHelper = new RectAreaLightHelper(Rlight1);
Rlight1.add(rectLightHelper);

const rectLightHelper2 = new RectAreaLightHelper(Rlight2);
Rlight2.add(rectLightHelper2);





//initial camera position

const defaultCameraLight = () => {
    // let radius = 6
    // let angle = Date.now() * 0.000004
    let radius = 6
    let angle = Date.now() * 0.0003
    camera.position.x = Math.cos(angle) * radius;
    camera.position.z = Math.sin(angle) * radius;
    controls.update()
    camera.lookAt(tv.position)
    light.position.copy(camera.position)
    render()
}
defaultCameraLight()


// camera.add(light)
// light.target.position(tv.position.x, tv.position.y, tv.position.z)
// scene.add(light.target)
// Animation loop

//keyboard event action

function cameraMoveLeft() {
    let radius = 6
    let angle = Date.now() * 0.0005
    camera.position.x = Math.cos(angle) * radius;
    camera.position.z = Math.sin(angle) * radius;
    camera.lookAt(tv.position);

    render()
}

function cameraMoveRight() {
    let radius = 6
    let angle = Date.now() * 0.0005
    camera.position.x = Math.cos(-angle) * radius;
    camera.position.z = Math.sin(-angle) * radius;
    camera.lookAt(tv.position);

    render()
}
function cameraMoveUp() {
    let radius = 6
    let angle = Date.now() * 0.0005
    camera.position.y += 0.02;
    camera.position.z = Math.sin(angle) * radius;
    camera.lookAt(tv.position);

    render()
}
function cameraMoveDown() {
    let radius = 6
    let angle = Date.now() * 0.0005
    camera.position.y -= 0.02;
    camera.position.z = Math.sin(angle) * radius;
    camera.lookAt(tv.position);

    render()
}




// animate();

function animate() {
    requestAnimationFrame(animate);

    let radius = 5
    let angle = Date.now() * 0.0003
    light.position.x = Math.cos(angle) * radius;
    light.position.z = Math.sin(angle) * radius;
    // camera.position = Math.cos(angle) * radius;
    // scene.rotation.y = Math.cos(angle) * radius;
    // light.position.copy(camera.position);
    // light.target.position.copy(tv.position)
    light.lookAt(tv.position);
    // render()
    renderer.render(scene, camera); g
}
function animate2() {
    // requestAnimationFrame(animate);

    let radius = 5
    let angle = Date.now() * 0.0003
    camera.position.x = Math.cos(angle * -3) * radius;
    camera.position.z = Math.sin(angle * -1) * radius;
    // camera.position = Math.cos(angle) * radius;
    // scene.rotation.y = Math.cos(angle) * radius;
    light.position.copy(camera.position);
    // light.target.position.copy(tv.position)
    camera.lookAt(tv.position);

    render()
}

//mouse event actions
const lightMoveLeft = () => {
    let radius = 6
    let angle = Date.now() * 0.003
    light.position.x = Math.sin(angle) * radius;
    light.position.z = Math.cos(angle) * radius;
    light.lookAt(tv.position);

    render()

}
const lightMoveRight = () => {
    let radius = 6
    let angle = Date.now() * 0.003
    light.position.x = Math.cos(angle) * radius;
    light.position.z = Math.sin(angle) * radius;
    light.lookAt(tv.position);

    render()

}


//mouse event

document.addEventListener("contextmenu", (event) => {

    console.log(event.button)
    event.preventDefault()
    if (event.button === 2) {
        lightMoveRight()
    }


})

document.addEventListener("mousedown", (event) => {

    console.log(event.button)

    if (event.button === 0) {
        lightMoveLeft()
    }

})

//keyboard event

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'a') {
        cameraMoveLeft()
    } else if (keyName === 'd') {
        cameraMoveRight()
    } else if (keyName === 'w') {
        cameraMoveUp()
    }
    else if (keyName === 's') {
        cameraMoveDown()
    } else if (keyName === 'f') {
        animate()
    }
    else if (keyName === 'g') {
        animate2()
    }
})
