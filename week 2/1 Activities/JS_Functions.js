// ****************************************************************
//
//	CS290 - JS_Functions.js
//
//	Name:			Tucker Dane Walker
//	Date:			10 October 2017
//	Description:	A JavaScript program that declares a function
//					but calls it before it is declared. Because of
//					function hoisting, this will not work in
//					JavaScript.
//
//					Also, a function which is assigned to a
//					variable. It is called before it is assigned
//					and therefore does not work.
//
// ***************************************************************/

// A Javascript program that declares a function but calls it before it is declared.
// This proves that function hoisting is at work.
var A = "This should work";
myFunc(A);

function myFunc(x) {
	console.log(x);
}

// A javascript program that is assigned to a variable.
// When this is called before it is assigned, it does NOT work.

//console.log(myOtherFunc);
var B = "This should not work";
onsole.log(myOtherFunc(B));			// throws an error

var myOtherFunc = function otherFunc(y) {
	return y;
}

console.log(myOtherFunc(A));