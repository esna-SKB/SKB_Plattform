module.exports = {


postPref: function(prefobject){
    return fetch('/preference/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(prefobject),
    })
  },

putPref: function(prefobject){
    return fetch('/preference/'+ prefobject.course, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(prefobject),
    })
    .then(res => res.json())
  },

getPref: function(courseId){
    return fetch('/preference/' + courseId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  },

 runTinder: function(courseId){
    return fetch('/preference/makegroups/' + courseId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
    .then(res => res.json())
  }

}