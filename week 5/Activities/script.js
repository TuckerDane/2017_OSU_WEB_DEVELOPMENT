/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ____ ____ ____   ___   ___     __        __   _       ____                 _                                  _            
  / ___/ ___|___ \ / _ \ / _ \ _  \ \      / /__| |__   |  _ \  _____   _____| | ___  _ __  _ __ ___   ___ _ __ | |_          
 | |   \___ \ __) | (_) | | | (_)  \ \ /\ / / _ \ '_ \  | | | |/ _ \ \ / / _ \ |/ _ \| '_ \| '_ ` _ \ / _ \ '_ \| __|         
 | |___ ___) / __/ \__, | |_| |_    \ V  V /  __/ |_) | | |_| |  __/\ V /  __/ | (_) | |_) | | | | | |  __/ | | | |_          
  \____|____/_____|  /_/ \___/(_)    \_/\_/ \___|_.__/  |____/ \___| \_/ \___|_|\___/| .__/|_| |_| |_|\___|_| |_|\__|         
  _____           _              __        __    _ _                                 |_|                                      
 |_   _|   _  ___| | _____ _ __  \ \      / /_ _| | | _____ _ __                                                              
   | || | | |/ __| |/ / _ \ '__|  \ \ /\ / / _` | | |/ / _ \ '__|                                                             
   | || |_| | (__|   <  __/ |      \ V  V / (_| | |   <  __/ |                                                                
   |_| \__,_|\___|_|\_\___|_|       \_/\_/ \__,_|_|_|\_\___|_|                                                                
  _   ___        __     _            _                                  _          _     _              ___       _                      _   _                 
 | | | \ \      / /    / \   ___ ___(_) __ _ _ __  _ __ ___   ___ _ __ | |_ _     / \   (_) __ ___  __ |_ _|_ __ | |_ ___ _ __ __ _  ___| |_(_) ___  _ __  ___ 
 | |_| |\ \ /\ / /    / _ \ / __/ __| |/ _` | '_ \| '_ ` _ \ / _ \ '_ \| __(_)   / _ \  | |/ _` \ \/ /  | || '_ \| __/ _ \ '__/ _` |/ __| __| |/ _ \| '_ \/ __|
 |  _  | \ V  V /    / ___ \\__ \__ \ | (_| | | | | | | | | |  __/ | | | |_ _   / ___ \ | | (_| |>  <   | || | | | ||  __/ | | (_| | (__| |_| | (_) | | | \__ \
 |_| |_|  \_/\_/    /_/   \_\___/___/_|\__, |_| |_|_| |_| |_|\___|_| |_|\__(_) /_/   \_\/ |\__,_/_/\_\ |___|_| |_|\__\___|_|  \__,_|\___|\__|_|\___/|_| |_|___/
                                       |___/                                          |__/   

script.js

  [x] The HTML page(s) should have two forms. 
    [x] The first is the form you will construct in the activites that... 
      [x] connect to Open Weather Map
      [x] lets a user input a city or a zip code
      [x] asynchronously shows the weather information retrieved from Open Weather Map (via a GET).

    [x] The other should be a form that submits to http://httpbin.org/post...
      [x] This from should submit asynchronously via a POST. 
      [x] It needs to send a content-type of application/json.
      [x] You should display the data you get back (which should match the data you send).
      [x] It will be stored as a string in the data field of the JSON encoded string returned from the server.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

var apiKey = 'fa7d80c48643dfadde2cced1b1be6ca1';

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
  document.getElementById('locationSubmit').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var payload = {zipcode:null, city:null};
    var location = document.getElementById('loc').value;
    if (location > 0 && location < 99999)
    {
        payload.zipcode = location;
        req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?zip=' + payload.zipcode + '&appid=' + apiKey, true);
    }
    else
    {
        payload.city = location;
        req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + payload.city + '&appid=' + apiKey, true);
    }

    req.addEventListener('load', function()
    {
      if(req.status >= 200 && req.status <=400)
      {
        console.log(JSON.parse(req.responseText));
        var response = JSON.parse(req.responseText);
        document.getElementById('city').textContent = response.name;
        document.getElementById('humidity').textContent = response.main.humidity + "%";
        document.getElementById('temperature').textContent = Math.floor((response.main.temp)*(9/5)-(459.67)) + "°F";
      }
      else
      {
        console.log("Error in network request: " + req.statusText);
      }
    });

    req.send(null);          
    event.preventDefault();
  })

  document.getElementById('inputSubmit').addEventListener('click', function(event){
    var req2 = new XMLHttpRequest();
    var payload2 = {rInput:null};
    payload2.rInput = document.getElementById('rInput').value;

    req2.open('POST', 'http://httpbin.org/post', true);
    req2.setRequestHeader('Content-Type', 'application/json');
    req2.addEventListener('load', function()
    {
      if(req2.status >= 200 && req2.status <=400)
      {
        console.log(JSON.parse(req2.responseText));
        var response = JSON.parse(req2.responseText);
        document.getElementById('rOutput').textContent = JSON.parse(response.data).rInput;
      }
      else
      {
        console.log("Error in network request: " + req.statusText);
      }
    });

    req2.send(JSON.stringify(payload2));
    event.preventDefault();
  })
}