#### Trying to write a little more object-oriented / combined API for ThreeJs ...

---

### Usage:

```php
// Create engine instance

var Engine = TJSApi.Engine();

// Create essential objects

var Renderer = Engine.Factory().Renderer().WebGL();
var Camera = Engine.Factory().Camera().Perspective();
var Scene = Engine.Factory().Scene();

// Init engine

Engine.Renderer( Renderer ).Camera( Camera ).Scene( Scene );

// Setup renderer

Engine.Renderer().Display( 'jQuery-Selector of element to add the canvas' ).Width( 800 ).Height( 600 );

// Setup camera

Engine.Camera()
	.FieldOfView( 40 )
	.AspectRatio( Engine.Renderer().Width() / Engine.Renderer().Height() )
	.NearClippingDistance( 0.1 )
	.FarClippingDistance( 10000 );

// Setup scene

Engine.Scene().Add( Camera );

// Add a cube

var GeometryCube = Engine.Factory().Geometry().Cube( 300, 300, 300 );
var MaterialCube = Engine.Factory().Material().Mesh().Basic();
var MeshCube = Engine.Factory().Object().Mesh( GeometryCube, MaterialCube );

Engine.Scene().Add( MeshCube );

// Modify cub material a little bit (after creation) maybe?

MaterialCube.Color('#00FF00');
MaterialCube.WireFrame(true);

// Lets get a better view..

Engine.Camera().PositionZ(1000).PositionY(1000).PositionX(1000).LookAt( Scene );


// Show me!

Engine.Animation.Loop = function() {
	MeshCube.RotationY( MeshCube.RotationY() + 0.01 );
};

// Extra information
TJSApi.Debug.PerformanceMonitor.Enable( Engine );
TJSApi.Debug.MessageMonitor.Enable( Engine );

// Go!
Engine.Animation.Run();
```

---

### Files:

##### Basic (Required):

	- jQuery
	- ThreeJs

##### Api (Required):

	- TJSApi
	- FactoryTJS
	- FactoryAPI
	- FactoryAPI/Camera
	- FactoryAPI/Fog
	- FactoryAPI/Geometry
	- FactoryAPI/Material
	- FactoryAPI/Mouse
	- FactoryAPI/Object
	- FactoryAPI/Renderer
	- FactoryAPI/Scene
	- FactoryAPI/Texture

##### Debug:

	- Stats (ThreeJs)
