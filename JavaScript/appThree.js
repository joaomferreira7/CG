import * as THREE from 'three';
import {FBXLoader}  from 'FBXLoader';
import { PointerLockControls } from 'PointerLockControls';
 
document.addEventListener('DOMContentLoaded', Start);

var cena = new THREE.Scene();
var camara = new THREE.OrthographicCamera(-1 ,1, 1, -1, -10 , 10);
var renderer = new THREE.WebGLRenderer();
var camaraPerspetiva = new THREE.PerspectiveCamera(45,4/3,0.1,100);

renderer.setSize(window.innerHeight-15, window.innerWidth-80);
renderer.setClearColor(0xaaaaaa);

document.body.appendChild(renderer.domElement);

var geometriaCubo = new THREE.BoxGeometry(1,1,1);

var textura = new THREE.TextureLoader().load('./Images/ceu.jpg');
var materialTextura = new THREE.MeshStandardMaterial({map:textura});

var meshCubo = new THREE.Mesh(geometriaCubo, materialTextura);
meshCubo.translateZ(-6.0);

var objetoImportado;
var mixerAnimacao;
var relogio = new THREE.Clock();
var importer = new FBXLoader();

importer.load('./Objetos/dusty-path-in-the-fields/source/the_way/the_way.fbx', function (object) {
   
    mixerAnimacao = new THREE.AnimationMixer(object);
    
    //var action = mixerAnimacao.clipAction(object.animations[0]);
    //action.play();
    
    object.traverse(function (child){
        if(child.isMesh){
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    cena.add(object);

    object.scale.x=0.0001;
    object.scale.z=0.0001;
    object.scale.y=0.0001;

    object.position.x=1.5;
    object.position.y=-0.5;
    object.position.z= -6;

    objetoImportado = object;
});

const controls = new PointerLockControls(camaraPerspetiva,renderer.domElement)
controls.addEventListener('lock', function(){});
controls.addEventListener('unlock', function(){});

document.addEventListener(
    'click',
    function(){
        controls.lock()
    },
    false   
);


document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event){
    var keyCode = event.which;
    if(keyCode == 87){
        controls.moveForward(0.25)
    } 
    else if(keyCode == 83){
        controls.moveForward(-0.25)
    }
    else if(keyCode == 65){
        controls.moveRight(-0.25)
    }
    else if(keyCode == 68){
        controls.moveRight(0.25)
    }
    else if(keyCode == 32){
        if(meshCubo.parent ===cena){
            cena.remove(meshCubo);
        }
        else{
            cena.add(meshCubo);
        }
    }
}

function Start(){

    cena.add(meshCubo);

    var focoLuz = new THREE.SpotLight('#ffffff',1);

    focoLuz.position.y=5;
    focoLuz.position.z=10;

    focoLuz.lookAt(meshCubo.position);

    cena.add(focoLuz);

    renderer.render(cena,camaraPerspetiva);
    requestAnimationFrame(loop);

    var texture_dir = new THREE.TextureLoader().load('./Images/sky.jpg');
    var texture_esq = new THREE.TextureLoader().load('./Images/sky.jpg');
    var texture_up = new THREE.TextureLoader().load('./Images/sky.jpg');
    var texture_dn = new THREE.TextureLoader().load('./Images/terra.jpg');
    var texture_bk = new THREE.TextureLoader().load('./Images/sky.jpg');
    var texture_ft = new THREE.TextureLoader().load('./Images/sky.jpg');

    var materialArray = [];

    materialArray.push(new THREE.MeshBasicMaterial({map: texture_dir}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_esq}))
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}))
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}))
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}))
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}))


    for (var i=0; i<6; i++)
        materialArray[i].side = THREE.BackSide;

    var skyboxGeo = new THREE.BoxGeometry(100,100,100);
    var skybox = new THREE.Mesh(skyboxGeo,materialArray);
    cena.add(skybox);
}

function loop(){

    meshCubo.rotateY(Math.PI/180*1);

    //f(mixerAnimacao){
      //  mixerAnimacao.update(relogio.getDelta());
    //}

    renderer.render(cena,camaraPerspetiva);

    requestAnimationFrame(loop);
}