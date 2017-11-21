/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ____ ____    ____   ___   ___     __        __   _       ____                 _                                  _                                                               
  / ___/ ___|  |___ \ / _ \ / _ \ _  \ \      / /__| |__   |  _ \  _____   _____| | ___  _ __  _ __ ___   ___ _ __ | |_                                                             
 | |   \___ \    __) | (_) | | | (_)  \ \ /\ / / _ \ '_ \  | | | |/ _ \ \ / / _ \ |/ _ \| '_ \| '_ ` _ \ / _ \ '_ \| __|                                                            
 | |___ ___) |  / __/ \__, | |_| |_    \ V  V /  __/ |_) | | |_| |  __/\ V /  __/ | (_) | |_) | | | | | |  __/ | | | |_                                                             
  \____|____/  |_____|  /_/ \___/(_)    \_/\_/ \___|_.__/  |____/ \___| \_/ \___|_|\___/| .__/|_| |_| |_|\___|_| |_|\__|                                                            
 |_   _|   _  ___| | _____ _ __  \ \      / /_ _| | | _____ _ __                        |_|                                                                                         
   | || | | |/ __| |/ / _ \ '__|  \ \ /\ / / _` | | |/ / _ \ '__|                                                                                                                   
   | || |_| | (__|   <  __/ |      \ V  V / (_| | |   <  __/ |                                                                                                                      
  _|_|_\__,_|\___|_|\_\___|_|       \_/\_/ \__,_|_|_|\_\___|_|          _        ____ _____ _____                   _   ____   ___  ____ _____        _               _             
 | | | \ \      / /    / \   ___ ___(_) __ _ _ __  _ __ ___   ___ _ __ | |_ _   / ___| ____|_   _|   __ _ _ __   __| | |  _ \ / _ \/ ___|_   _|   ___| |__   ___  ___| | _____ _ __ 
 | |_| |\ \ /\ / /    / _ \ / __/ __| |/ _` | '_ \| '_ ` _ \ / _ \ '_ \| __(_) | |  _|  _|   | |    / _` | '_ \ / _` | | |_) | | | \___ \ | |    / __| '_ \ / _ \/ __| |/ / _ \ '__|
 |  _  | \ V  V /    / ___ \\__ \__ \ | (_| | | | | | | | | |  __/ | | | |_ _  | |_| | |___  | |   | (_| | | | | (_| | |  __/| |_| |___) || |   | (__| | | |  __/ (__|   <  __/ |   
 |_| |_|  \_/\_/    /_/   \_\___/___/_|\__, |_| |_|_| |_| |_|\___|_| |_|\__(_)  \____|_____| |_|    \__,_|_| |_|\__,_| |_|    \___/|____/ |_|    \___|_| |_|\___|\___|_|\_\___|_|   
                                       |___/   


[x] GetPostChecker.js: This uses JavaScript to create all of the content of this page and append it to the body of the page. The content includes:
	[x] A single page web application (one URL is used)
	[x] receives incoming POST and GET requests
		[x] if a POST request is received, there is an <h1> tag that says "POST Request Received".
		[x] if a GET request is received, there is an <h1> tag that says "GET Request Received".
		[x] the same <h1> tag is used for both POST and GET requests
	[x] displays information from the POST / GET requests
		[x] uses a list to clearly show all parameter names and values sent in the URL query string for both GET and POST requests
		[x] uses a list to clearly show all property names and values received in the request body from POST requests.
			[x] This list can accept a well formatted URL coded query string
			[x] This list can accept JSON data

[x]	Additional requirements
	[x] submit single zip file with source code
		[x] include .js files, package.json file, and directories containing views, templates, and static files
		[x] do not include node_modules directories
	[x] include a URL as a comment on Canvas added to the submission
		[x] URL should link to a functioning version of the page
			[x] start a new instance of node.js using the forever application on a different port than that used for development (see week 1 content; don't use localhost)
	[x] use ARC (Advanced Request Client) to test POST requests 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

// SET UP EXPRESS AND HANDLEBARS
///////////////////////////////////////////////
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3001);

/////////////////////////////////////////////////////////////////////////
//
//  genContext
//  description:      generates a context given a GET or a POST request;
//                      - always checks the query
//                      - parses the body in the case of a POST
//                      - saves data to context to send back to caller
//
//  @param  type      the request type (GET or POST)
//  @param  request   the actual request data
//  @return context   information to be returned based on if the request
//                    was via GET or POST
//
/////////////////////////////////////////////////////////////////////////
function genContext(type, request){
  var qParams = [];   //  holds query string data
  var bParams = [];   //  holds data from the body in the case of a POST

  //  parse the query string
  for (var p in request.query)
  {
    qParams.push({'name':p,'value':request.query[p]})
    console.log("generating Get Request Item");
  }

  //  if the context is a POST, parse the body
  if (type === 'POST')
  {
    for (var p in request.body)
    {
      bParams.push({'name':p,'value':request.body[p]})
      console.log("generating Query Request Item");
    }
  }

  // generate a context to use on client-side
  var context = {};
  context.type = type;          // GET or POST request
  context.queryList = qParams;  // list of query items
  context.bodyList = bParams;   // list of body items

  return context;
}

// HANDLES GET REQUESTS
///////////////////////////////////////////////
app.get('/', function(req,res){
  res.render('get-post', genContext('GET', req));
});

// HANDLES POST REQUESTS
///////////////////////////////////////////////
app.post('/', function(req,res){
  res.render('get-post', genContext('POST', req));
});

// HANDLES 404 PAGE NOT FOUND
///////////////////////////////////////////////
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

// HANDLES CODING ERRORS
///////////////////////////////////////////////
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

// LISTEN ON INDICATED PORT
///////////////////////////////////////////////
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});