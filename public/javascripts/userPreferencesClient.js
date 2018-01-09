var fetch = require(fetch)

window.onload= function(){

document.getElementById('button').addEventListener("click", async function(){
    
    var e = document.getElementById("select1");
var pref1 = e.options[e.selectedIndex].text;

var a = document.getElementById("select2");
var pref2 = a.options[a.selectedIndex].text;

    
    const url='https://visions-mtths.c9users.io/userPreferences';
     try {
    let response = await fetch(url, {
      method: 'POST',
      
      body: JSON.stringify({
        pref1: pref1,
        pref2: pref2
      })
    });
    
  } catch(error) {
    console.log(error);
  }

});
}