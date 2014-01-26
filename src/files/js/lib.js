var App = function() {
	///this.gl = glt.getGL(document.getElementById('canvas'), {alpha:false});

    window.addEventListener('resize', function(e) {
        document.getElementById('canvas-css').style.left = ((window.innerWidth -1600) * .5) + 'px';
    })
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

	var dancer = new Dancer();

	// Using an audio object
	// var a = new Audio();
	// a.src = 'somesong.mp3';
	// dancer.load( a );

	// Using an audio element on the page
	//dancer.load( document.getElementsByTagName('audio')[0] );

	// Using a config object and you only have one encoding
	//dancer.load({ src: 'somesong.mp3' });

	// Using a config object, and you have an ogg and mp3 version
	
	kick = dancer.createKick({
      onKick: function ( mag ) {
        //console.log('Kick!');
      },
      offKick: function ( mag ) {
        //console.log('no kick :(');
      }
    });

  // Let's turn this kick on right away
  kick.on();
  //c.style.background = '#ff0000';
  console.log(circles)
  dancer.onceAt( 10, function() {
    // Let's set up some things once at 10 seconds
  	
  }).between( 10, 60, function() {
    // After 10s, let's do something on every frame for the first minute
  }).after( 1, function() {
    // After 60s, let's get this real and map a frequency to an object's y position
    // Note that the instance of dancer is bound to "this"
    
   	//console.log(c)
   	
    var s = this.getFrequency( 535 ) * 100000;
   	
   	for(var i = 0; i < circles.length; i++) {
   		c = circles[i];
   		//console.log(c)
   		if(c)
   		c.style.webkitTransform = 'translate(0px,' + (s) + 'px)'
   		//c.style.left = c.x + s + 'px';
   	}
  }).onceAt( 120, function() {
    // After 120s, we'll turn the kick off as another object's y position is still being mapped from the previous "after" method
    kick.off();
  }).load({ src: '/music/PumpPatterns01', codecs: [  'mp3' ]}); // And finally, lets pass in our Audio element to load

  dancer.play().setVolume(0);

	// var audio = new Audio();
	// 	audio.src = '/music/PumpPatterns01.mp3';
	// 	audio.play();
	// 	audio.onload = function() {
	// 		var ctx = new webkitAudioContext();
 // 	  		var streamingAudioSource = ctx.createMediaElementSource(audio);
 // 			console.log('HERE')
	// 	}

	
// 	var jsProcessor = ctx.createJavaScriptNode(4096,1,1);
// //jsProcessor.onaudioprocess = process;
// var analyser = ctx.createAnalyser();
// analyser.fftSize = 2048;
// 	streamingAudioSource.connect(jsProcessor);
// //jsProcessor.connect(analyser);
// analyser.connect(ctx.destination);
// //autoplay
// //audio.play();
// function process(event){
//     var freqByteData = new Uint8Array(analyser.frequencyBinCount);
//     analyser.getByteFrequencyData(freqByteData);
//     //console.log(freqByteData);
// }

}

App.Main = function() {
	//glt.raf();
	App.instance = new App();
}

App.prototype = {

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

