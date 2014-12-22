var App = function() {



	///this.gl = glt.getGL(document.getElementById('canvas'), {alpha:false});
    this.canvas = new App.CanvasThree();

    this.el = document.getElementById('grid');

    this.items = document.getElementsByClassName('item');


    for(var i = 0, l = this.items.length; i < l; ++i ) {

        var item = this.items[i];
        //item.style.opacity = 1;
        setTimeout((function(el){
            el.style.opacity = 1;
        }).bind(this), i * 300, item);
    }



    window.addEventListener('resize', this.resize.bind(this));



        //document.getElementById('canvas-css').style.left = ((window.innerWidth -1600) * .5) + 'px';









        this.resize();

}

App.Main = function() {
	//glt.raf();
	App.instance = new App();
}

App.prototype = {

    resize : function(e) {

        var w = window.innerWidth;
        var h = window.innerHeight;
        var thirdHeight;
        var padding;

        if(w > h) {
            padding = h / 100;
            w = h;
        } else {
            padding = w / 100;
            h = w;
        }


        thirdHeight = h / 3;

        this.el.style.height = h + 'px';
        this.el.style.width = w + 'px';

        var i = 0, l = this.items.length;
        var item;
        for(; i < l; ++i) {
            item = this.items[i];
            item.style.height = thirdHeight + 'px'
            item.style.padding = padding + 'px'
        }


        this.canvas.resize()
    },

	createCircle : function(x,y,color, scale) {

		var c = document.createElement('div');
		c.className = 'circle';
        c.style.borderColor = color;
		c.x = x;
		c.y = y;
        c.style.webkitTransform = 'scale(' + scale + ',' + scale + ')';
		c.style.top = 	y+'px';
		c.style.left = 	x+'px';
		document.getElementById('canvas-css').appendChild(c);
		return c;
	},

    createDCircle : function(x,y,color, scale) {

        var c = document.createElement('div');
        c.className = 'circle2';
        c.style.borderColor = color;
        c.x = x;
        c.y = y;
        c.style.webkitTransform = 'scale(' + scale + ',' + scale + ')';
        c.style.top = 	y+'px';
        c.style.left = 	x+'px';
        document.getElementById('canvas-css').appendChild(c);
        return c;
    }

}

