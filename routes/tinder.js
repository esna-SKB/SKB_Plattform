
'strict'
var PriorityQueue = require('js-priority-queue');

function tinder(users, matrix, sizeOfG){
	if(users.length>25) return null; //safty dauert zu lange :(
	var nrOfGroups = Math.ceil(users.length/sizeOfG);
	var rest = sizeOfG - (users.length % sizeOfG); //damit die Gruppen gleichmäßig verteilt sind. also keine einser Gruppen entstehen und so 
	console.log(rest)
	var groups = {
		g: [],
		value: 0, 
		next: 0, 
	}
	
	for (var i = nrOfGroups - 1; i >= 0; i--) {
		groups.g[i] = []; 
	}
	groups = dijkstraSuche(matrix, groups, sizeOfG, rest); 
	groups.g = groups.g.map((group)=>{
		return group.map(index => users[index]); 
	}); 
	return groups; 
}

function floydWarshall(matrix){

	var fW = new Array(matrix.length)
	for (var i = matrix.length - 1; i >= 0; i--) {
		fW[i] = []; 
	}

	for (var i = 0; i < fW.length; i++) {
		for (var j = i; j < fW.length; j++) {
			if(i===j) fW[i][j] = 0; 
			else if(matrix[i][j]===1 && matrix[j][i]===1) {
				fW[i][j] = 1; 
				fW[j][i] = 1; 
			}else if(matrix[i][j]===1 || matrix[j][i]===1) {
				fW[i][j] = 2; 
				fW[j][i] = 2; 
			}else{
				fW[i][j] = Infinity; 
				fW[j][i] = Infinity;
			}
		}
	}
	for (var k = 0; k < fW.length; k++) {
		for (var i = 0; i < fW.length; i++) {
			for (var j = 0; j < fW.length; j++) {
				if(fW[i][j]>fW[i][k]+fW[k][j]) fW[i][j] = fW[i][k]+fW[k][j]; 
			}
		}
	}
	return fW;
}



function dijkstraSuche(matrix, groups, sizeOfG, rest){
	groups.g[0].unshift(0); 
	groups.next = 1; 
	var queue = new PriorityQueue({ comparator: function(a, b) { return a.value - b.value; }}); 
	queue.queue(groups); 

	while(queue.length!==0){
		groups = queue.dequeue();
		if(groups.next === matrix.length) break;  
		for(let i = 0; i < groups.g.length; i++){
			if((groups.g[i].length < sizeOfG && i>=rest) || groups.g[i].length < sizeOfG-1){
				let currG = JSON.parse(JSON.stringify(groups));
				//console.log(currG, i)
				currG.g[i].unshift(currG.next); 
				currG.value = satisfactionScore(currG ,matrix);
				currG.next = currG.next+1;  
				queue.queue(currG);
			}
			if(groups.g[i].length === 0){
				break; 
			}
		}
	}
	return groups; 
}

function satisfactionScore(groups, matrix){
	var sum = 0; 
	for (let k = 0; k < groups.g.length; k++) {
		sum = sum + singleSatisfation(groups.g[k], matrix)
	}
	return sum; 
}

function singleSatisfation(group, matrix){
	var sum = 0; 
	for (let i = 0; i < group.length; i++) {
		for (let j = 0; j < group.length; j++) {
			//console.log(group[i], group[j], matrix[group[i]][group[j]])
			if(i!==j && matrix[group[i]][group[j]]==0) sum = sum + 1; 
		}
	}
	return sum; 
}


var userArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i"]; 
var mtx = [
			[0,1,0,0,0,0,1,1,0],
			[1,0,1,0,0,0,1,1,1],
			[1,1,0,0,1,0,0,0,1],
			[0,1,0,0,0,0,0,1,1],
			[0,0,1,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,0,0],
			[0,1,0,0,0,0,0,1,0],
			[0,1,0,0,0,0,1,0,1],
			[0,1,0,0,0,0,1,0,0]
			]; 

var groups = tinder(userArray, mtx, 4); 
console.log(groups);
console.log(floydWarshall(mtx)); 

userArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "o", "p"]; 
mtx = [
			[0,1,0,0,0,0,1,1,0,0,1,0,1,0,1],
			[1,0,1,0,0,0,1,1,1,0,1,0,0,0,0],
			[1,1,0,0,1,0,0,0,1,0,1,0,0,0,0],
			[0,1,0,0,0,0,1,1,1,0,1,0,1,0,1],
			[0,0,1,1,0,1,0,0,1,0,1,0,0,0,0],
			[0,1,0,0,1,0,1,1,0,0,1,0,1,0,1],
			[0,1,0,0,0,0,0,1,0,0,1,0,0,0,0],
			[0,1,0,1,0,0,1,0,1,0,1,0,0,0,1],
			[0,1,0,1,0,0,1,0,0,0,1,0,0,1,0],
			[0,1,0,0,0,0,1,1,1,0,1,0,1,0,1],
			[0,0,1,1,0,1,0,0,1,0,1,0,0,0,0],
			[0,1,0,0,1,0,1,1,0,0,1,0,1,0,1],
			[0,1,0,0,0,0,0,1,0,0,1,0,0,0,0],
			[0,1,0,1,0,0,1,0,1,0,1,0,0,0,1],
			[0,1,0,1,0,0,1,0,0,0,1,0,0,1,0]
			];  
groups = tinder(userArray, mtx, 4); 
console.log(groups);
console.log(floydWarshall(mtx)); 

userArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; 
mtx = [
			[0,1,0,0,0,0,1,1,0,0,1,0,1,0,1,0,1,1,0,0,1,0,1,0,1],
			[1,0,1,0,0,0,1,1,1,0,1,0,0,0,0,0,1,1,0,0,1,0,1,0,1],
			[1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,1,0,0,1,0,1,0,1],
			[0,1,0,0,0,0,1,1,1,0,1,0,1,0,1,0,1,1,0,0,1,0,1,0,1],
			[0,0,1,1,0,1,0,0,1,0,1,0,0,0,0,0,1,1,0,0,1,0,1,0,1],
			[0,1,0,0,1,0,1,1,0,0,1,0,1,0,1,0,1,1,0,0,1,0,1,0,1],
			[0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,1,0,0,1,0,1,0,1],
			[0,1,0,1,0,0,1,0,1,0,1,0,0,0,1,0,1,1,0,0,1,0,1,0,1],
			[0,1,0,1,0,0,1,0,0,0,1,0,0,1,0,0,1,1,0,0,1,0,1,0,1],
			[0,1,0,0,0,0,1,1,1,0,1,0,1,0,1,0,1,1,0,0,1,0,1,0,1],
			[0,0,1,1,0,1,0,0,1,0,0,0,0,0,0,0,1,1,0,0,1,0,1,0,1],
			[0,1,0,0,1,0,1,1,0,0,1,0,1,0,1,0,1,1,0,0,1,0,1,0,1],
			[0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,1,0,0,1,0,1,0,1],
			[0,1,0,1,0,0,1,0,1,0,1,0,0,0,1,0,1,1,0,0,1,0,1,0,1],
			[0,1,0,1,0,0,1,0,0,0,1,0,0,1,0,0,1,1,0,0,1,0,1,0,1],
			[0,1,0,0,1,0,1,1,0,0,1,0,1,0,1,0,1,1,0,0,1,0,1,0,1],
			[0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,1,0,1,0,1],
			[0,1,0,1,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1],
			[0,1,0,1,0,0,1,0,0,0,1,0,0,1,0,0,1,1,0,0,1,0,1,0,1],
			[0,1,0,0,0,0,1,1,1,0,1,0,1,0,1,0,1,1,0,0,1,0,1,0,1],
			[0,0,1,1,0,1,0,0,1,0,1,0,0,0,0,0,1,1,0,0,0,0,1,0,1],
			[0,1,0,0,1,0,1,1,0,0,1,0,1,0,1,0,1,1,0,0,1,0,1,0,1],
			[0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,1,0,0,1,0,0,0,1],
			[0,1,0,1,0,0,1,0,1,0,1,0,0,0,1,0,1,1,0,0,1,0,1,0,1],
			[0,1,0,1,0,0,1,0,0,0,1,0,0,1,0,0,1,1,0,0,1,0,1,0,1]
			];  
//groups = tinder(userArray, mtx, 4); 
//console.log(groups);