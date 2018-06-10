/**


Komischer Weise gab es Probleme mit den return Werten, weswegen diese Datei nutzlos wurde
    -> bis auf updateTimeSec.. die wird noch gebraucht



**/
export function updateUserSession (userid) {
	fetch('/getToken/'+userid, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }
  ).then(ress => ress.json())
  .then(jsonn => {
    console.log('HEREEEE:'+ jsonn);
      return jsonn
  });
}

export function deleteUserSession (token) {
  fetch('/userSession/deleteSession', {

    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify( { token: token } )
  }).then (res => {
    
    if(res.status == 200){

      console.log("Erfolgreich ausgeloggt")
      //this.props.history.push("/");
    }else{
      console.log("Problem beim Ausloggen")
      
    }
  });
}

export function getToken (userid) {
  fetch('/userSession/'+userid, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }
  ).then(resss => resss.json())
  .then(jsonnn => {
    //console.log(jsonnn.token);
    let str = jsonnn.token;
    return str;
  });
}

export function checkUserSession (cook) {

  console.log('Cookie: ');
  console.log(cook);

  var bool = false;


  fetch('/userSession/check', {

    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify( { token: cook } )
  })
  .then(res => {
    console.log(res);
    if(res.status == 500){
      return false;
      
    } else {res.json()}
  })
  .then(json => {

    if (typeof(json) == 'undefined'){
      return false;
    } else if (json.success == true) {
      return true;      
    }
    console.log('json', json);

  });
    return bool;




	/*if (userid){
      return true;
    } else {
      return false;
  }*/
}

export function updateTimeSec(sec) {
	var d = new Date();
  d.setTime(d.getTime() + (sec*1000));

  console.log(d.toUTCString());

    return d;
}

export function sleep(ms) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > ms){
      break;
    }
  }
}