App.CanvasThree = function() {

    //this.dancer = dancer;

    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    //this.camera = new THREE.OrthographicCamera( SCREEN_WIDTH / - 2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / - 2, 1, 1000 );
    this.controls = new THREE.TrackballControls( this.camera );

    this.scene.add(this.camera);
    this.camera.position.set(0,0,33.9);






    this.renderer = new THREE.WebGLRenderer( {antialias:true, alpha:true} );

    this.composer = new THREE.EffectComposer( this.renderer );
    this.composer.addPass( new THREE.RenderPass( this.scene, this.camera ) );

//    var effect = new THREE.ShaderPass( THREE.DotScreenShader );
//    effect.uniforms[ 'scale' ].value = 4;
//    this.composer.addPass( effect );
//
//    var effect = new THREE.ShaderPass( THREE.RGBShiftShader );
//    effect.uniforms[ 'amount' ].value = 0.0015;
//    effect.renderToScreen = true;
//    this.composer.addPass( effect );


    effect = new THREE.ShaderPass( THREE.DotScreenShader );
    effect.renderToScreen = true;
    //this.composer.addPass( effect );

    effect = new THREE.ShaderPass( THREE.VignetteShader );
    effect.uniforms[ "darkness" ].value = .5;
    effect.renderToScreen = true;
    this.composer.addPass( effect );

    // create a custom render target with a stencil buffer
//    // the stencil buffer allows for masking to take place
//    this.renderTargetParameters = {
//        minFilter: THREE.LinearFilter,
//        magFilter: THREE.LinearFilter,
//        format: THREE.RGBAFormat,
//        //stencilBuffer: true
//    };
//
//    this.renderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, this.renderTargetParameters );
//    this.composer = new THREE.EffectComposer( this.renderer, this.renderTarget );
//




    this.cube = new THREE.Mesh(new THREE.CubeGeometry(), new THREE.MeshBasicMaterial());
    this.cube = new THREE.Mesh( new THREE.CubeGeometry(23, 23, 1), new THREE.MeshNormalMaterial() );
    //this.cube.position.y = 150;


    var r = 13.7;
    var lineWidth = 3;
    var lineColor = 0x333333;


    this.circleGeometry = new THREE.CircleGeometry(r, 100);
    this.circleGeometry.vertices.shift();

    this.circle = new THREE.Line(this.circleGeometry, new THREE.LineBasicMaterial({color : lineColor, linewidth : 9}))
    //this.scene.add(this.circle);

    this.circle = new THREE.Line(this.circleGeometry, new THREE.LineBasicMaterial({color : lineColor, linewidth : lineWidth}))
    //this.circle.geometry.vertices.shift();
    this.scene.add(this.circle);

//    this.circle = new THREE.Line(new THREE.CircleGeometry(r, 100), new THREE.LineBasicMaterial({color : 0x333333, linewidth : 3}))
//    this.circle.position.x = -27.6
//    this.scene.add(this.circle);
//    this.circle = new THREE.Line(new THREE.CircleGeometry(r, 100), new THREE.LineBasicMaterial({color : 0x333333, linewidth : 3}))
//    this.circle.position.x = -r
//    this.scene.add(this.circle);
//
//    this.circle = new THREE.Line(new THREE.CircleGeometry(r, 100), new THREE.LineBasicMaterial({color : 0x333333, linewidth : 3}))
//    this.circle.position.y = -27.6
//    this.scene.add(this.circle);
//
//    this.circle = new THREE.Line(new THREE.CircleGeometry(r, 100), new THREE.LineBasicMaterial({color : 0x333333, linewidth : 3}))
//    this.circle.position.y = -27.6
//    this.circle.position.x = -27.6
//    this.scene.add(this.circle);







    ////       //////// /////


    //var r = 161;
    var d = Math.sqrt((2*r)*(2*r) - r*r);
    var d2 = Math.sqrt( (r/2)*(r/2) + (d + d/2) * (d + d/2) );
    var d3 = Math.sqrt((d/2)*(d/2) + (3*r+r/2) * (3*r+r/2));
    var d4 = Math.sqrt((d/2)*(d/2) + (4*r+r/2) * (4*r+r/2));

    var dRatio = d2 / d;
    var rRatio = d / r
    var r2Ratio = d2 / r
    var r3Ratio = d3 / r
    var r2 = 2 * Math.sqrt(r*r - (r/2*r/2));
    var DEG_60 = 1.04719755;
    var DEG_30 = 30 * (Math.PI/180) ;

    var delta1 = 2*r/d;
    var delta2 = 3*r/d2;
    var delta3 = 4*r/d3;


    var alpha1 =  Math.asin((d/2) / d);
    console.log('ALPHA1', alpha1*180/Math.PI);

    var alpha2 =  Math.asin((d/2) / d2);
    console.log('ALPHA2', alpha2*180/Math.PI);

    var alpha3 =  Math.asin((d/2) / d3);
    console.log('ALPHA3', alpha3*180/Math.PI);

    var alpha4 =  Math.asin((d/2) / d4);
    console.log('ALPHA4', alpha4*180/Math.PI);


    for(var j = 0; j < 6; j++) {


        this.circle = new THREE.Line(this.circleGeometry, new THREE.LineBasicMaterial({color : lineColor, linewidth : lineWidth}))
        this.circle.position.x  = + r * Math.cos(j*DEG_60)
        this.circle.position.y = r * Math.sin(j*DEG_60)
        //this.circle.geometry.vertices.shift();
        this.scene.add(this.circle);

        //c = 	this.createCircle(800 + r * Math.cos(j*DEG_60), 535 + r * Math.sin(j*DEG_60));
    }


    for(var j = 0; j < 6; j++) {

        this.circle = new THREE.Line(this.circleGeometry, new THREE.LineBasicMaterial({color : lineColor, linewidth : lineWidth}))
        this.circle.position.x  = d * Math.cos(j*DEG_60 + DEG_30)
        this.circle.position.y = d * Math.sin(j*DEG_60 + DEG_30)

        this.scene.add(this.circle);

    }



    for(var j = 0; j < 6; j++) {
        this.circle = new THREE.Line(this.circleGeometry, new THREE.LineBasicMaterial({color : lineColor, linewidth : lineWidth}))
        this.circle.position.x  = r*2 * Math.cos(j*DEG_60)
        this.circle.position.y = r*2 * Math.sin(j*DEG_60)
        //this.circle.geometry.vertices.shift();
        this.scene.add(this.circle);

    }


    //var wave = this.dancer.getWaveform();
    var vertices = this.circleGeometry.vertices;
    var  i = 0, l = vertices.length;

    for(; i < l; ++i) {
        vertices[i]._x = vertices[i].x;
    }




    this.renderer.render( this.scene, this.camera );

    document.getElementById('canvas-three').appendChild(this.renderer.domElement);

    this.startTime = 0.0;

    this.animate();



    var debugaxis = function(context, axisLength){

        var self = context;
        //Shorten the vertex function
        function v(x,y,z){
            return new THREE.Vertex(new THREE.Vector3(x,y,z));
        }

        //Create axis (point1, point2, colour)
        function createAxis(p1, p2, color){
            var line, lineGeometry = new THREE.Geometry(),
                lineMat = new THREE.LineBasicMaterial({color: color, lineWidth: 1});
            lineGeometry.vertices.push(p1, p2);
            line = new THREE.Line(lineGeometry, lineMat);
            self.scene.add(line);
        }

        createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000);
        createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00);
        createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF);
    };

   // debugaxis(this, 100)


}

