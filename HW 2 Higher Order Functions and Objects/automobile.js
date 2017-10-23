// **********************************************************************************************
//
//	CS290 - automobile.js
//
//	Name:			Tucker Dane Walker
//	Date:			22 October 2017
//	Description:	This assignment is graded based on correctness and will require you to use 
//					higher-order functions to sort automobiles. The description is below and can 
//					also be found here: http://jsfiddle.net/wolfordj/rmm2r6ky/ on jsFiddle. You 
//					should submit a single .js file called automobile.js which when run with 
//					node.js using the command "node automobile.js" produces the described results. 
//					You must make use of  higher-order functions to sort the cars. You should not, 
//					for example, create entirely separate functions each with dedicated loops to sort 
//					the cars. You will need a loop (or potentially more than one loop depending on 
//					your sorting algorithm of choice) in the sortArr function but that is pretty 
//					much it.
//					
// *********************************************************************************************/

/* ********************************************************************************
//
//	CLASSNAME:				Automobile
//	DESCRIPTION:			holds information pertaining to automobiles
//	
//	ELEMENTS:
//
//	NAME		TYPE		DESCRIPTION
//	this.year	integer		holds the year of the automobile
//	this.make	string		holds the make of the automobile
//	this.model	string		holds the model of the automobile
//	this.type	string		holds the type of the automobile
//	this.logMe	function	prints the variables of automobile to the console
//
// *******************************************************************************/
function Automobile(year, make, model, type) {

	// VARIABLES
	///////////////////////

	this.year = year;	//integer (ex. 2001, 1995)
	this.make = make;	//string (ex. Honda, Ford)
	this.model = model;	//string (ex. Accord, Focus)
	this.type = type;	//string (ex. Pickup, SUV)

	//FUNCTIONS
	///////////////////////

	/* ************************************************************************
	//	
	//	name:			logMe
	//	description:	prints the variables of automobile to the console
	//
	//	@param:		showType	a boolean which indicates whether or not to
	//							print the automobile's type
	//
	// ***********************************************************************/
	this.logMe = function (showType) {
		if (showType === true) {
			console.log(this.year + " " + this.make + " " + this.model + " " + this.type);
		}
		else {	// don't show type
			console.log(this.year + " " + this.make + " " + this.model);
		}
	}
}

// Initialization of an array of automobiles
//////////////////////////////////////////////
var automobiles = [
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
];

// Prints sorted autos to the console
//////////////////////////////////////////////
console.log("*****");
console.log("The cars sorted by year are:");
printAutos(sortArr(yearComparator, automobiles));
console.log("\nThe cars sorted by make are:");
printAutos(sortArr(makeComparator, automobiles));
console.log("\nThe cars sorted by type are:");
printAutos(sortArr(typeComparator, automobiles));
console.log("*****");

/* ************************************************************************
//	
//	name:			sortArr
//	description:	This function sorts arrays using an arbitrary comparator. 
//					You pass it a comparator and an array of objects 
//					appropriate for that comparator and it will return a new  
//					array which is sorted with the largest object in index 0 
//					and the smallest in the last index
//
//	@param:		comparator	a function which is used to compare an array
//							of objects appropriate for that comparator
//	@param:		array		an array of objects appropriate to the comparator
//	@return:	sortedArr	a sorted version of the array parameter based off
//							of the comparator
//
// ***********************************************************************/
function sortArr(comparator, array) {
	var temp = 0;
	var sortedArr = array;
	for (let i = 0; i < sortedArr.length - 1; i++) {
		for (let j = i + 1; j < sortedArr.length; j++) {
			if (comparator(sortedArr[i], sortedArr[j])) {
				// swap i and j
				temp = sortedArr[i];
				sortedArr[i] = sortedArr[j];
				sortedArr[j] = temp;
			}
			// else do nothing
		}
	}
	return sortedArr;
}

/* ************************************************************************
//	
//	name:			yearComparator
//	description:	This compares two automobiles based on their year. 
//					Newer cars are "greater" than older cars.
//
//	@param:		auto1		the first automobile to be compared
//	@param:		auto2		the second automobile to be compared
//	@return:	true		if auto1 is newer
//				false		if auto2 is newer
//
// ***********************************************************************/
function yearComparator(auto1, auto2) {
	if (auto1.year < auto2.year) {
		return true;
	} else {
		return false;
	}
}

/* ************************************************************************
//	
//	name:			yearComparator
//	description:	This compares two automobiles based on their make. 
//					It is case insensitive and makes which are 
//					alphabetically earlier in the alphabet are "greater" 
//					than ones that come later.
//
//	@param:		auto1		the first automobile to be compared
//	@param:		auto2		the second automobile to be compared
//	@return:	true		if auto1's make is alphabetically earlier
//				false		if auto2's make is alphabetically earlier
//
// ***********************************************************************/
function makeComparator(auto1, auto2) {
	if (auto1.make.toLowerCase() > auto2.make.toLowerCase()) {
		return true;
	}
	else {
		return false;
	}
}

/* ************************************************************************
//	
//	name:			typeComparator
//	description:	This compares two automobiles based on their type. 
//					The ordering from "greatest" to "least" is as follows: 
//					roadster, pickup, suv, wagon, (types not otherwise listed). 
//					It is case insensitive. If two cars are of equal type 
//					then the newest one by model year is considered "greater".
//
//	@param:		auto1			the first automobile to be compared
//	@param:		auto2			the second automobile to be compared
//	@return:	yearComparator	if auto1 and auto2 have the same type
//				true			if auto1's make is alphabetically earlier
//				false			if auto2's make is alphabetically earlier
//
// ***********************************************************************/
function typeComparator(auto1, auto2) {
	// if the vehicles are of the same type, the newest model is considered the greatest
	if (auto1.type.toLowerCase() === auto2.type.toLowerCase()) {
		return yearComparator(auto1, auto2);
	}
	// else sort the vehicles by type
	else if (auto1.type.toLowerCase() === "roadster") {
		return false;
	}
	else if (auto1.type.toLowerCase() === "pickup" && auto2.type.toLowerCase() !== "roadster") {
		return false;
	}
	else if (auto1.type.toLowerCase() === "suv" && auto2.type.toLowerCase() !== ("pickup" || "roadster")) {
		return false;
	}
	else if (auto1.type.toLowerCase() === "wagon" && auto2.type.toLowerCase() !== ("suv" || "pickup" || "roadster")) {
		return false;
	}
	else {
		return true;
	}
}

/* ************************************************************************
//	
//	name:			printAutos
//	description:	This function prints all automobiles within an array
//					to the console using their logMe() function.
//
//	@param:		autos		an array of Automobile objects
//
// ***********************************************************************/
function printAutos(autos) {
	for (var i = 0; i < autos.length; i++) {
		autos[i].logMe(false);
	}
}