var App = function() {
	this.gl = glt.getGL(document.getElementById('canvas'), {alpha:false});


	var r = 54;
	var r2 = 2 * Math.sqrt(r*r - (r/2*r/2)); 
	var delta = 1.04719755;
	var delta2 = 30 * (Math.PI/180) ;

	var circles = [];

	for(var i=0; i < 5; i++) {
		
		var c;

		switch(i) {
			case 0 : 
				c = this.createCircle(350, 300);
				circles.push(c);
			break;

			case 1 :
				for(var j = 0; j < 6; j++) {
					c = 	this.createCircle(350 + r * Math.cos(j*delta), 300 + r * Math.sin(j*delta));
					circles.push(c);
				} 

				
				
			break;

			case 2 :
				for(var j = 0; j < 6; j++) {
					c = 	this.createCircle(350 + r2 * Math.cos(j*delta + delta2), 300 + r2 * Math.sin(j*delta + delta2));
					circles.push(c);
				} 

				
				
			break;
			case 3 :
				for(var j = 0; j < 6; j++) {
						c = this.createCircle(350 + r*2 * Math.cos(j*delta), 300 + r*2 * Math.sin(j*delta));
					circles.push(c);
				} 

				
				
			break;

			case 4 :
				for(var j = 0; j < 6; j++) {
					c = this.createCircle(350 + (r*3) * Math.cos(j*delta), 300 + (r*3) * Math.sin(j*delta));
					circles.push(c);
				} 	

			case 5 :
				for(var j = 0; j < 6; j++) {
					c = this.createCircle(350 + (r*3) * Math.cos(j*delta), 300 + (r*3) * Math.sin(j*delta));
					circles.push(c);
				} 

				
				
			break;
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
  c.style.background = '#ff0000'; 	
  console.log(circles)
  dancer.onceAt( 10, function() {
    // Let's set up some things once at 10 seconds
  	
  }).between( 10, 60, function() {
    // After 10s, let's do something on every frame for the first minute
  }).after( 1, function() {
    // After 60s, let's get this real and map a frequency to an object's y position
    // Note that the instance of dancer is bound to "this"
    
   	//console.log(c)
   	
    var s = this.getFrequency( 400 ) * 100000;
   	
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
	glt.raf();
	App.instance = new App();
}

App.prototype = {

	createCircle : function(x,y) {
		var c = document.createElement('div');
		c.className = 'circle';
		c.x = x;
		c.y = y;
		c.style.top = 	y+'px';
		c.style.left = 	x+'px';
		document.body.appendChild(c);
		return c;
	}

}

