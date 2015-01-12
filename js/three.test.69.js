function showMan(){
	var container;

	var blendMesh, camera, scene, renderer;

	var clock = new THREE.Clock();

	var isFrameStepping = false;
	var timeToStep = 0;

	init();

	function init() {

		var sx = (parseInt(geometry.elements.gcanvas.style.width)>>1) + parseInt(geometry.elements.gcanvas.style.left) - 96;  
		var sy = (parseInt(geometry.elements.gcanvas.style.height)>>1) + parseInt(geometry.elements.gcanvas.style.top) - 96;	
		container =	cellCreate();
    	//container.style.border='2px solid green';
    	container.style.width = '192px';
    	container.style.height = '192px';
    	container.style.left = sx+'px';
    	container.style.top = sy+'px';
    	container.style.zindex = 99;

		document.body.appendChild(container);

		scene = new THREE.Scene();
		scene.add ( new THREE.AmbientLight( 0xaaaaaa ) );

/*
		var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
		light.position.set( 0, 0, 1000 );
		scene.add( light );
*/
		light = new THREE.DirectionalLight();
		light.position.set( 400, 400, 400 );
		light.intensity = 2.0;
		light.castShadow = true;
		scene.add(light);



/*		renderer = new THREE.WebGLRenderer( { antialias: true, alpha: false } );
		renderer.setClearColor( '#777777', 1 );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.autoClear = true;

		container.appendChild( renderer.domElement );*/

		renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	    renderer.setSize(192, 192);
	    container.appendChild(renderer.domElement);
	    //renderer.domElement.style.border='2px solid red';
	    renderer.domElement.style.left = sx+'px';
	    renderer.domElement.style.top = sy+'px';
	    
	    //renderer.setClearColorHex(0xEEEEEE, 1);
		renderer.clear();


		blendMesh = new THREE.BlendCharacter();
		blendMesh.load( "models/ninja.json", start );
		//blendMesh.load( "models/marine_anims.js", start );

	}


	function start() {

		blendMesh.showModel( true );

		blendMesh.rotation.y = Math.PI * 180 / 180;
		blendMesh.scale.all = function(n){
			blendMesh.scale.x=n;
			blendMesh.scale.y=n;
			blendMesh.scale.z=n;

		};
		blendMesh.scale.all(10);
		scene.add( blendMesh );

/*		var aspect = 1;
		var radius = blendMesh.geometry.boundingSphere.radius;

		camera = new THREE.PerspectiveCamera( 45, aspect, 1, 10000 );
		camera.position.set( 0.0, radius, radius * 3.5 );*/

	var fov = 30;
	var width = renderer.domElement.width;
	var height = renderer.domElement.height;
	var aspect = width / height;
	var near = 1;
	var far = 1000;
	camera = new THREE.PerspectiveCamera (fov, aspect, near, far);
	camera.position.x =	270;
	camera.position.z = 240;
	camera.position.y = 240;
	camera.lookAt(new THREE.Vector3(0,90,0));



/*		blendMesh.animations[ 'idle' ].weight = 1 / 3;
		blendMesh.animations[ 'walk' ].weight = 1 / 3;
		blendMesh.animations[ 'run' ].weight = 1 / 3;
		blendMesh.play("run");
*/

		blendMesh.animations[ 'ninja.ms3d.act' ].weight = 1 / 3;
		blendMesh.play("ninja.ms3d.act");

		isFrameStepping = false;

		animate();
	}

	function animate() {

		requestAnimationFrame( animate, renderer.domElement );

		// step forward in time based on whether we're stepping and scale

		var scale = 1;
		var delta = clock.getDelta();
		var stepSize = (!isFrameStepping) ? delta * scale: timeToStep;

		// modify blend weights

		blendMesh.update( stepSize );

		THREE.AnimationHandler.update( stepSize );

		renderer.render( scene, camera );

		timeToStep = 0;
	}


}
