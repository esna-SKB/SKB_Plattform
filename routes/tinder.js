
'strict'
var PriorityQueue = require('js-priority-queue');

function main(users, matrix, sizeOfG){
	var nrOfGroups = Math.ceil(users.length/sizeOfG);
	var rest = sizeOfG - (users.length % sizeOfG);

	var groups = controlTinder(users, matrix, sizeOfG)
	groups.sort(function(a,b){ return b.length - a.length; }); 
	/*var finalGroups = []; 
	while(groups.length>0) {
		var group = groups.pop(); 
		if(group.length===sizeOfG) 
	}*/
	return groups; 
}

function controlTinder(users, matrix, sizeOfG){
	if(users.length > 12){
		var distmtx = floydWarshall(matrix); 
		var twoGoups = splitUsers(distmtx); 
		//console.log(twoGoups)
		var mI = builtMatrix(matrix,twoGoups.usersI)
		var mJ = builtMatrix(matrix,twoGoups.usersJ)
		var usersI = twoGoups.usersI.map(i => users[i]); 
		var usersJ = twoGoups.usersJ.map(i => users[i]); 
		//console.log(usersI, usersJ)
		var gruppen1 = controlTinder(usersI, mI, sizeOfG); 
		var gruppen2 = controlTinder(usersJ, mJ, sizeOfG); 
		return gruppen1.concat(gruppen2); 
	} else return tinder(users, matrix, sizeOfG); 
}

function tinder(users, matrix, sizeOfG){
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
	return groups.g; 
}

function builtMatrix(matrix, userIndex){
	var mI = [];
	for (var i = 0; i < userIndex.length; i++) {
		mI[i] = []; 
		for (var j = 0; j < userIndex.length; j++) {
			mI[i][j]= matrix[userIndex[i]][userIndex[j]]; 
		}
	}
	return mI; 
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


function splitUsers(distmtx){
	var max = getMaxDistUsers(distmtx);
	var usersI = []; 
	var usersJ = []; 
	if(max.value === Infinity){
		for (var k = 0; k < distmtx.length; k++) {
			if(distmtx[max.i][k]!==Infinity) usersI.push(k); 
			else usersJ.push(k);
		}
	}else{
		for (var k = 0; k < distmtx.length; k++) {
			if(distmtx[max.i][k] < distmtx[max.j][k]) usersI.push(k); 
			else usersJ.push(k);
		}
	}

	var obj = {usersI: usersI, usersJ: usersJ}
	return obj; 
}

function getMaxDistUsers(distmtx){
	var max = {
		value: 0,
		i: 0,
		j: 0
	}; 
	for (var i = 0; i < distmtx.length; i++) {
		for (var j = i; j < distmtx.length; j++) {
			if(Infinity === distmtx[i][j]){
				max.value = Infinity; 
				max.i = i; 
				max.j = j; 
				break; 
			}
			else if(max.value < distmtx[i][j]) {
				max.value = distmtx[i][j]; 
				max.i = i; 
				max.j = j; 
			} 
		}
	}
	return max; 
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
			[0,1,0,0,1,0,0,0,0],
			[1,0,1,0,0,0,0,1,0],
			[1,1,0,0,1,0,0,0,0],
			[0,1,0,0,1,0,0,0,0],
			[0,0,1,0,0,0,0,0,0],
			[0,0,0,0,0,0,1,0,0],
			[0,0,0,0,0,1,0,1,0],
			[0,1,0,0,0,0,1,0,1],
			[0,0,0,0,0,0,1,0,0]
			]; 

var groups = main(userArray, mtx, 4); 
console.log(groups);
//console.log(floydWarshall(mtx)); 

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
groups = main(userArray, mtx, 4); 
console.log(groups);
//console.log(floydWarshall(mtx)); 

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
groups = main(userArray, mtx, 4); 
console.log(groups);