window.onload= function(){
      window.document.getElementById('button').addEventListener("click", function() {
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '{168416127095686}',
          cookie     : true, 
          xfbml      : true,  
          version    : 'v2.8' 
        });
      
      FB.login(function(response) {
        if (response.status === 'connected') {
          console.log('good');
        } else {
          console.log('good') 
        }
      })

     }})};