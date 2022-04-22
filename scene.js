
//import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';


const scene = new THREE.Scene();
const loader = new GLTFLoader();


loader.load( 'assets-graficas/red_rose/scene.gltf', function ( gltf ) {
    console.log("rosa roja ", gltf)
    const root =  gltf.scene
    root.scale.set(0.9, 0.9, 0.9);
    //root.position.set(1,1,1);

	scene.add( root);

}, undefined, function ( error ) {
	console.error( "error rosa ",error );
} );
/*
loader.load( 'assets-graficas/orchid_flower/scene.gltf', function ( gltf ) {
    console.log("orchid ", gltf)
    const root =  gltf.scene
    root.scale.set(0.2, 0.2, 0.2);
    //root.position.set(892,288);
	scene.add( root);

}, undefined, function ( error ) {
	console.error( "error orchid ",error );
} );

loader.load( 'assets-graficas/flower_pot/scene.gltf', function ( gltf ) {
    console.log("flower pot ", gltf)
    const root =  gltf.scene
    root.scale.set(0.9, 0.9, 0.9);
	scene.add( root);

}, undefined, function ( error ) {
	console.error( "error flower pot ",error );
} );

loader.load( 'assets-graficas/tulip/scene.gltf', function ( gltf ) {
    console.log("tulip ", gltf)
    const root =  gltf.scene
    root.scale.set(0.2, 0.2, 0.2);
	scene.add( root);

}, undefined, function ( error ) {
	console.error( "error tulip ",error );
} );
*/


const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(2,2,5)
scene.add(light)

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//creating cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
}
animate();
