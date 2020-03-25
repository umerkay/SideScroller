	db1 = document.getElementById("db1");
	ctx1 = db1.getContext("2d");
	w = 0; h = 0;
	db1.width = w;
	db1.height = h;

	var stop = false;
	var frameCount = 0;
	var fps, fpsInterval, startTime, now, then, elapsed;
	orientation = 1;
	b1Text = "Init"; toRemove = [];

function init(index) {

	for (i = 0; i < level.length; i++) {

	removeButton("L" + i);
	}
	message = ""

	index = index || document.getElementById("blockID").value;
	w = 900; h = 600; width = w; height = h; fps = 60; toRemove = [];

	setup();

	fillRect(ctx1,0,0,w,h,"#212121");

	addButton("header","pause","pause();",orientation);
	//addButton("header","full","fullScreen();",orientation);
	//editText("full","⇱");
	//toRemove.push("pause");
	editText("pause","II");

	db1.width = w;
	db1.height = h;
	editText("b1","Exit");
	editClick("b1",exit);
	//editClass("b1","green");
	frames = 0; t0 = 0;

	init_sub(index);

	output("Initiated loop");
	setGameloop(update,fps);
}
function update(temp) {

	now = Date.now();
    elapsed = now - then;

    draw();
    if (elapsed > fpsInterval) {
    // 	Math.floor(output(1000/elapsed);)
    frames++;

	if(t0!=Math.floor(performance.now()/1000)) {
		frames0 = frames;
		output(frames0 + "/" + fps + " cps");
		// output(getTile(mouse.x,mouse.y));
		frames = 0;
		t0 = Math.floor(performance.now()/1000);
	}

        then = now - (elapsed % fpsInterval);

	update_sub();

	}
	//console.log(doPause);
	if(temp!=0 && doPause == false) {
		req = requestAnimationFrame(update);
	} else {
		ctx1.globalAlpha = 0.8;
		ctx1.fillStyle = "black";
		ctx1.fillRect(0,0,w,h);
		ctx1.fillStyle = "white";
		ctx1.textAlign="center"; 
		ctx1.font="30px Arial";
		ctx1.globalAlpha = 1;
		ctx1.fillText(message || "Paused",w/2,h/2);
		window.cancelAnimationFrame(req);
	}
}
function exit() {

	//your code here
	exit_sub();
	//leave beyond this
	
	/*removeButton("pause");
	removeButton("pauseHolder");*/

	for(i=0;i<toRemove.length;i++) {

		removeButton(toRemove[i]);
	}

	update(0);
	
	output("Terminated Loop");
	w = 0; h = 0;
	db1.width = w;
	db1.height = h;
	editText("b1",b1Text);
	// editClick("b1",init);
	document.getElementById("b1").setAttribute( "onClick", "init(0);" );
	for (i = 0; i < level.length; i++) {

		addButton("L" + i + "Holder","L" + i,"init(" + i + ");",orientation);
		editText("L" + i, i);
		console.log(i);
	}
}
function pause() {

	update(0);
	editClick("pause",resume);
	editText("pause","►");
}
function resume() {

	if(doPause) {
		player.respawn();
		doPause = false;
	}
	update();
	editClick("pause",pause);
	editText("pause","II");
}
function setGameloop(f,fps) {

	fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;

	(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.RequestAnimationFrame = requestAnimationFrame;
})();

	req = requestAnimationFrame(f);
}
function editText(id,text) {

	document.getElementById(id).innerHTML = text;
}
function editClick(id,f) {
	//console.log(f);
	document.getElementById(id).onclick = f;
	//console.log(document.getElementById("b1").onclick);
}
function addButton(holder,id,click,orientation) {

	if(orientation == 0) {

		if(holder=="header") {
			document.getElementById("header").innerHTML += "<tr id='" + id + "Holder'></tr>"
			document.getElementById(id + "Holder").innerHTML += "<td><button id='" + id + "' onClick='" + click + "'> Empty </button></td>"
			toRemove.push(id + "Holder");
		} else if(holder=="footer") {
			document.getElementById("footer").innerHTML += "<tr></tr>"
			document.getElementById(id + "Holder").innerHTML += "<td><button id='" + id + "' onClick='" + click + "'> Empty </button></td>"
			toRemove.push(id + "Holder");
		}
	} else {
		toRemove.push(id + "Holder");

		if(holder=="header") {
			document.getElementById("headerR").innerHTML += "<td id='" + id + "Holder'><button id='" + id + "' onClick='" + click + "'> Empty </button></td>"
		} else if(holder=="footer") {
			document.getElementById("footerR").innerHTML += "<td id='" + id + "Holder'><button id='" + id + "' onClick='" + click + "'> Empty </button></td>"
		} else {
			document.getElementById(holder).innerHTML += "<button id='" + id + "' onClick='" + click + "'> Empty </button>"
		
		}
	}
	
	return document.getElementById(id);
}
function removeButton(id) {

	//console.log(id);
	var element = document.getElementById(id);
	parent = element.parentNode;
    parent.removeChild(element);
}
function random(from,to,int) {
	if(int) {
	return Math.floor(Math.random()*(to + 1 - from)) + (from);
	} else {
	return Math.random()*(to + 1 - from) + (from);
	}
}
function output(message) {

	editText("output", message);
}
function fillRect(ctx,x,y,w,h,color,stroke,strokeColor) {
	ctx.fillStyle = color || "white";
	ctx.strokeStyle = strokeColor || "black";
	ctx.lineWidth = stroke || 0;
	ctx.fillRect(x,y,w,h);
	if(stroke > 0)
		ctx.strokeRect(x,y,w,h);
}
function fillCircle(ctx,x,y,w,h,color) {
	ctx.fillStyle = color || "white";
	ctx.beginPath();
	ctx.arc(x + (w/2),y + (h/2),h/2,0,2*Math.PI);
	ctx.fill();
}
function clearCanvas(ctx) {
	
	ctx.clearRect(0,0,w,h);
}

function editClass(id,type) {

	document.getElementById(id).className = type; 
}
function rotate(ctx,x,y,w,h,angle) {

	ctx.save();
	ctx.translate(x+(w/2),y+(h/2));
    ctx.rotate( angle*Math.PI/180 ); 
    ctx.translate(-(x+(w/2)),-(y+(h/2)));
}
function load(name) {

	img = new Image();
	img.src = name;
	return img;
	img.onload = function(){
		}
}
function fullScreen() {

	/*newWidth = window.innerWidth;
	newHeight = height/(width) * newWidth;

	if(newHeight > window.innerHeight) {
	newHeight = window.innerHeight;
	newWidth = width / height * newHeight;
	}

	grid = grid / width * newWidth;
	w = newWidth; width = w;
	h = newHeight; height = h;
	db1.width = w;
	db1.height = h;

	init_sub(levelNo, grid);*/
}
