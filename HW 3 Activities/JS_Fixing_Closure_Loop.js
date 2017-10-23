// **********************************************************************************
//
//	CS290 - JS_Fixing_Closure_Loop.js
//
//	Name:			Tucker Dane Walker
//	Date:			22 October 2017
//	Description:	Fixing the Closure Loop described in
//					http://www.javascriptkit.com/javatutors/closures2.shtml example 5
//					
// *********************************************************************************/

/* ********************************************************************************
//
//	function:				buildList()
//	description:			takes a list of values stored in an array and returns 
//							the same list, with names, stored in a new array\
//							called result.
//	
//	@param		list		an array of values to be stored
//	@return		result		an array of values to be returned
//
// *******************************************************************************/
function buildList(list) {
	var result = [];
	for (var i = 0; i < list.length; i++) {
		var itemName = 'Item ' + list[i];				// name each item to be stored in result
		result[i] = function (x) {
			return function () {
				console.log(x);							// log to the console that the item has been pushed to result
				result.push(function () { alert(x) });	// alert the user that the item has been pushed to result
			};
		}(itemName + ': ' + list[i]);					// append itemName with the actual item value
	}
	return result;
}

/* ********************************************************************************
//
//	function:				testList()
//	description:			tests the buildList() function by building a list and
//							setting it to fnlist, and later calling the values of
//							fnlist
//
// *******************************************************************************/
function testList() {
	var fnlist = buildList([1, 2, 3]);
	// using j only to help prevent confusion - could use i
	for (var j = 0; j < fnlist.length; j++) {
		fnlist[j]();
	}
}

testList();