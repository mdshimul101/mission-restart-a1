1) What is the difference between null and undefined?
Ans : undefined mean value not assign on the other hand null mean value nothing
    
typeof undefined is "undefined" but typeof null is "object"

2) What is the use of the map() function in JavaScript? How is it different from forEach()?
Ans : If we don't want to change the original array, we can use map(), which returns a new array. On the other hand, forEach() is also an array method, but it only executes a function for each element and does not return a new array.

3) What is the difference between == and ===?
Ans : == check only the value but === check value and type.

4) What is the significance of async/await in fetching API data?
Ans : async/await make asynchronous code look and behave like synchronous code, making it easier to read and manage.

Code looks synchronous and easier to understand, better error handling with try/catch , avoids callback hell or long .then() chains,
works perfectly with multiple asynchronous calls

5) Explain the concept of Scope in JavaScript (Global, Function, Block).
Ans : Scope means , where a variable can be accessed in you code.

Global Scope : A variable declared outside all functions and blocks belongs to the global scope. It can be accessed anywhere in the program.

Example : 

let name = "Shimul";

function x() {
  console.log(name);
}

x(); // Shimul
console.log(name); // Shimul

Accessible everywhere.

Function Scope : Variables declared inside a function are only accessible inside that function.

Example : 

function test() {
  let age = 25; // Function scope
  console.log(age);
}

test(); // 25
console.log(age); // undefined

Outside the function variable does not exist.

Block Scope : Variables declared inside { } are accessible only inside that block.

Blocks include:

if

for

while

{} braces