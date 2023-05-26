import * as THREE from 'three';
import {FBXLoader}  from 'FBXLoader';
import {PointerLockControls} from 'PointerLockControls';
import { OrbitControls } from './OrbitControls.js';


document.addEventListener('DOMContentLoaded', Start);
 
//VARIAVEIS
let isInside = false;
let messageDisplayed = false;
let pressEText;
let pressEKeyPressed = false;
let radius = .07;
var AmbientLight1 = new THREE.AmbientLight( 0xffffff );
var mixers = [];
var clock = new THREE.Clock();
var cena = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
//var camaraPerspetiva = new THREE.PerspectiveCamera(50,window.innerWidth / window.innerHeight,0.1,100);
var camaraPerspetiva = new THREE.PerspectiveCamera(70,4/3,0.1,100);
const interac = new OrbitControls(camaraPerspetiva, renderer.domElement);
const controls = new PointerLockControls(camaraPerspetiva,renderer.domElement)
camaraPerspetiva.position.set(0,.1,1.3);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87ceeb);
document.body.appendChild(renderer.domElement);

function Start(){

    const blocker = document.getElementById('blocker');
    const instructions = document.getElementById('instructions');

    instructions.addEventListener('click', function() {
        controls.lock();
    }, false);

    controls.addEventListener('lock', function() {
        instructions.style.display = 'none';
        blocker.style.display = 'none';
    });

    controls.addEventListener('unlock', function() {
        blocker.style.display = 'block';
        instructions.style.display = '';
    });
    document.addEventListener("keydown", onDocumentKeyDown, false);

    function onDocumentKeyDown(event){
        var keyCode = event.which;
        if(keyCode == 87){
            controls.moveForward(0.05)
        } 
        else if(keyCode == 83){
            controls.moveForward(-0.05)
        }
        else if(keyCode == 65){
            controls.moveRight(-0.05)
        }
        else if(keyCode == 68){
            controls.moveRight(0.05)
        }
    }
    cena.add(controls.getObject());

    CreateScene();
    CreateFountain();
    CreateFence1();
    CreateFence2();
    CreateFence3();
    CreateFence4();
    //Giraffe();
    //Moose();
    //Elefant();
    Posts(0.1,.5, 4.7,-15);
    Posts(0.1,-.5, 4.7,-15);
    Posts(-0.1,.5, -4.7,15);
    Posts(-0.1,-.5, -4.7,15);
    renderMinimap() 

    requestAnimationFrame(loop);
}


function loop(){

    //checkIntersection();
    requestAnimationFrame( loop );

				if ( mixers.length > 0 ) {

					for ( var i = 0; i < mixers.length; i ++ ) {

						mixers[ i ].update( clock.getDelta() );

					}

				}

    renderer.render(cena,camaraPerspetiva);
    renderMinimap();

}

