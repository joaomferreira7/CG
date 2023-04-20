import * as THREE from 'three';
import {FBXLoader} from 'FBXLoader';
 
document.addEventListener('DOMContentLoaded', Start);

var cena = new THREE.Scene();
var camera = new THREE.OrthographicCamera(-1 ,1, 1, -1, 0 , 10);
var renderer = new THREE.WebGLRenderer();

var objetoImportado;
var mixerAnimacao;
var relogio;
var importer;

importer.load('./Objetos/Samba Dancing.fbx', function (object) {
   
    mixerAnimacao = new THREE.AnimationMixer (object);
    
    var action = mixerAnimacao.clipAction(object.animations [0]);
    action.play();
    
    object.traverse(function (child){
        if(child.isMesh){
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    object.scale.x=0.01;
    object.scale.z=0.01;
    object.scale.y=0.01;

    object.position.x=1.5;
    object.position.y=-0.5;
    object.position.z= -6;

    objetoImportado = object;
});
var camaraPerspetiva = new THREE.PerspectiveCamera(45,4/3,0.1,100);

renderer.setSize(window.innerHeight -80, window.innerWidth -15);
renderer.setClearColor(0xaaaaaa);

document.body.appendChild(renderer.domElement);

var geometriaCubo = new THREE.BoxGeometry(1,1,1);

var textura = new THREE.TextureLoader().load('./Images/boxImage.jpg');
var materialTextura = new THREE.MeshBasicMaterial({map:textura});

var meshCubo = new THREE.Mesh(geometriaCubo, materialTextura);
meshCubo.translateZ(-6.0);

function Start(){

    cena.add(meshCubo);

    var focoLuz = new THREE.SpotLight('afffffff',1);

    focoLuz.position.y=5;
    focoLuz.position.x=10;

    focoLuz.lookAt(meshCubo.position);

    cena.add(focoLuz);

    renderer.render(cena,camaraPerspetiva);
    requestAnimationFrame(loop);
}

function loop(){

    meshCubo.rotateY(Math.PI/180*1);

    if(mixerAnimacao){
        mixerAnimacao.update(relogio,getDelta());
    }

    renderer.render(cena,camaraPerspetiva);

    requestAnimationFrame(loop);
}