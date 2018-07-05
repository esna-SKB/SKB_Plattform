
import api from './api';

/*
for now it is just stupid putting all members of course into two people groups, (when uneven , one is three)
*/

module.exports = {


createGroups: function(students, courseName){
	var i;
  for(i = 0; i < students.length; i= i+2){
	if(students[i+3] != null){
		api.Group(courseName,i/2, [students[i],students[i+1]], "Wir sind Gruppenummer:"+ i/2);	
	}else{
		api.Group(courseName,i/2, [students[i],students[i+1], students[i+2]], "Wir sind Gruppenummer:"+ i/2);	
	}
  }
  return;
}
/*
* edit one specific group
* 
*/
/*
editGroup: function(Group, Course){
},

/*
*add Assignment that must be done by all groups
*/
/*addHomework: function(Course, Homework){
	
}*/
	
}