function CreateScene(){
    cena.add(AmbientLight1);
    //CHAO
    let floorGeometry = new THREE.PlaneGeometry(3, 3, 1, 1);
    floorGeometry.rotateX(-Math.PI / 2);
    let floorTexture = new THREE.TextureLoader().load('./Images/grass.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(20, 20);
    const floorMaterial = new THREE.MeshPhongMaterial({
        map: floorTexture
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.x = 0;
    floor.position.y = 0;
    floor.position.z = 0;
    cena.add(floor);

    //PATHS
    let pathGeometry = new THREE.PlaneGeometry(.2, .7, 1, 1);
    let pathGeometry1 = new THREE.PlaneGeometry(.7, .2, 1, 1);
    pathGeometry.rotateX(-Math.PI / 2);
    pathGeometry1.rotateX(-Math.PI / 2);
    let pathTexture = new THREE.TextureLoader().load('./Images/path.png');
    pathTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    pathTexture.repeat.set(1, 1);
    const pathMaterial = new THREE.MeshPhongMaterial({
        map: pathTexture
    });
    
    //Centrais X
    const path = new THREE.Mesh(pathGeometry, pathMaterial);
    path.position.x = 0;
    path.position.y = 0.001;
    path.position.z = .5;

    const path1 = new THREE.Mesh(pathGeometry, pathMaterial);
    path1.position.x = 0;
    path1.position.y = 0.001;
    path1.position.z = 1.2;

    const path3 = new THREE.Mesh(pathGeometry, pathMaterial);
    path3.position.x = 0;
    path3.position.y = 0.001;
    path3.position.z = -.5;

    const path4 = new THREE.Mesh(pathGeometry, pathMaterial);
    path4.position.x = 0;
    path4.position.y = 0.001;
    path4.position.z = -1.2;

    cena.add(path,path1,path3,path4);

    //Centrais Z
    const path6 = new THREE.Mesh(pathGeometry1, pathMaterial);
    path6.position.x = 0.5;
    path6.position.y = 0.001;
    path6.position.z = 0;

    const path7 = new THREE.Mesh(pathGeometry1, pathMaterial);
    path7.position.x = 1.2;
    path7.position.y = 0.001;
    path7.position.z = 0;

    const path9 = new THREE.Mesh(pathGeometry1, pathMaterial);
    path9.position.x = -0.5;
    path9.position.y = 0.001;
    path9.position.z = 0;

    const path10 = new THREE.Mesh(pathGeometry1, pathMaterial);
    path10.position.x = -1.2;
    path10.position.y = 0.001;
    path10.position.z = 0;

    cena.add(path6,path7,path9,path10);

    //Horizontais Z-
    const path12 = new THREE.Mesh(pathGeometry1, pathMaterial);
    path12.position.x = -1.15;
    path12.position.y = 0.0011;
    path12.position.z = -1.4;

    const path13 = new THREE.Mesh(pathGeometry1, pathMaterial);
    path13.position.x = -.45;
    path13.position.y = 0.001;
    path13.position.z = -1.4;

    const path15 = new THREE.Mesh(pathGeometry1, pathMaterial);
    path15.position.x = 1.15;
    path15.position.y = 0.0011;
    path15.position.z = -1.4;

    const path16 = new THREE.Mesh(pathGeometry1, pathMaterial);
    path16.position.x = .45;
    path16.position.y = 0.001;
    path16.position.z = -1.4;

    cena.add(path12,path13,path15,path16);

    //Horizontais Z+
    const path18 = new THREE.Mesh(pathGeometry1, pathMaterial);
    path18.position.x = -1.15;
    path18.position.y = 0.0011;
    path18.position.z = 1.4;

    const path19 = new THREE.Mesh(pathGeometry1, pathMaterial);
    path19.position.x = -.45;
    path19.position.y = 0.001;
    path19.position.z = 1.4;

    const path21 = new THREE.Mesh(pathGeometry1, pathMaterial);
    path21.position.x = 1.15;
    path21.position.y = 0.0011;
    path21.position.z = 1.4;

    const path22 = new THREE.Mesh(pathGeometry1, pathMaterial);
    path22.position.x = .45;
    path22.position.y = 0.001;
    path22.position.z = 1.4;

    cena.add(path18,path19,path21,path22);

    //Verticais X-
    const path24 = new THREE.Mesh(pathGeometry, pathMaterial);
    path24.position.x = -1.4;
    path24.position.y = 0.001;
    path24.position.z = -1.15;

    const path25 = new THREE.Mesh(pathGeometry, pathMaterial);
    path25.position.x = -1.4;
    path25.position.y = 0.001;
    path25.position.z = -.45;

    const path27 = new THREE.Mesh(pathGeometry, pathMaterial);
    path27.position.x = -1.4;
    path27.position.y = 0.001;
    path27.position.z = 1.15;

    const path28 = new THREE.Mesh(pathGeometry, pathMaterial);
    path28.position.x = -1.4;
    path28.position.y = 0.001;
    path28.position.z = .45;

    cena.add(path24,path25,path27,path28);

    //Verticais X+
    const path26 = new THREE.Mesh(pathGeometry, pathMaterial);
    path26.position.x = 1.4;
    path26.position.y = 0.001;
    path26.position.z = -1.15;

    const path29 = new THREE.Mesh(pathGeometry, pathMaterial);
    path29.position.x = 1.4;
    path29.position.y = 0.001;
    path29.position.z = -.45;

    const path30 = new THREE.Mesh(pathGeometry, pathMaterial);
    path30.position.x = 1.4;
    path30.position.y = 0.001;
    path30.position.z = 1.15;

    const path31 = new THREE.Mesh(pathGeometry, pathMaterial);
    path31.position.x = 1.4;
    path31.position.y = 0.001;
    path31.position.z = .45;

    cena.add(path26,path29,path30,path31);

    //PAREDES
    const boxGeometry1 = new THREE.BoxGeometry(3, .2, .02);
    const boxGeometry2 = new THREE.BoxGeometry(.02, .2, 3);

    let wallTexture = new THREE.TextureLoader().load('./Images/Bricks.jpeg');
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(30, 5);
    const wallMaterial = new THREE.MeshPhongMaterial({
        map: wallTexture
    });
    const wall1 = new THREE.Mesh(boxGeometry1, wallMaterial);
    wall1.position.x = 0;
    wall1.position.y = 0.1;
    wall1.position.z = -1.5;

    const wall2 = new THREE.Mesh(boxGeometry1, wallMaterial);
    wall2.position.x = 0;
    wall2.position.y = 0.1;
    wall2.position.z = 1.5

    const wall3 = new THREE.Mesh(boxGeometry2, wallMaterial);
    wall3.position.x = -1.5;
    wall3.position.y = 0.1;
    wall3.position.z = 0;

    const wall4 = new THREE.Mesh(boxGeometry2, wallMaterial);
    wall4.position.x = 1.5;
    wall4.position.y = 0.1;
    wall4.position.z = 0;



    cena.add(wall2,wall1,wall3,wall4);
}

function CreateFence1(){

    const boxGeometry1 = new THREE.BoxGeometry(.94, .07, .006);
    const boxGeometry4 = new THREE.BoxGeometry(1.2, .07, .006);
    const boxGeometry6 = new THREE.BoxGeometry(.3, .07, .006);

    const boxGeometry2 = new THREE.BoxGeometry(.006, .07, .925);
    const boxGeometry3 = new THREE.BoxGeometry(.006, .07, 1.2);
    const boxGeometry5 = new THREE.BoxGeometry(.006, .07, .3);
    
    let wallTexture = new THREE.TextureLoader().load('./Images/wall.png');
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(10, 1);
    const wallMaterial = new THREE.MeshPhongMaterial({
        map: wallTexture
    });

    const wall5 = new THREE.Mesh(boxGeometry1, wallMaterial);
    wall5.position.x = -.825;
    wall5.position.y = 0.016;
    wall5.position.z = 0.12;

    const wall8 = new THREE.Mesh(boxGeometry4, wallMaterial);
    wall8.position.x = -.7;
    wall8.position.y = 0.016;
    wall8.position.z = 1.28;


    const wall6 = new THREE.Mesh(boxGeometry2, wallMaterial);
    wall6.position.x = -0.12;
    wall6.position.y = 0.016;
    wall6.position.z = .835;

    const wall7 = new THREE.Mesh(boxGeometry3, wallMaterial);
    wall7.position.x = -1.28;
    wall7.position.y = 0.016;
    wall7.position.z = .7;


    const wall9 = new THREE.Mesh(boxGeometry5, wallMaterial);
    wall9.position.x = -.37;
    wall9.position.y = 0.016;
    wall9.position.z = .25;

    const wall10 = new THREE.Mesh(boxGeometry6, wallMaterial);
    wall10.position.x = -.25;
    wall10.position.y = 0.016;
    wall10.position.z = .39;

    cena.add(wall5,wall6,wall7,wall8,wall9,wall10);

}

function CreateFence2(){

    const boxGeometry1 = new THREE.BoxGeometry(.94, .07, .006);
    const boxGeometry4 = new THREE.BoxGeometry(1.2, .07, .006);
    const boxGeometry6 = new THREE.BoxGeometry(.3, .07, .006);

    const boxGeometry2 = new THREE.BoxGeometry(.006, .07, .925);
    const boxGeometry3 = new THREE.BoxGeometry(.006, .07, 1.2);
    const boxGeometry5 = new THREE.BoxGeometry(.006, .07, .3);
    
    let wallTexture = new THREE.TextureLoader().load('./Images/wall.png');
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(10, 1);
    const wallMaterial = new THREE.MeshPhongMaterial({
        map: wallTexture
    });

    const wall5 = new THREE.Mesh(boxGeometry1, wallMaterial);
    wall5.position.x = .825;
    wall5.position.y = 0.016;
    wall5.position.z = 0.12;

    const wall8 = new THREE.Mesh(boxGeometry4, wallMaterial);
    wall8.position.x = .7;
    wall8.position.y = 0.016;
    wall8.position.z = 1.28;


    const wall6 = new THREE.Mesh(boxGeometry2, wallMaterial);
    wall6.position.x = 0.12;
    wall6.position.y = 0.016;
    wall6.position.z = .835;

    const wall7 = new THREE.Mesh(boxGeometry3, wallMaterial);
    wall7.position.x = 1.28;
    wall7.position.y = 0.016;
    wall7.position.z = .7;


    const wall9 = new THREE.Mesh(boxGeometry5, wallMaterial);
    wall9.position.x = .37;
    wall9.position.y = 0.016;
    wall9.position.z = .25;

    const wall10 = new THREE.Mesh(boxGeometry6, wallMaterial);
    wall10.position.x = .25;
    wall10.position.y = 0.016;
    wall10.position.z = .39;

    cena.add(wall5,wall6,wall7,wall8,wall9,wall10);

}
  
function CreateFence3(){

    const boxGeometry1 = new THREE.BoxGeometry(.94, .07, .006);
    const boxGeometry4 = new THREE.BoxGeometry(1.2, .07, .006);
    const boxGeometry6 = new THREE.BoxGeometry(.3, .07, .006);

    const boxGeometry2 = new THREE.BoxGeometry(.006, .07, .925);
    const boxGeometry3 = new THREE.BoxGeometry(.006, .07, 1.2);
    const boxGeometry5 = new THREE.BoxGeometry(.006, .07, .3);
    
    let wallTexture = new THREE.TextureLoader().load('./Images/wall.png');
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(10, 1);
    const wallMaterial = new THREE.MeshPhongMaterial({
        map: wallTexture
    });

    const wall5 = new THREE.Mesh(boxGeometry1, wallMaterial);
    wall5.position.x = .825;
    wall5.position.y = 0.016;
    wall5.position.z = -0.12;

    const wall8 = new THREE.Mesh(boxGeometry4, wallMaterial);
    wall8.position.x = .7;
    wall8.position.y = 0.016;
    wall8.position.z = -1.28;


    const wall6 = new THREE.Mesh(boxGeometry2, wallMaterial);
    wall6.position.x = 0.12;
    wall6.position.y = 0.016;
    wall6.position.z = -.835;

    const wall7 = new THREE.Mesh(boxGeometry3, wallMaterial);
    wall7.position.x = 1.28;
    wall7.position.y = 0.016;
    wall7.position.z = -.7;


    const wall9 = new THREE.Mesh(boxGeometry5, wallMaterial);
    wall9.position.x = .37;
    wall9.position.y = 0.016;
    wall9.position.z = -.25;

    const wall10 = new THREE.Mesh(boxGeometry6, wallMaterial);
    wall10.position.x = .25;
    wall10.position.y = 0.016;
    wall10.position.z = -.39;

    cena.add(wall5,wall6,wall7,wall8,wall9,wall10);

}

function CreateFence4(){

    const boxGeometry1 = new THREE.BoxGeometry(.94, .07, .006);
    const boxGeometry4 = new THREE.BoxGeometry(1.2, .07, .006);
    const boxGeometry6 = new THREE.BoxGeometry(.3, .07, .006);

    const boxGeometry2 = new THREE.BoxGeometry(.006, .07, .925);
    const boxGeometry3 = new THREE.BoxGeometry(.006, .07, 1.2);
    const boxGeometry5 = new THREE.BoxGeometry(.006, .07, .3);
    
    let wallTexture = new THREE.TextureLoader().load('./Images/wall.png');
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(10, 1);
    const wallMaterial = new THREE.MeshPhongMaterial({
        map: wallTexture
    });

    const wall5 = new THREE.Mesh(boxGeometry1, wallMaterial);
    wall5.position.x = -.825;
    wall5.position.y = 0.016;
    wall5.position.z = -0.12;

    const wall8 = new THREE.Mesh(boxGeometry4, wallMaterial);
    wall8.position.x = -.7;
    wall8.position.y = 0.016;
    wall8.position.z = -1.28;


    const wall6 = new THREE.Mesh(boxGeometry2, wallMaterial);
    wall6.position.x = -0.12;
    wall6.position.y = 0.016;
    wall6.position.z = -.835;

    const wall7 = new THREE.Mesh(boxGeometry3, wallMaterial);
    wall7.position.x = -1.28;
    wall7.position.y = 0.016;
    wall7.position.z = -.7;


    const wall9 = new THREE.Mesh(boxGeometry5, wallMaterial);
    wall9.position.x = -.37;
    wall9.position.y = 0.016;
    wall9.position.z = -.25;

    const wall10 = new THREE.Mesh(boxGeometry6, wallMaterial);
    wall10.position.x = -.25;
    wall10.position.y = 0.016;
    wall10.position.z = -.39;

    cena.add(wall5,wall6,wall7,wall8,wall9,wall10);

}

function CreateFountain(){

    //AGUA
    let floorGeometry = new THREE.PlaneGeometry(.47, .47, 1, 1);
    floorGeometry.rotateX(-Math.PI / 2);
    let floorTexture = new THREE.TextureLoader().load('./Images/water.png');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(1, 1);
    const floorMaterial = new THREE.MeshPhongMaterial({
        map: floorTexture
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.x = 0;
    floor.position.y = 0.03;
    floor.position.z = 0;
    cena.add(floor);

    //MUROS
    const boxGeometry1 = new THREE.BoxGeometry(.5, .07, .006);
    const boxGeometry2 = new THREE.BoxGeometry(.006, .07, .5);

    let wallTexture = new THREE.TextureLoader().load('./Images/wall.png');
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(10, 2);
    const wallMaterial = new THREE.MeshPhongMaterial({
        map: wallTexture
    });
    const wall9 = new THREE.Mesh(boxGeometry1, wallMaterial);
    wall9.position.x = 0;
    wall9.position.y = 0.016;
    wall9.position.z = -.24;

    const wall10 = new THREE.Mesh(boxGeometry1, wallMaterial);
    wall10.position.x = 0;
    wall10.position.y = 0.016;
    wall10.position.z = .24;

    const wall11 = new THREE.Mesh(boxGeometry2, wallMaterial);
    wall11.position.x = -.24;
    wall11.position.y = 0.016;
    wall11.position.z = 0;

    const wall12 = new THREE.Mesh(boxGeometry2, wallMaterial);
    wall12.position.x = .24;
    wall12.position.y = 0.016;
    wall12.position.z = 0;

    cena.add(wall9,wall10,wall11,wall12);

    //PATHS FONTE
    let pathGeometry = new THREE.PlaneGeometry(.1, .28, 1, 1);
    let pathGeometry1 = new THREE.PlaneGeometry(.15, .15, 1, 1);
    pathGeometry.rotateX(-Math.PI / 2);
    pathGeometry1.rotateX(-Math.PI / 2);
    let pathTexture = new THREE.TextureLoader().load('./Images/path.png');
    pathTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    pathTexture.repeat.set(.6, 1);
    const pathMaterial = new THREE.MeshPhongMaterial({
        map: pathTexture
    });

    const path = new THREE.Mesh(pathGeometry1, pathMaterial);
    path.position.x = 0.175;
    path.position.y = 0.001;
    path.position.z = .3;

    const path1 = new THREE.Mesh(pathGeometry, pathMaterial);
    path1.position.x = 0.3;
    path1.position.y = 0.001;
    path1.position.z = 0.235;


    const path2 = new THREE.Mesh(pathGeometry1, pathMaterial);
    path2.position.x = -0.175;
    path2.position.y = 0.001;
    path2.position.z = .3;

    const path3 = new THREE.Mesh(pathGeometry, pathMaterial);
    path3.position.x = -0.3;
    path3.position.y = 0.001;
    path3.position.z = 0.235;


    const path4 = new THREE.Mesh(pathGeometry1, pathMaterial);
    path4.position.x = 0.175;
    path4.position.y = 0.001;
    path4.position.z = -.3;

    const path5 = new THREE.Mesh(pathGeometry, pathMaterial);
    path5.position.x = 0.3;
    path5.position.y = 0.001;
    path5.position.z = -0.235;


    const path6 = new THREE.Mesh(pathGeometry1, pathMaterial);
    path6.position.x = -0.175;
    path6.position.y = 0.001;
    path6.position.z = -.3;

    const path7 = new THREE.Mesh(pathGeometry, pathMaterial);
    path7.position.x = -0.3;
    path7.position.y = 0.001;
    path7.position.z = -0.235;

    cena.add(path,path1,path2,path3,path4,path5,path6,path7);

}

function cenario(){
    
    var importer = new FBXLoader();
    importer.load('./Objetos/cena/source/cena.fbx', function (object) {
   
        //mixerAnimacao = new THREE.AnimationMixer(object);
        
        //var action = mixerAnimacao.clipAction(object.animations[0]);
        //action.play();
    
        object.scale.x=.001;
        object.scale.z=.001;
        object.scale.y=.001;
    
        object.position.x=0;
        object.position.y=0;
        object.position.x=0;
       
        cena.add(object);

    });
}

function CreateTree(){

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var leaveDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x91E56E } );
    var leaveLightMaterial = new THREE.MeshLambertMaterial( { color: 0xA2FF7A } );
    var stemMaterial = new THREE.MeshLambertMaterial( { color: 0x7D5A4F } );

    var squareLeave01 = new THREE.Mesh( geometry, leaveDarkMaterial );
    squareLeave01.position.set( 0.5, 1.6, 0.5 );
    squareLeave01.scale.set( 0.8, 0.8, 0.8 );

    var squareLeave02 = new THREE.Mesh( geometry, leaveDarkMaterial );
    squareLeave02.position.set( -0.4, 1.3, -0.4 );
    squareLeave02.scale.set( 0.7, 0.7, 0.7 );

    var squareLeave03 = new THREE.Mesh( geometry, leaveDarkMaterial );
    squareLeave03.position.set( 0.4, 1.7, -0.5 );
    squareLeave03.scale.set( 0.7, 0.7, 0.7 );

    var leaveDark = new THREE.Mesh( geometry, leaveDarkMaterial );
    leaveDark.position.set( 0, 1.2, 0 );
    leaveDark.scale.set( 1, 2, 1 );

    var leaveLight = new THREE.Mesh( geometry, leaveLightMaterial );
    leaveLight.position.set( 0, 1.2, 0 );
    leaveLight.scale.set( 1.1, 0.5, 1.1 );

    var stem = new THREE.Mesh( geometry, stemMaterial );
    stem.position.set( 0, 0, 0 );
    stem.scale.set( 0.3, 1.5, 0.3 );

    var tree = new THREE.Group();
    tree.add( leaveDark );
    tree.add( leaveLight );
    tree.add( squareLeave01 );
    tree.add( squareLeave02 );
    tree.add( squareLeave03 );
    tree.add(stem);

    cena.add(tree);
}

function Giraffe(){

    // model
    var loader = new FBXLoader();
    loader.load( './Objetos/giraffe/source/untitled.fbx', function ( object ) {

        object.mixer = new THREE.AnimationMixer( object );
        mixers.push( object.mixer );

        var action = object.mixer.clipAction( object.animations[ 2 ] );
        action.play();

        object.traverse( function ( child ) {
        if ( child.isMesh ) {
            child.castShadow = true;
            child.receiveShadow = true;
            

        }});

        object.rotateY(2);
        object.position.set(-.3,0,.9);
        object.scale.set(0.00002,.00002,0.00002);
        cena.add( object );

    } );      

}

function lion(){

    // model
    var loader = new FBXLoader();
    loader.load( './Objetos/lion/source/untitled.fbx', function ( object ) {

        object.mixer = new THREE.AnimationMixer( object );
        mixers.push( object.mixer );

        var action = object.mixer.clipAction( object.animations[ 0 ] );
        action.play();

        object.traverse( function ( child ) {
        if ( child.isMesh ) {
            child.castShadow = true;
            child.receiveShadow = true;
            

        }});

        object.rotateY(2);
        object.position.set(-.55,0,.75);
        object.scale.set(.0007,.0007,.0007);
        cena.add( object );

    } );      

}

function Moose(){

    // model
    var loader = new FBXLoader();
    loader.load( './Objetos/moose/source/Moose_Walk.fbx', function ( object ) {

        object.mixer = new THREE.AnimationMixer( object );
        mixers.push( object.mixer );

        var action1 = object.mixer.clipAction( object.animations[ 0 ] );
        action1.play();
        action1.timeScale = 2;

        object.traverse( function ( child ) {
        if ( child.isMesh ) {
            child.castShadow = true;
            child.receiveShadow = true;
            

        }});

        object.rotateY(5);
        object.position.set(.4,0,.7);
        object.scale.set(0.0015,.0015,0.0015);
        cena.add( object );

    } );      

}

function Elefant(){

    // model
    var loader = new FBXLoader();
    loader.load( './Objetos/gorilla/source/Gorilla+motions.fbx', function ( object ) {

        object.mixer = new THREE.AnimationMixer( object );
        mixers.push( object.mixer );

        var action1 = object.mixer.clipAction( object.animations[ 23 ] );
        action1.play();

        object.traverse( function ( child ) {
        if ( child.isMesh ) {
            child.castShadow = true;
            child.receiveShadow = true;
            

        }});

        object.rotateY(5);
        object.position.set(.4,.1,.7);
        object.scale.set(0.0006,.0006,0.0006);
        cena.add( object );

    } );      

}

function Postss(x,z,w,t){

    //CHAO
    let floorGeometry = new THREE.PlaneGeometry(.03, .03, 1, 1);
    //floorGeometry.rotateX(-Math.PI / 2);
    let floorTexture = new THREE.TextureLoader().load('./Images/coarkboard.png');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(1,1);
    const floorMaterial = new THREE.MeshPhongMaterial({
        map: floorTexture
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    //floorGeometry.rotateZ(45);
    floor.rotation.z = THREE.MathUtils.degToRad(t);
    floor.rotateY(w);

    floor.position.x = x;
    floor.position.y = 0.07;
    floor.position.z = z;
    
    cena.add(floor);

}

function Posts(x, z, w, t) {

    //CHAO
    let floorGeometry = new THREE.PlaneGeometry(.03, .03, 1, 1);
    //floorGeometry.rotateX(-Math.PI / 2);
    let floorTexture = new THREE.TextureLoader().load('./Images/coarkboard.png');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(1,1);
    const floorMaterial = new THREE.MeshPhongMaterial({
        map: floorTexture
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    //floorGeometry.rotateZ(45);
    floor.rotation.z = THREE.MathUtils.degToRad(t);
    floor.rotateY(w);

    floor.position.x = x;
    floor.position.y = 0.07;
    floor.position.z = z;
    
    cena.add(floor);

    // Criar raio
     // Definir o raio desejado
    let geometry = new THREE.CircleGeometry(radius,32);
    geometry.rotateX(-Math.PI / 2);
    let material = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: false, opacity: 0 });
    let circle = new THREE.Mesh(geometry, material);
    circle.position.x = x;
    circle.position.y = 0.05;
    circle.position.z = z;
    cena.add(circle);

    
}

function checkIntersection() {

    // Obter a posição da câmera
    const cameraPosition = new THREE.Vector3();
    camaraPerspetiva.getWorldPosition(cameraPosition);

    // Calcular a distância entre a posição da câmera e a posição do raio
    const distance = Math.sqrt(
        Math.pow(cameraPosition.x , 2) +
        Math.pow(cameraPosition.y - 0.07, 2) +
        Math.pow(cameraPosition.z , 2)
    );

    // Verificar se a câmera está dentro do raio
    if (distance <= radius) {
        isInside = true;
    } else {
        isInside = false;
    }

    if (isInside && !messageDisplayed) {
        displayMessage();
        messageDisplayed = true;
    } else if (!isInside && messageDisplayed) {
        removeMessage();
        messageDisplayed = false;
    }

    if (pressEKeyPressed && messageDisplayed) {
        // Exibir texto adicional ou executar ação
        console.log("Texto exibido quando a tecla E é pressionada");
    }
}

function displayMessage() {
    let message = "Pressione 'E'";
    let loader = new THREE.FontLoader();
    loader.load('font.json', function (font) { // Substitua 'font.json' pelo caminho correto do arquivo de fonte
        let textGeometry = new THREE.TextGeometry(message, {
            font: font,
            size: 0.1,
            height: 0.01
        });
        let textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        pressEText = new THREE.Mesh(textGeometry, textMaterial);
        pressEText.position.x = x;
        pressEText.position.y = 0.2;
        pressEText.position.z = z;
        cena.add(pressEText);
    });
}

function removeMessage() {
    cena.remove(pressEText);
}

function onKeyDown(event) {
    if (event.key === 'e' || event.key === 'E') {
        pressEKeyPressed = true;
    }
}

function onKeyUp(event) {
    if (event.key === 'e' || event.key === 'E') {
        pressEKeyPressed = false;
    }
}

function renderMinimap() {

    // Criar câmera do minimapa
    var minimapCamera = new THREE.OrthographicCamera(
        window.innerWidth /-500, // left
        window.innerWidth /500, // right
        window.innerHeight /500, // top
        window.innerHeight / -500 , // bottom
        0.1, // near
        1000 // far
    );
    minimapCamera.position.set(0, 20, 0);
    minimapCamera.lookAt(cena.position);
    // Criar renderizador do minimapa
    const minimapRenderer = new THREE.WebGLRenderer({ alpha: true });
    minimapRenderer.setSize(200, 150); // Defina o tamanho adequado para o minimapa
    document.body.appendChild(minimapRenderer.domElement); // Adicione o renderizador à página
    // Adicionar visualização do minimapa à página
    const minimapContainer = document.createElement('div');
    minimapContainer.style.position = 'absolute';
    minimapContainer.style.top = '20px'; // Defina a posição adequada para o minimapa
    minimapContainer.style.left = '20px'; // Defina a posição adequada para o minimapa
    minimapContainer.appendChild(minimapRenderer.domElement);
    document.body.appendChild(minimapContainer);
    minimapRenderer.render(cena, minimapCamera);
}

