
'strict'
var PriorityQueue = require('js-priority-queue');

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
	return groups; 
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
			[0,1,0,0,0,0,1,1,1],
			[0,0,1,1,0,1,0,0,1],
			[0,1,0,0,1,0,1,1,0],
			[0,1,0,0,0,0,0,1,0],
			[0,1,0,1,0,0,1,0,1],
			[0,1,0,1,0,0,1,0,0]
			]; 

var groups = tinder(userArray, mtx, 4); 
console.log(groups);

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