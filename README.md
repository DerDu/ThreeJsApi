### Files:

##### Basic (Required):

	- jQuery library
	- ThreeJs library

##### Api (Required):

	- TJSApi.js
	- TJSApi/FactoryTjs.js
	- TJSApi/FactoryApi.js
	- TJSApi/FactoryAPI/Renderer/Renderer.js
	- TJSApi/FactoryAPI/Renderer/Camera.js
	- TJSApi/FactoryAPI/Renderer/Scene.js
	- TJSApi/FactoryAPI/Renderer/Fog.js
	- TJSApi/FactoryAPI/Library/Geometry.js
	- TJSApi/FactoryAPI/Library/Material.js
	- TJSApi/FactoryAPI/Library/Texture.js
	- TJSApi/FactoryAPI/Library/Mesh.js
	- TJSApi/FactoryAPI/Library/Light/Ambient.js
	- TJSApi/FactoryAPI/Controller/Mouse.js
	- TJSApi/FactoryAPI/Controller/Camera/Orbit.js

##### Debug:

	- Stats (ThreeJs)

### Usage:

```php
// Create Engine instance

var Engine = TJSApi.Engine();

// Init Engine

Engine.Renderer(
		Engine.Factory().Renderer().WebGL()
	).Camera(
		Engine.Factory().Camera().Perspective()
	).Scene(
		Engine.Factory().Scene()
	);

// Setup Renderer

Engine.Renderer()
	.Display( 'jQuery-Selector of element to add the canvas' )
	.Width( 800 )
	.Height( 600 );

// Setup Camera

Engine.Camera()
	.FieldOfView( 40 )
	.AspectRatio(
		Engine.Renderer().Width() / Engine.Renderer().Height()
	)
	.NearClippingDistance( 0.1 )
	.FarClippingDistance( 10000 );

// Setup Scene

Engine.Scene().Add( Engine.Camera() );

// Add a Cube
var Material = Engine.Factory().Material().Mesh().Basic();

var Cube = Engine.Factory().Mesh().Basic(
	Engine.Factory().Geometry().Cube( 300, 300, 300 ),
	Material
);

Engine.Scene().Add( Cube );

// Add a Torus (with identical Material)

var Torus = Engine.Factory().Mesh().Basic(
	Engine.Factory().Geometry().Torus( 500, 30 ),
	Material
);

Engine.Scene().Add( Torus );

// Modify Cube ( AND Torus ) Material a little bit (after creation) maybe?

Material.Color('#00FF00');
Material.WireFrame(true);

// Lets get a better view..

Engine.Camera()
	.PositionZ(1000)
	.PositionY(1000)
	.PositionX(1000)
	.LookAt( Scene );

// Show me!

Engine.Animation.Loop = function() {
	Cube.RotationY( Cube.RotationY() + 0.01 );
};

// Extra information
// TJSApi.Debug.PerformanceMonitor.Enable( Engine );
// TJSApi.Debug.MessageMonitor.Enable( Engine );

// Go!
Engine.Animation.Run();
```
