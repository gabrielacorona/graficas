
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';

import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer;



init();
render();

function init() {
    const loaderRosa = new GLTFLoader().setPath( 'assets-graficas/red_rose/' );
    loaderRosa.load( 'scene.gltf', function ( gltf ) {
        scene.add( gltf.scene );
        const root =  gltf.scene
        root.scale.set(0.4, 0.4, 0.4);
        root.position.set(-1,-0.7,1);
        render();
    } );
    const loaderPot = new GLTFLoader().setPath( 'assets-graficas/flower_pot/' );
    loaderPot.load( 'scene.gltf', function ( gltf ) {
        scene.add( gltf.scene );
        const root =  gltf.scene
        root.scale.set(0.2, 0.2, 0.2);
        root.position.set(-1,-0.5,1);
        render();
    } );

    // const loaderOrchid = new GLTFLoader().setPath( 'assets-graficas/orchid_flower/' );
    // loaderOrchid.load( 'scene.gltf', function ( gltf ) {
    //     scene.add( gltf.scene );
    //     const root =  gltf.scene
    //     root.scale.set(0.2, 0.2, 0.2);
    //     root.position.set(-1,-0.5,1);
    //     render();
    // } );

    // const loaderTulip = new GLTFLoader().setPath( 'assets-graficas/tulip/' );
    // loaderTulip.load( 'scene.gltf', function ( gltf ) {
    //     scene.add( gltf.scene );
    //     const root =  gltf.scene
    //     root.scale.set(0.2, 0.2, 0.2);
    //     root.position.set(-1,-0.5,1);
    //     render();
    // } );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.localClippingEnabled = true;
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 200 );

    camera.position.set( - 1.5, 2.5, 3.0 );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render ); // use only if there is no animation loop
    controls.minDistance = 1;
    controls.maxDistance = 10;
    controls.enablePan = false;

    const light = new THREE.HemisphereLight( 0xffffff, 0x080808, 1.5 );
    light.position.set( - 1.25, 1, 1.25 );
    scene.add( light );


    window.addEventListener( 'resize', onWindowResize );
    
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37) {
            console.log('Left key was pressed');
    //Cube.position.x +=1;
        }else if(event.keyCode == 38) {
            console.log('Up key was pressed');
        }else if(event.keyCode == 40) {
            console.log('Down key was pressed');
        }
        else if(event.keyCode == 39) {
            console.log('Right key was pressed');
    //Cube.position.x -=1;
        }
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}

function render() {
    renderer.render( scene, camera );
}