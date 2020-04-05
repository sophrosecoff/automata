const ROWCOUNT = 10;
const COLCOUNT = 15;

var grid;

function initgrid(){
	var grid = new Array(ROWCOUNT)
	for(var r = 0; r < ROWCOUNT; r++){
		grid[r] = new Array(COLCOUNT);
		grid[r].fill(0);
	}
	return grid;
}

function shouldbirth(grid, r, c, val){
	var liveneighbors = 0 
	if (r > 0 && grid[r-1][c] == 1){
		liveneighbors = liveneighbors+1
	}
	if (r > 0 && c < COLCOUNT - 1 && grid[r-1][c+1] == 1){
		liveneighbors = liveneighbors+1
	}
	if (c < COLCOUNT - 1 && grid[r][c+1] == 1){
		liveneighbors = liveneighbors+1
	}
	if (r < ROWCOUNT - 1 && c < COLCOUNT - 1 && grid[r+1][c+1] == 1){
		liveneighbors = liveneighbors+1
	}
	if (r < ROWCOUNT - 1 && grid[r+1][c] == 1){
		liveneighbors = liveneighbors+1
	}
	if (r < ROWCOUNT -1 && c > 0 && grid[r+1][c-1] == 1){
		liveneighbors = liveneighbors+1
	}
	if (c > 0 && grid[r][c-1] == 1){
		liveneighbors = liveneighbors+1
	}
	if (r > 0 && c > 0 && grid[r-1][c-1] == 1){
		liveneighbors = liveneighbors+1
	}
	return val == 0 && liveneighbors == 3
}

function nextgen(){
	var newgrid = initgrid();
	for(var r = 0; r < ROWCOUNT; r++){
		for(var c = 0; c < COLCOUNT; c++){
			if (shouldbirth(grid, r, c, grid[r][c])){
				newgrid[r][c] = 1
			}
			else{
				newgrid[r][c] = grid[r][c]
			}
		}
	}
	for(var r = 0; r < ROWCOUNT; r++){
		for(var c = 0; c < COLCOUNT; c++){
			grid[r][c] = newgrid[r][c]
		}
	}
}

function render(){
	for(var r = 0; r < ROWCOUNT; r++){
		for(var c = 0; c < COLCOUNT; c++){
			if(grid[r][c] == 1){
				document.getElementById("board").rows[r].cells[c].className = "alive";
			}
			else{
				document.getElementById("board").rows[r].cells[c].className = "dead";
			}
		}
	}
}

//START

function start(){
	grid = initgrid();
	grid[3][5] = 1
	grid[3][6] = 1
	grid[1][5] = 1
	render();
}

function nextgenbutton(){
	nextgen();
	render();
}

	
