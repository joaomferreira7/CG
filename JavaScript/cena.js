    import * as THREE from './three.js';
    import { OrbitControls } from './OrbitControls.js';
    
    var scene = new THREE.Scene();
    // Cria a câmera em perspectiva
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 45, 30000);
    camera.position.set(-900,-200,-900);

   
    
    const controls = new OrbitControls( camera, renderer.domElement );
  
    // Cria o renderer
    var renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    // Função de renderização
    function animate() {
      requestAnimationFrame(animate);
  
      // Adicione aqui as atualizações e animações da sua cena
  
      // Renderiza a cena com a câmera
      renderer.render(scene, camera);
    }
  
    // Chama a função de animate para começar a renderização
    animate();
