
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  _    ___          __                   _                                  _       _____   ____  __  __                   _   ______               _       
 | |  | \ \        / /     /\           (_)                                | |  _  |  __ \ / __ \|  \/  |                 | | |  ____|             | |      
 | |__| |\ \  /\  / /     /  \   ___ ___ _  __ _ _ __  _ __ ___   ___ _ __ | |_(_) | |  | | |  | | \  / |   __ _ _ __   __| | | |____   _____ _ __ | |_ ___ 
 |  __  | \ \/  \/ /     / /\ \ / __/ __| |/ _` | '_ \| '_ ` _ \ / _ \ '_ \| __|   | |  | | |  | | |\/| |  / _` | '_ \ / _` | |  __\ \ / / _ \ '_ \| __/ __|
 | |  | |  \  /\  /     / ____ \\__ \__ \ | (_| | | | | | | | | |  __/ | | | |_ _  | |__| | |__| | |  | | | (_| | | | | (_| | | |___\ V /  __/ | | | |_\__ \
 |_|  |_|   \/  \/     /_/    \_\___/___/_|\__, |_| |_|_| |_| |_|\___|_| |_|\__(_) |_____/ \____/|_|  |_|  \__,_|_| |_|\__,_| |______\_/ \___|_| |_|\__|___/
                                            __/ |                                                                                                           
                                           |___/ 


[x] script.js: This uses JavaScript to create all of the content of this page and append it to the body of the page. The content includes:
	[x] A 4x4 table
	[x] The top row is aheader row with header cells
	[x] The 4 header cells, from left to right say "Header 1", "Header 2" ... "Header 4
	[x] The non header cells contain their position. The upper left cell contains the text "1, 1", the cell to its right "2, 1", the cell below it "1, 2" and so on.
	[x] 4 directional buttons (up, down, left right)
	[x] A button labeled "Mark Cell"
	[x] When the page is loaded the upper left, non-header cell of the table is 'selected'. This is denoted by it having a thicker border than the other cells.
	[x] If you push the directional buttons other cells should be selected instead.
	[x] If you are already on the top row and hit 'up' nothing happens (you are not able to move into the header cells).
	[x] Likewise if you are all the way right and hit right or all the way at the bottom and hit down.
	[x] Hitting the "Mark Cell" button permanently changes the background of the selected cell to yellow. This persists even after other cells are selected or marked.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

//Create a 4x4 Table
///////////////////////////////////////////////
var newTable = document.createElement("table");
newTable.style.borderColor = "black";
newTable.style.borderStyle = "solid";

for (let i = 0; i < 4; i++)	// 4 rows
{
	if (i === 0)
	{
		var row = "thead";
	}
	else
	{
		var row = "tr";
	}

	var newRow = document.createElement(row);
	newTable.appendChild(newRow);
	for (let j = 0; j < 4; j++)	// 4 columns
	{
		if (i === 0)
		{
			var col = "th";
			var colText = "Header " + (j+1);
		}
		else
		{
			var col = "td";
			var colText = i + ", " + (j+1);
		}
		var newCol = document.createElement(col);
		newCol.textContent = colText;
		newCol.style.borderColor = "black";
		newCol.style.borderStyle = "solid";
		newRow.appendChild(newCol);
	}
}

// create buttons
///////////////////////////////////////////////
var buttons = [];

/////////////////////////////////////////////////////////////////////////
//
//	makeButton
//	description: 		makes and returns a button with specific text 
//						and id values
//
//	@param	text 		the text that will be displayed in the button
//	@param	ID 			the button's id
//	@return	newButton	returns a new button with filled text/id fields
//
/////////////////////////////////////////////////////////////////////////
var makeButton = function(text, ID)
{
	var newButton = document.createElement("button");
	newButton.textContent = text;
	newButton.id = ID;
	return newButton;
}

// 4 directional buttons
buttons.push(makeButton("^", "up"));	// up
buttons.push(makeButton("v", "down"));	// down
buttons.push(makeButton("<", "left"));	// left
buttons.push(makeButton(">", "right"));	// right

// mark cell button
buttons.push(makeButton("Mark Cell", "marker"));

// draw elements
///////////////////////////////////////////////

// draw table
document.body.appendChild(newTable);

// draw buttons
for (let i = 0; i < buttons.length; i++)
{
	document.body.appendChild(buttons[i]);
}

// functionality
///////////////////////////////////////////////

// initialize currently selected cell
var currentCell = newTable.firstElementChild.nextElementSibling.firstElementChild;		// top left cell is selected
currentCell.style.borderWidth = "thick";												// selected cell's border is thick

/////////////////////////////////////////////////////////////////////////
//
//	buttonClick
//	description: a function which creates a clickable button
//	
//	@param	tID		takes the id of the calling element
//	@param	func 	a function to execute
//
/////////////////////////////////////////////////////////////////////////
function buttonClick(tID, func){
	document.getElementById(tID).addEventListener("click", func(tID))
}

/////////////////////////////////////////////////////////////////////////
//
//	move
//	description: 	handles cell selection based off button presses;
//					uses the element's id to determine which cell to
//					select. 
//
/////////////////////////////////////////////////////////////////////////
function move(event){
	if(this.id === "up")
	{
		if (!(currentCell.parentNode.parentNode.children[1] === currentCell.parentNode))
		{
			currentCell.style.borderWidth = "medium";
			currentCell = currentCell.parentNode.previousElementSibling.firstChild;
			currentCell.style.borderWidth = "thick";	
		}
		
	}
	else if(this.id === "down")
	{
		if (!(currentCell.parentNode.parentNode.children[3] === currentCell.parentNode))
		{
			currentCell.style.borderWidth = "medium";
			currentCell = currentCell.parentNode.nextElementSibling.firstChild;
			currentCell.style.borderWidth = "thick";
		}
	}
	else if(this.id === "left")
	{
		if (!(currentCell.parentNode.children[0] === currentCell))
		{
			currentCell.style.borderWidth = "medium";
			currentCell = currentCell.previousElementSibling;
			currentCell.style.borderWidth = "thick";
		}
		//	else do nothing
	}
	else if (this.id === "right")
	{
		if(!(currentCell.parentNode.children[3] === currentCell))
		{
			currentCell.style.borderWidth = "medium";
			currentCell = currentCell.nextElementSibling;
			currentCell.style.borderWidth = "thick";
		}

	}
}

/////////////////////////////////////////////////////////////////////////
//
//	mark
//	description: 	marks a cell with a background-color of yellow
//
/////////////////////////////////////////////////////////////////////////
function mark(event){
	currentCell.style.backgroundColor = "yellow";
}

// Event listeners for button clicks
////////////////////////////////////////
document.getElementById("up").addEventListener("click", move);
document.getElementById("down").addEventListener("click", move);
document.getElementById("left").addEventListener("click", move);
document.getElementById("right").addEventListener("click", move);
document.getElementById("marker").addEventListener("click", mark);