// ****************************************************************
//
//	CS290 - JS_Objects.js
//
//	Name:			Tucker Dane Walker
//	Date:			10 October 2017
//	Description:	Implementation of the Deep Comparison described
//					in the Eloquent JavaScript textbook.
//
// ***************************************************************/

/* ****************************************************************
//
//	function:				deepEqual
//	description:			recursively tests if objects have the
//							same properties and if the values of 
//							those properties are equal
//	
//	@param		val1		a variable to be compared to val2
//	@param		val2		a variable to be compared to val1
//	@return		bool		returns true if val1 === val2
//							returns false if val1 !== val2
//
// ***************************************************************/
function deepEqual(val1, val2) {
	for (var x in val1) {
		if (typeof(val1) == "object" && val1 != null)
		{
			return deepEqual(val1[x], val2[x]);
		}
		else // base case
		{
			if (val1 === val2) {
				return true;
			}
			else {
				return false;
			}
		}
	}
}


/* ****************************************************************
//	Testing deepEqual
// ***************************************************************/
var obj = { here: { is: "an" }, object: 2 };

console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
// → true
