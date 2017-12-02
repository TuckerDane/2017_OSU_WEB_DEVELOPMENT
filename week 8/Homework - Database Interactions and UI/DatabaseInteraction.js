/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ____ ____    ____   ___   ___     __        __   _       ____                 _                                  _                                                               
  / ___/ ___|  |___ \ / _ \ / _ \ _  \ \      / /__| |__   |  _ \  _____   _____| | ___  _ __  _ __ ___   ___ _ __ | |_                                                             
 | |   \___ \    __) | (_) | | | (_)  \ \ /\ / / _ \ '_ \  | | | |/ _ \ \ / / _ \ |/ _ \| '_ \| '_ ` _ \ / _ \ '_ \| __|                                                            
 | |___ ___) |  / __/ \__, | |_| |_    \ V  V /  __/ |_) | | |_| |  __/\ V /  __/ | (_) | |_) | | | | | |  __/ | | | |_                                                             
  \____|____/  |_____|  /_/ \___/(_)    \_/\_/ \___|_.__/  |____/ \___| \_/ \___|_|\___/| .__/|_| |_| |_|\___|_| |_|\__|                                                            
 |_   _|   _  ___| | _____ _ __  \ \      / /_ _| | | _____ _ __                        |_|                                                                                         
   | || | | |/ __| |/ / _ \ '__|  \ \ /\ / / _` | | |/ / _ \ '__|                                                                                                                   
   | || |_| | (__|   <  __/ |      \ V  V / (_| | |   <  __/ |                                                                                                                      
  _|_|_\__,_|\___|_|\_\___|_|       \_/\_/ \__,_|_|_|\_\___|_|          _       ____        _        _                      ___       _                      _   _                               _   _   _ ___ 
 | | | \ \      / /    / \   ___ ___(_) __ _ _ __  _ __ ___   ___ _ __ | |_ _  |  _ \  __ _| |_ __ _| |__   __ _ ___  ___  |_ _|_ __ | |_ ___ _ __ __ _  ___| |_(_) ___  _ __     __ _ _ __   __| | | | | |_ _|
 | |_| |\ \ /\ / /    / _ \ / __/ __| |/ _` | '_ \| '_ ` _ \ / _ \ '_ \| __(_) | | | |/ _` | __/ _` | '_ \ / _` / __|/ _ \  | || '_ \| __/ _ \ '__/ _` |/ __| __| |/ _ \| '_ \   / _` | '_ \ / _` | | | | || | 
 |  _  | \ V  V /    / ___ \\__ \__ \ | (_| | | | | | | | | |  __/ | | | |_ _  | |_| | (_| | || (_| | |_) | (_| \__ \  __/  | || | | | ||  __/ | | (_| | (__| |_| | (_) | | | | | (_| | | | | (_| | | |_| || | 
 |_| |_|  \_/\_/    /_/   \_\___/___/_|\__, |_| |_|_| |_| |_|\___|_| |_|\__(_) |____/ \__,_|\__\__,_|_.__/ \__,_|___/\___| |___|_| |_|\__\___|_|  \__,_|\___|\__|_|\___/|_| |_|  \__,_|_| |_|\__,_|  \___/|___|
                                       |___/                                                                                                                                                                   


[ ] DatabaseInteraction.js: This uses JavaScript to make a database backed website that features Ajax interaction with the following:
  [ ] A single page web application
  [ ] Visiting the page shows a table displaying all completed exercise
    [ ] The header lists all the columns (id is not displayed in the header or in the table itself; Hidden inputs keep track of the id)
  [ ] At the top of the page there is a form that lets you enter in all data needed to make a new entry into the table with a button to submit
    [ ] Hitting the button adds a row to the table if it was successfully added to the database
    [ ] If it was not successfully added (because the name was left blank and is required) it is not added to the table
  [ ] Each row has two buttons
    [ ] One button deletes the row
      [ ] Hitting this button immediately removes the row from the table and from the database
    [ ] One button edits the row
      [ ] Hitting this button makes it possible to edit the data
      [ ] The form to edit the exercise is pre-populated with the existing data from that row
  [ ] All interactions, other than updating an exercise, happens via Ajax
    [ ] At no time does the page refresh
    [ ] Ajax calls are used to GET or POST to the server
    [ ] Data from the server is used to update the page

[ ] Helpful Suggestions"
  [ ] Returning Data from the Database
    [ ] Look at week 7 wehre plain text is returned rather than HTML; use this technique to return a JSON string and build a table with that
    [ ] Use javascript to make an Ajax request when the page is loaded to get the JSON representing the table
  [ ] Handling the Update and Delete
    [ ] Use hidden fields for deleting/updating data
    [ ] Every reow should have a form (or two forms) holding the update and delete buttons
      [ ] Forms should have an input type='hidden' which holds the id of the row to pass to the server to delete/update the row
  [ ] Including JavaScript
    [ ] Include static JavaScript files just like static CSS files
    [ ] Use Organization suggestions in Week 8 Lectures to add static JavaScript Content

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

// SET UP EXPRESS AND HANDLEBARS
///////////////////////////////////////////////
var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port',7151);

// HANDLES HOMEPAGE
///////////////////////////////////////////////
app.get('/',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

    context.results = rows;
    res.render('home', context);
  });

});

// HANDLES INSERT
///////////////////////////////////////////////
app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)", [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result;
    res.render('home',context);
  });
});

// HANDLES DELETE
///////////////////////////////////////////////
app.get('/delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Deleted " + result.changedRows + " rows.";
    res.render('home',context);
  });
});

// HANDLES SAFE UPDATE: safe-update?id=1&name=The+Task&weight=15&date=2011-02-15&lbs=true
///////////////////////////////////////////////
app.get('/safe-update',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.weight || curVals.weight, req.query.date || curVals.date, req.query.lbs || curVals.lbs, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('home',context);
      });
    }
  });
});

// HANDLES RESET TABLE
///////////////////////////////////////////////
app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table Reset";
      res.render('home',context);
    })
  });
});

// HANDLES 404 PAGE NOT FOUND
///////////////////////////////////////////////
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

// HANDLES SERVER ERRORS
///////////////////////////////////////////////
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

// LISTEN ON INDICATED PORT
///////////////////////////////////////////////
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
