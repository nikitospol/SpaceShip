var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var aster=[];
var fire = [];
var expl = [];
var timer=0;
var ship = {x:300, y:300};

var fireimg = new Image();
fireimg.src = "img/fire.png";

var asterimg = new Image();
asterimg.src = "img/asteroid.png";

var shipimg = new Image();
shipimg.src = "img/ship.png";

var explimg = new Image();
explimg.src = "img/expl222.png";

var fonimg = new Image();
fonimg.src = "img/fon.jpg";

canvas.addEventListener("mousemove", function(event) {
	ship.x = event.offsetX-25;
	ship.y = event.offsetY-13;
});

explimg.onload = function() {
	game();
}

function game() {
	update();
	render();
	requestAnimFrame(game);
}

function update() {
	timer++;
	if (timer%20 == 0) {
		aster.push({
			x: Math.random()*600, 
			y: -50, 
			dx:Math.random()*6-1, 
			dy:Math.random()*6+2, 
			del:0,
		});
	}
	if (timer%30==0) {
		fire.push({x:ship.x+10,y:ship.y,dx:0,dy:-5.2})
		fire.push({x:ship.x+10,y:ship.y,dx:0.5,dy:-5})
		fire.push({x:ship.x+10,y:ship.y,dx:-0.5,dy:-5.2})
	}

	for(i in fire) {
		fire[i].x=fire[i].x+fire[i].dx;
		fire[i].y=fire[i].y+fire[i].dy;
		if(fire[i].y<-30) fire.splice(i,1);
	}

	for (i in expl) {
		expl[i].animx=expl[i].animx+0.5;
		if (expl[i].animx>7) {expl[i].animy++; expl[i].animx=0}
		if (expl[i].animy>7) 
		expl.splice(i,1);
	}

	for(i in aster) {
	aster[i].x=aster[i].x+aster[i].dx;
	aster[i].y=aster[i].y+aster[i].dy;
	if (aster[i].x>=525 || aster[i].x<0) aster[i].dx=-aster[i].dx;
	if (aster[i].y>=600) aster.splice(i,1);
		for (j in fire) {

		if (Math.abs(aster[i].x+25-fire[j].x-15)<50 && Math.abs(aster[i].y-fire[j].y)<25) {
	
		expl.push({x:aster[i].x-25,y:aster[i].y-25,animx:0,animy:0});
		
		aster[i].del=1;
		fire.splice(j,1);break;
		}
		}
		if (aster[i].del==1) aster.splice(i,1);
	
	}
}

function render() {
	ctx.drawImage(fonimg, 0, 0, 600, 600);
	ctx.drawImage(shipimg, ship.x, ship.y, 100, 100);
	for(i in fire) ctx.drawImage(fireimg, fire[i].x, fire[i].y, 40, 40)
	for(i in aster) ctx.drawImage(asterimg, aster[i].x, aster[i].y, 75, 75);
	for (i in expl)
	ctx.drawImage(explimg, 128*Math.floor(expl[i].animx),128*Math.floor(expl[i].animy),128,128, expl[i].x, expl[i].y, 100, 100);
} 

var requestAnimFrame = (function() {
	return window.requestAnimFrame ||
		window.webkitRequestAnimFrame ||
		window.mozRequestAnimFrame ||
		window.oRequestAnimFrame ||
		window.msRequestAnimFrame ||
		function(callback){
			window.setTimeout(callback, 1000/20);
		};
})();