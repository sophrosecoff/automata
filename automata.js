var rowcount = 26;
var colcount = 29;

var dragging = false;

var dragoperation = 1;

var grid;

var timeout = null; 

var generationnumber = 0;

var playspeed = 50;

function changespeed(){
	playspeed = parseInt(document.getElementById("playspeed").value, 10);
}

function resizeboard(){
	rowcount = parseInt(document.getElementById("rowfield").value, 10);
	colcount = parseInt(document.getElementById("colfield").value, 10);
	generationnumber = 0;
	start();
}

function createboard(){
	var board = document.getElementById("board");
	board.innerHTML = "";
	for (row = 0; row < rowcount; row++){
		var rowElement = document.createElement("tr");
		board.appendChild(rowElement);
		for (col = 0; col < colcount; col++){
			var colElement = document.createElement("td");
			rowElement.appendChild(colElement);
		}
	}
}

function initgrid(){
	var grid = new Array(rowcount)
	for(var r = 0; r < rowcount; r++){
		grid[r] = new Array(colcount);
		grid[r].fill(0);
	}
	return grid;
}
function liveneighbors(grid, r, c){
	var liveneighbors = 0 
	if (r > 0 && grid[r-1][c] == 1){
		liveneighbors = liveneighbors+1
	}
	if (r > 0 && c < colcount - 1 && grid[r-1][c+1] == 1){
		liveneighbors = liveneighbors+1
	}
	if (c < colcount - 1 && grid[r][c+1] == 1){
		liveneighbors = liveneighbors+1
	}
	if (r < rowcount - 1 && c < colcount - 1 && grid[r+1][c+1] == 1){
		liveneighbors = liveneighbors+1
	}
	if (r < rowcount - 1 && grid[r+1][c] == 1){
		liveneighbors = liveneighbors+1
	}
	if (r < rowcount -1 && c > 0 && grid[r+1][c-1] == 1){
		liveneighbors = liveneighbors+1
	}
	if (c > 0 && grid[r][c-1] == 1){
		liveneighbors = liveneighbors+1
	}
	if (r > 0 && c > 0 && grid[r-1][c-1] == 1){
		liveneighbors = liveneighbors+1
	}
	return liveneighbors;
}

function shouldbirth(grid, r, c, val){
	return val == 0 && liveneighbors(grid, r, c) == 3
}

function shoulddeath(grid, r, c, val){
	return val == 1 && (liveneighbors(grid, r, c) <= 1 || liveneighbors(grid, r, c) >= 4)
}

function nextgen(){
	var newgrid = initgrid();
	for(var r = 0; r < rowcount; r++){
		for(var c = 0; c < colcount; c++){
			if (shouldbirth(grid, r, c, grid[r][c])){
				newgrid[r][c] = 1
			}
			else if (shoulddeath(grid, r, c, grid[r][c])){
				newgrid[r][c] = 0
			}
			else{
				newgrid[r][c] = grid[r][c]
			}
		}
	}
	var changed = false; 
	for(var r = 0; r < rowcount; r++){
		for(var c = 0; c < colcount; c++){
			if (grid[r][c] != newgrid[r][c]){
				changed = true;
			}
			grid[r][c] = newgrid[r][c]
		}
	}
	generationnumber++;
	return changed;
}

function render(){
	document.getElementById("generationNumber").innerText = generationnumber;

	if (timeout == null){
		document.getElementById("playbutton").disabled = false;
		document.getElementById("pausebutton").disabled = true;
	} else {
		document.getElementById("playbutton").disabled = true;
		document.getElementById("pausebutton").disabled = false; 
	}

	document.getElementById("rowfield").value = rowcount;
	document.getElementById("colfield").value = colcount;

	for(var r = 0; r < rowcount; r++){
		for(var c = 0; c < colcount; c++){
			if(grid[r][c] == 1){
				document.getElementById("board").rows[r].cells[c].className = "alive";
			}
			else{
				document.getElementById("board").rows[r].cells[c].className = "dead";
			}
		}
	}
}

function makeOnMouseOver(r, c) { 
	return function(){
		if (dragging){
			grid[r][c] = dragoperation;
			render();
		}
	}
};

function makeOnMouseDown(r, c) { 
	return function(){
		dragging = true;
		grid[r][c] = grid[r][c] == 1? 0: 1;
		generationnumber = 0;
		render();
		dragoperation = grid[r][c];
	}
};

//START

function wireup(){
	var table = document.getElementById("board");
	var rows = table.getElementsByTagName("tr");
	for(var rownum = 0; rownum < rows.length; rownum++){
		var cells = rows[rownum].getElementsByTagName("td");
		for(var cellnum = 0; cellnum < cells.length; cellnum++){
			cells[cellnum].onmousedown = makeOnMouseDown(rownum, cellnum);
			cells[cellnum].onmouseover = makeOnMouseOver(rownum, cellnum);
		}
	}

}

function start(){
	grid = initgrid();
	createboard();
	wireup();
	render();
}

document.onmouseup = function(){
	dragging = false;
}

function play(){
	var changed = nextgen();
	if(changed){
		timeout = setTimeout(play, 10 + ((100 - playspeed) * 9.9));
	}
	else {
		timeout = null;
	}
	render();
}

function pausebutton(){
	if(timeout != null){
		clearTimeout(timeout);
		timeout = null;
		render();
	}
}

function nextgenbutton(){
	nextgen();
	render();
}

window.onload = start;

	