App.CanvasThree.prototype = {

    resize : function() {



        var width, height;
        width = window.innerWidth; // for example
        height = window.innerHeight; // for example

        //First update the camera's aspect ratio: width / height
        this.camera.aspect = width/height;

        //Whenever you make a change to the camera,
        //you must update for your changes to take effect
        this.camera.updateProjectionMatrix();

        //Here we reset the size of the window to the new height
        this.renderer.setSize(width, height);

        document.getElementById('items').style.width

        this.renderer.render( this.scene, this.camera );
    },

    animate : function () {
        // render the 3D scene

        this.controls.update();
        this.render();
        // relaunch the 'timer'
        requestAnimationFrame( this.animate.bind(this) );


    },

    render: function() {
        this.cube.position.x = -24.5;
        //this.cube.position.y = -25;
        this.cube.position.z = 11.5;
        // make the cube bounce
        var dtime	= Date.now() - this.startTime;

        if(this.rotate) {
           this.camera.rotateCamera
        }


        //var wave = this.dancer.getWaveform();
        var vertices = this.circleGeometry.vertices;
        var  i = 0, l = vertices.length;

        for(; i < l; ++i) {
            vertices[i].x = vertices[i]._x + wave[i];
        }

        this.circleGeometry.dynamic = true;
        //this.circleGeometry.computeFaceNormals();
        //this.circleGeometry.computeVertexNormals();
        this.circleGeometry.verticesNeedUpdate = true;
        //this.circleGeometry.normalsNeedUpdate = true;


        //cube.scale.x	= 1.0 + 0.3*Math.sin(dtime/300);
        //cube.scale.y	= 1.0 + 0.3*Math.sin(dtime/300);
        //cube.scale.z	= 1.0 + 0.3*Math.sin(dtime/300);
        // actually display the scene in the Dom element
        this.composer.render(1000);
        //this.renderer.render( this.scene, this.camera );
    }

}

