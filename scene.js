
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124.0/build/three.module.js';

import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/loaders/RGBELoader.js';
import { GUI } from 'https://cdn.jsdelivr.net/npm/three@0.139.2/examples/jsm/libs/lil-gui.module.min.js';

let camera, scene, renderer, spotLight;
let effectController;



init();
render();

function init() {
    new RGBELoader()
        .setPath( 'assets-graficas/' )
        .load( 'studio_country_hall_4k.hdr', function ( texture ) {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = texture;
            scene.environment = texture;
            render();
            // model
            const loaderRosa = new GLTFLoader().setPath( 'assets-graficas/red_rose/' );
            loaderRosa.load( 'scene.gltf', function ( gltf ) {
                scene.add( gltf.scene );
                const root =  gltf.scene
                root.scale.set(0.4, 0.4, 0.4);
                root.position.set(-10,-10,-10);
                root.visible = false;
                document.addEventListener('keydown', function(event) {
                    if(event.keyCode == 85) {
                        console.log('U key was pressed');
                        root.position.set(-1,-0.7,1);
                        root.visible= true;
                        render()
                    }else if (event.keyCode == 73){
                        console.log("I key was pressed")
                        root.position.set(-100,-100,-100);
                        root.visible =false;
                        render()
                    }
                });
                render();
            } );
        } );

    
    const potRosa = new GLTFLoader().setPath( 'assets-graficas/flower_pot/' );
    potRosa.load( 'scene.gltf', function ( gltf ) {
        scene.add( gltf.scene );
        const root =  gltf.scene
        root.scale.set(0.2, 0.2, 0.2);
        root.position.set(-1,-0.5,1);
        render();
    } );

    const loaderOrchid = new GLTFLoader().setPath( 'assets-graficas/orchid_flower/' );
    loaderOrchid.load( 'scene.gltf', function ( gltf ) {
        scene.add( gltf.scene );
        const root =  gltf.scene
        root.scale.set(0.09, 0.09, 0.09);
        root.position.set(-10,-10,-10);
        root.visible = false;
        document.addEventListener('keydown', function(event) {
            if(event.keyCode == 84) {
                console.log('T  was pressed');
                root.position.set(-0.5,-0.4,1);
                root.visible = true;
                render()
            }else if (event.keyCode == 89){
                console.log("Y  was pressed")
                root.position.set(-10,-10,-10);
                root.visible = false;
                render()
            }
        });
        render();
    } );
    
    const potOrchid = new GLTFLoader().setPath( 'assets-graficas/flower_pot/' );
    potOrchid.load( 'scene.gltf', function ( gltf ) {
        scene.add( gltf.scene );
        const root =  gltf.scene
        root.scale.set(0.2, 0.2, 0.2);
        root.position.set(-0.5,-0.5,1);
        render();
    } );

    const loaderTulip = new GLTFLoader().setPath( 'assets-graficas/tulip/' );
    loaderTulip.load( 'scene.gltf', function ( gltf ) {
        scene.add( gltf.scene );
        const root =  gltf.scene
        root.scale.set(0.04, 0.04, 0.04);
        root.position.set(-10,-10,-10);
        root.visible = false;
        document.addEventListener('keydown', function(event) {
            if(event.keyCode == 79) {
                console.log('O key  was pressed');
                root.position.set(-0.0000009,0.5,1);
                root.visible = true;
                render()
            }else if (event.keyCode == 80){
                console.log(" P key was pressed")
                root.position.set(-10,-10,-10);
                root.visible = false;
                render()
            }
        });
        render();
    } );

    const potTulip = new GLTFLoader().setPath( 'assets-graficas/flower_pot/' );
    potTulip.load( 'scene.gltf', function ( gltf ) {
        scene.add( gltf.scene );
        const root =  gltf.scene
        root.scale.set(0.2, 0.2, 0.2);
        root.position.set(-0.0000009,-0.5,1);
        render();
    } );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.localClippingEnabled = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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

    spotLight = new THREE.SpotLight( 0xffffff, 15 );
    spotLight.position.set( 15, 40, 35 );
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.1;
    spotLight.decay = 2;
    spotLight.distance = 200;

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 512;
    spotLight.shadow.mapSize.height = 512;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.focus = 1;
    scene.add( spotLight );


    window.addEventListener( 'resize', onWindowResize );
    setupGui()
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}
function setupGui() {
    effectController = {
        tButton: "Mostrar Orquída",
        yButton: "Esconder Orquída",
        uButton: "Mostrar Rosa",
        iButton: "Esconder Rosa",
        oButton: "Mostrar Tulipán",
        pButton: "Esconder Tulipán"
    };

    const gui = new GUI();
    gui.add( effectController, 'tButton').name( ' Botón T ' )
    gui.add( effectController, 'yButton').name( ' Botón Y ' )
    gui.add( effectController, 'uButton').name( ' Botón U ' )
    gui.add( effectController, 'iButton').name( ' Botón I ' )
    gui.add( effectController, 'oButton').name( ' Botón O ' )
    gui.add( effectController, 'pButton').name( ' Botón P ' )


}
function render() {
    renderer.render( scene, camera );
}