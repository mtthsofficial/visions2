let fetch = require('fetch')

function tag(name, attrs) {
  var el = document.createElement(name.toString());

  !!attrs && Object.keys(attrs).forEach(function(key) {
    el.setAttribute(key, attrs[key]);
  });

  return el;
}


window.document.getElementById('register').addEventListener("click", async function(){

    let id = window.document.getElementById("idUser").value;
let pw = window.document.getElementById("password").value;
    
    const url='https://visions-mtths.c9users.io/register';
     try {
    let response = await fetch(url, {
      method: 'POST',
      
      body: JSON.stringify({
        id: id,
        password: pw
      })
    });
    /*if (response.ok) {
        
        
        window.location.href = "Services.html"
      let servicesNames = response.namesArray
      let idUser = response.idUser
       for (let i=0; i<servicesNames.length; i++){
      let buttonService = tag('button', {'id':(i+1),'idUser': +idUser, 'class':'serviceButton'});
           buttonService.innerHTML = servicesNames[i];
           window.document.body.appendChild(buttonService);
       }*/
    //}
    //throw new Error('Request failed!');
  } catch(error) {
    console.log(error);
  }

});
    
