import * as THREE from 'three';
import {FBXLoader}  from 'FBXLoader';
import {PointerLockControls} from 'PointerLockControls';
import {OBJLoader}  from 'OBJLoader';
import {GLTFLoader}  from 'GLTFLoader';
 
document.addEventListener('DOMContentLoaded', Start);
 
var cena = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();

var camaraPerspetiva = new THREE.PerspectiveCamera(40,window.innerWidth / window.innerHeight,0.1,100);
camaraPerspetiva.position.set(0,1,0);

renderer.setSize(window.innerHeight +1820, window.innerWidth -1900);
renderer.setClearColor(0xaaaaaa);

document.body.appendChild(renderer.domElement);

var objetoImportado;
var mixerAnimacao;
var relogio = new THREE.Clock();
var importer = new FBXLoader();
var importerOBJ = new OBJLoader();
var loaderGLTF = new GLTFLoader();

cenario();


const controls = new PointerLockControls(camaraPerspetiva,renderer.domElement)

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
        controls.moveForward(0.15)
    } 
    else if(keyCode == 83){
        controls.moveForward(-0.15)
    }
    else if(keyCode == 65){
        controls.moveRight(-0.15)
    }
    else if(keyCode == 68){
        controls.moveRight(0.15)
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

    var DirecLight = new THREE.DirectionalLight(0xffffff, 2);
    var AmbientLight = new THREE.AmbientLight( 0xffffff );

    DirecLight.position.set(0,50,0);

    //cena.add(DirecLight);
    cena.add(AmbientLight);

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

    var skyboxGeo = new THREE.BoxGeometry(15,15,15);
    var skybox = new THREE.Mesh(skyboxGeo,materialArray);
    cena.add(skybox);

  
}

function loop(){

    //f(mixerAnimacao){
      //  mixerAnimacao.update(relogio.getDelta());
    //}

    renderer.render(cena,camaraPerspetiva);

    requestAnimationFrame(loop);
}

function cenario(){
    
    importer.load('./Objetos/cena/source/cena.fbx', function (object) {
   
        //mixerAnimacao = new THREE.AnimationMixer(object);
        
        //var action = mixerAnimacao.clipAction(object.animations[0]);
        //action.play();
    
        object.scale.x=.0001;
        object.scale.z=.0001;
        object.scale.y=.0001;
    
        object.position.x=0;
        object.position.y=0;
        object.position.x=0;
       
        cena.add(object);

    });
}
