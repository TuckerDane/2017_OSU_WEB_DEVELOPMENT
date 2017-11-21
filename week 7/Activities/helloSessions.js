var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret:'SuperSecretPassword'}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

// HANDLE 'NEWSESSION' PAGE
//////////////////////////////////////////////
app.get('/newSession', function(req, res){
  var context = {};
  res.render('newSession', context);
})

// HANDLE GET '/' PAGE
//////////////////////////////////////////////
app.get('/', function(req, res){
  var context = {};
  if(!req.session.name)
  {
    res.render('newSession', context);
  }
  else
  {
    context.name = req.session.name;
    res.render('home', context);
  }
});

// HANDLE POST '/' PAGE
//////////////////////////////////////////////
app.post('/', function(req, res){
  var context = {};
  if (req.body.name)
  {
    req.session.name = req.body.name;
    context.name = req.session.name;
  }
  else
  {
    context.err = true;
  }
  if(req.session.name)
  {
    context.name = req.session.name;
  }
  else
  {
    context.name = 'unknown passerby';
  }
  res.render('home', context);
});

// HANDLE GET 'COUNTER' PAGE
//////////////////////////////////////////////
app.get('/counter', function(req, res){
  var context = {};
  context.count = req.session.count || 0;
  req.session.count = context.count + 1;
  res.render('counter', context);
});

// HANDLE POST 'COUNTER' PAGE
//////////////////////////////////////////////
app.post('/counter', function(req, res){
  var context = {};
  if(!req.session.name)
  {
    res.render('newSession', context);
  }
  else
  {
    if (req.body.command === 'resetCount')
    {
      //req.session.count = 0;
      req.session.destroy();
    }
    else
    {
      context.err = true;
    }
    if (req.session)
    {
      context.count = req.session.count;
    }
    else
    {
      context.count = 0;
    }
  }

  req.session.count = context.count + 1;
  res.render('counter', context);
});

// HANDLE GET 'TODO' PAGE
//////////////////////////////////////////////
app.get('/toDo', function(req, res)
{
  var context = {};
  if(!req.session.name)
  {
    res.render('newSession', context);
    return;
  }
  else
  {
    context.name = req.session.name;
    context.toDoCount = req.session.toDo.length || 0;
    context.toDo = req.session.toDo || [];
    res.render('toDo', context);
  }
});

// HANDLE POST 'TODO' PAGE
//////////////////////////////////////////////
app.post('/toDo', function(req, res)
{
  var context = {};
  if(req.session['New List'])
  { 
    req.session.name = req.body.name;
    req.session.toDo = [];
    req.session.curId = 0;
  }

  if(!req.session.name)
  {
    res.render('newSession', context);
    return;
  }

  if(req.body['Add Item'])
  {
    req.session.toDo.push({"name": req.body.name, "id": req.body.curId});
    req.session.curId++;
  }

  if(req.body['Done'])
  {
    req.session.toDo = req.session.toDo.filter(function (e){
         return e.id != req.body.id;
    });
  }

  context.name = req.session.name;
  context.toDoCount = req.session.toDo.length;
  context.toDo = req.session.toDo;
  res.render('toDo', context);
});

// HANDLE ERR 404
//////////////////////////////////////////////
app.use(function(req, res){
  res.status(404);
  res.render('404');
});

// HANDLE ERR 500
//////////////////////////////////////////////
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

// LISTEN
//////////////////////////////////////////////
app.listen(app.get('port'), function(){
  console.log("listening on port" + app.get('port'));
});