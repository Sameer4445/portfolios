const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#bg'),
            antialias: true
        });
        
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        camera.position.z = 30;
        
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;
        
        const posArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.2,
            color: 0x64ffda
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        const geometry1 = new THREE.TorusGeometry(10, 3, 16, 100);
        const material1 = new THREE.MeshBasicMaterial({ color: 0x5f80ff, wireframe: true });
        const torus = new THREE.Mesh(geometry1, material1);
        scene.add(torus);
        
        const geometry2 = new THREE.OctahedronGeometry(5);
        const material2 = new THREE.MeshBasicMaterial({ color: 0x64ffda, wireframe: true });
        const octahedron = new THREE.Mesh(geometry2, material2);
        octahedron.position.x = -20;
        octahedron.position.y = 10;
        scene.add(octahedron);

        const geometry3 = new THREE.IcosahedronGeometry(8);
        const material3 = new THREE.MeshBasicMaterial({ color: 0xff64a8, wireframe: true });
        const icosahedron = new THREE.Mesh(geometry3, material3);
        icosahedron.position.x = 25;
        icosahedron.position.y = -15;
        scene.add(icosahedron);
        
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (event) => {
            mouseX = event.clientX / window.innerWidth - 0.5;
            mouseY = event.clientY / window.innerHeight - 0.5;
        });
        
        function animate() {
            requestAnimationFrame(animate);
            
            torus.rotation.x += 0.01;
            torus.rotation.y += 0.005;
            torus.rotation.z += 0.01;
            
            octahedron.rotation.x += 0.01;
            octahedron.rotation.y += 0.01;
            
            icosahedron.rotation.x -= 0.007;
            icosahedron.rotation.z -= 0.01;
            
            particlesMesh.rotation.y += mouseX * 0.05;
            particlesMesh.rotation.x += mouseY * 0.05;
            
            const t = document.body.getBoundingClientRect().top;
            camera.position.z = 30 + t * -0.01;
            camera.rotation.y = t * -0.0002;
            
            renderer.render(scene, camera);
        }
        
        animate();