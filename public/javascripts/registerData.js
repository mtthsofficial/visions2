window.onload= function(){

document.getElementById('dataName').addEventListener("click", async function(){

    
    const url='https://visions-mtths.c9users.io/registerData';
     try {
    await fetch(url, {
      method: 'POST',
      
      body: JSON.stringify({
        dataName : this.getAttribute('value'),
        userId : document.getElementById('userId').getAttribute('value')
        
      })
    });
    
  } catch(error) {
    console.log(error);
  }

});
}