App.CanvasCSS = function() {
    var r = 161;
    var d = Math.sqrt((2*r)*(2*r) - r*r);
    var d2 = Math.sqrt( (r/2)*(r/2) + (d + d/2) * (d + d/2) );
    var d3 = Math.sqrt((d/2)*(d/2) + (3*r+r/2) * (3*r+r/2));
    var d4 = Math.sqrt((d/2)*(d/2) + (4*r+r/2) * (4*r+r/2));

    var dRatio = d2 / d;
    var rRatio = d / r
    var r2Ratio = d2 / r
    var r3Ratio = d3 / r
    var r2 = 2 * Math.sqrt(r*r - (r/2*r/2));
    var DEG_60 = 1.04719755;
    var DEG_30 = 30 * (Math.PI/180) ;

    var delta1 = 2*r/d;
    var delta2 = 3*r/d2;
    var delta3 = 4*r/d3;


    var alpha1 =  Math.asin((d/2) / d);
    console.log('ALPHA1', alpha1*180/Math.PI);

    var alpha2 =  Math.asin((d/2) / d2);
    console.log('ALPHA2', alpha2*180/Math.PI);

    var alpha3 =  Math.asin((d/2) / d3);
    console.log('ALPHA3', alpha3*180/Math.PI);

    var alpha4 =  Math.asin((d/2) / d4);
    console.log('ALPHA4', alpha4*180/Math.PI);

    console.log('DELTAS', delta1, delta2, delta3)

    console.log('DELTA of DELTAS', delta1-delta2, delta2- delta3)

    console.log('d', d);
    console.log('d2', d2)
    console.log('dRAT/iO', dRatio)
    console.log('rRAT/iO', rRatio);
    console.log('r2RAT/iO', r2Ratio)
    console.log('r3RAT/iO', r3Ratio)
    console.log('DELTA of RATIOS', r2Ratio-rRatio, r3Ratio-r2Ratio)
    var circles = [];



    c = this.createDCircle(800, 535, 'black', 2);

    c = this.createDCircle(800, 535, 'green', rRatio);



    c = this.createDCircle(800, 535, 'green', r2Ratio);
    c = this.createDCircle(800, 535, 'black', 3);

    c = this.createDCircle(800, 535, 'green', r3Ratio);
    c = this.createDCircle(800, 535, 'blue', rRatio);
    c = this.createDCircle(800, 535, 'black', 4);









    for(var i=0; i < 6; i++) {

        var c;

        switch(i) {
            case 0 :
                c = this.createCircle(800, 535);
                circles.push(c);
                break;

            case 1 :
                for(var j = 0; j < 6; j++) {
                    c = 	this.createCircle(800 + r * Math.cos(j*DEG_60), 535 + r * Math.sin(j*DEG_60));
                    circles.push(c);
                }



                break;
//
            case 2 :
                for(var j = 0; j < 6; j++) {
                    c = 	this.createCircle(800 + d * Math.cos(j*DEG_60 + DEG_30), 535 + d * Math.sin(j*DEG_60 + DEG_30));
                    circles.push(c);
                }



                break;
            case 3 :
                for(var j = 0; j < 6; j++) {
                    c = this.createCircle(800 + r*2 * Math.cos(j*DEG_60), 535 + r*2 * Math.sin(j*DEG_60));
                    circles.push(c);
                }



                break;
////
            case 4 :
                var angle = alpha2
                for(var j = 0; j < 6; j++) {
                    //if(2 % j == 0) angle += DEG_60;

                    c = this.createCircle(800 + d2  * Math.cos(angle), 535 + d2  * Math.sin(angle));
                    angle += (DEG_60)
                    circles.push(c);
                }

                angle = -alpha2;

                for(var j = 0; j < 6; j++) {
                    //if(2 % j == 0) angle += DEG_60;

                    c = this.createCircle(800 + d2  * Math.cos(angle), 535 + d2  * Math.sin(angle));
                    angle += (DEG_60)
                    circles.push(c);
                }

                break;
            case 5 :
                for(var j = 0; j < 6; j++) {
                    c = this.createCircle(800 + (r*3) * Math.cos(j*DEG_60), 535 + (r*3) * Math.sin(j*DEG_60));
                    circles.push(c);
                }

            case 6 :
                var angle = alpha3
                for(var j = 0; j < 6; j++) {
                    //if(2 % j == 0) angle += DEG_60;

                    c = this.createCircle(800 + d3  * Math.cos(angle), 535 + d3  * Math.sin(angle), 'red');
                    angle += (DEG_60)
                    circles.push(c);
                }

                angle = -alpha3;

                for(var j = 0; j < 6; j++) {
                    //if(2 % j == 0) angle += DEG_60;

                    c = this.createCircle(800 + d3  * Math.cos(angle), 535 + d3  * Math.sin(angle), 'red');
                    angle += (DEG_60)
                    circles.push(c);
                }

            case 5 :
                for(var j = 0; j < 6; j++) {
                    c = this.createCircle(800 + (r*4) * Math.cos(j*DEG_60), 535 + (r*4) * Math.sin(j*DEG_60));
                    circles.push(c);
                }
//
//
//
//			break;
        }



    }

}

