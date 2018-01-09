
      
      window.fbAsyncInit = function() {

        
        document.getElementById('login-btn').addEventListener("click", function() {
          
        FB.init({
          appId: '168416127095686',
          cookie: true, // This is important, it's not enabled by default
          version: 'v2.2'
        });
        FB.login(function(response) {
          console.log(response)
          if (response.authResponse) {
            alert('You are logged in &amp; cookie set!');
            // Now you can redirect the user or do an AJAX request to
            // a PHP script that grabs the signed request from the cookie.
          } else {
            alert('User cancelled login or did not fully authorize.');
          }
        });
        return false;
      
      
        (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk/debug.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
        
      })};
    
    