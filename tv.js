import * as THREE from 'three'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
// const fs = require('fs');

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
let backTex = new THREE.MeshPhongMaterial({ color: 0x000000 })
let TextureLoader = new THREE.TextureLoader()
let imageSrc = TextureLoader.load('texture/matt.jpg')
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
let BoarderV = new THREE.Mesh(Bgeo2, imageTex)
BoarderV.position.set(1.45, .7, -0.01)
let BoarderV2 = BoarderV.clone()
BoarderV2.position.set(-1.45, .7, -0.01)



const group = new THREE.Group();
group.add(tv, leg1, leg2, table, BoarderH, BoarderH2, BoarderV, BoarderV2, t, t2);

scene.add(group)

//light 

const ambientLight = new THREE.AmbientLight(0xffffff, .08)
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
    let angle = Date.now() * 0.0003
    camera.position.x = Math.cos(angle) * radius;
    camera.position.z = Math.sin(angle) * radius;
    camera.lookAt(tv.position);

    render()
}

function cameraMoveRight() {
    let radius = 6
    let angle = Date.now() * 0.0003
    camera.position.x = Math.cos(-angle) * radius;
    camera.position.z = Math.sin(-angle) * radius;
    camera.lookAt(tv.position);

    render()
}
function cameraMoveUp() {
    let radius = 6
    let angle = Date.now() * 0.0003
    camera.position.y += 0.01
    camera.position.z = Math.sin(angle) * radius;
    camera.lookAt(tv.position);

    render()
}
function cameraMoveDown() {
    let radius = 6
    let angle = Date.now() * 0.0003
    camera.position.y -= 0.01;
    camera.position.z = Math.sin(angle) * radius;
    camera.lookAt(tv.position);

    render()
}




// animate();

function animate() {
    // requestAnimationFrame(animate);

    let radius = 6
    let angle = Date.now() * 0.0003
    camera.position.x = Math.cos(angle) * radius;
    camera.position.z = Math.sin(angle) * radius;
    // camera.position = Math.cos(angle) * radius;
    // scene.rotation.y = Math.cos(angle) * radius;
    light.position.copy(camera.position);
    // light.target.position.copy(tv.position)
    camera.lookAt(tv.position);
    render()
}
function animate2() {
    // requestAnimationFrame(animate);

    let radius = 6
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
    let radius = 4
    let angle = Date.now() * 0.003
    light.position.x = Math.sin(angle) * radius;
    light.position.z = Math.cos(angle) * radius;
    light.lookAt(tv.position);

    render()

}
const lightMoveRight = () => {
    let radius = 4
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
