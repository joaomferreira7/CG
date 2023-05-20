import * as THREE from 'three';
import {FBXLoader}  from 'FBXLoader';
import {PointerLockControls} from 'PointerLockControls';
 
document.addEventListener('DOMContentLoaded', Start);
 
//VARIAVEIS
var cena = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var camaraPerspetiva = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,0.1,100);
const walls = [];
var objetoImportado;
var mixerAnimacao;
var relogio = new THREE.Clock();
var importer = new FBXLoader();
const controls = new PointerLockControls(camaraPerspetiva,renderer.domElement)


camaraPerspetiva.position.set(0,.16,0);
renderer.setSize(window.innerHeight +1820, window.innerWidth -1900);
renderer.setClearColor(0x87ceeb);
document.body.appendChild(renderer.domElement);
document.addEventListener(
    'click',
    function(){
        controls.lock()
    },
    false   
);
document.addEventListener("keydown", onDocumentKeyDown, false);

//CreateScene();
cenario();

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

    var texture_dir = new THREE.TextureLoader().load('./Images/asphalt.jpg');
    var texture_esq = new THREE.TextureLoader().load('./Images/asphalt.jpg');
    var texture_up = new THREE.TextureLoader().load('./Images/asphalt.jpg');
    var texture_dn = new THREE.TextureLoader().load('./Images/asphalt.jpg');
    var texture_bk = new THREE.TextureLoader().load('./Images/asphalt.jpg');
    var texture_ft = new THREE.TextureLoader().load('./Images/asphalt.jpg');

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
    //cena.add(skybox);

  
}

function loop(){

    //checkCollision();

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

function CreateScene(){

    //CHAO
    let floorGeometry = new THREE.PlaneBufferGeometry(5, 5, 1, 1);
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

    //PAREDES
    const boxGeometry1 = new THREE.BoxGeometry(5, .3, .02);
    const boxGeometry2 = new THREE.BoxGeometry(.02, .3, 5);
    let wallTexture = new THREE.TextureLoader().load('./Images/Bricks.jpeg');
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(30, 5);
    const wallMaterial = new THREE.MeshPhongMaterial({
        map: wallTexture
    });
    const wall1 = new THREE.Mesh(boxGeometry1, wallMaterial);
    wall1.position.x = 0;
    wall1.position.y = 0.15;
    wall1.position.z = -2.5;

    const wall2 = new THREE.Mesh(boxGeometry1, wallMaterial);
    wall2.position.x = 0;
    wall2.position.y = 0.15;
    wall2.position.z = 2.5;

    const wall3 = new THREE.Mesh(boxGeometry2, wallMaterial);
    wall3.position.x = -2.5;
    wall3.position.y = 0.15;
    wall3.position.z = 0;

    const wall4 = new THREE.Mesh(boxGeometry2, wallMaterial);
    wall4.position.x = 2.5;
    wall4.position.y = 0.15;
    wall4.position.z = 0;

    cena.add(wall1,wall2,wall3,wall4);
    walls.push(wall1, wall2, wall3, wall4);
}

function checkCollision() {
    const cameraPosition = camaraPerspetiva.position;
  
    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      if (cameraPosition.distanceTo(wall.position) < .1) {
        // Colisão detectada!
        // Ajuste a posição da câmera para evitar a colisão
        const collisionNormal = cameraPosition.clone().sub(wall.position).normalize();
        const safePosition = wall.position.clone().add(collisionNormal.multiplyScalar(wallSize));
        camaraPerspetiva.position.copy(safePosition);
      }
    }
  }
  