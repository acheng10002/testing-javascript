// if (
//   orderTotal({
//     items: [
//       { name: "dragon food", price: 8, quantity: 1 },
//       { name: "dragon cage (small)", price: 800, quantitiy: 1 },
//       { name: "shipping", price: 40, shipping: true },
//     ],
//   }) !== 1664
// ) {
//   throw new Error("Check fail: Happy path (Example 1) ");
// }

// if (
//   orderTotal({
//     items: [{ name: "dragon candy", price: 3 }],
//   }) != 3
// ) {
//   throw new Error("Check fail: No quantity specified");
// }

// if (
//   orderTotal({
//     items: [
//       { name: "dragon collar", price: 20, quantity: 1 },
//       { name: "dragon chew toy", price: 40, quantitiy: 1 },
//     ],
//   }) !== 60
// ) {
//   throw new Error("Check fail: Happy path (Example 2) ");
// }

/* with this last test, I've changed the API of my code, and I have tests to verify that API which
means I have to now change all my tests 
I don't have external code making use of the function 
breaking change to the API - modification that causes existing functionality or usage patterns to fail 
                             code relying on the previous version of the API will no longer work correctly without modification 
examples of breaking changes to APIs:
- removing a function or endpoint
- changing a function signature 
- altering data structures of return values
- renaming or removing fields 
- changing url paths
- altering authentication methods 
- changing error handling or status codes 

each test should also be its own unit */
// if (
//   orderTotal({
//     items: [{ name: "dragon candy", price: 2, quantity: 3 }],
//   }) != 6
// ) {
//   throw new Error("Check fail: Quantity");
// }

/* unit testing puts me in a situation where the next step should be obvious 
unit testing can be in 3 forms:
1. obvious implementation - going straight for the function definition/implementation
2. fake it till I make it - in between 1 and 2, get to green first and then go straight to implementation
3. triangulation - use three points to determine one's location, red, green TDD  */

// function orderTotal(order) {
//   return order.items.reduce(
//     (prev, cur) => cur.price * (cur.quantity || 1) + prev,
//     0
//   );
// }

/* Explain the basics of TDD
What are the benefits of TDD? 
- automated unit tests keep me out of the time hungry debugger
- they reduce bugs in new features and in existing features 
- gives me more time for creativity and refactoring
unit tests are a type of test
TDD is a coding technique

Get up and running with Jest 
What are some common jest matchers?
Write basic tests

2 rules:
- Write new code only if I first have a failing automated test
- Eliminate duplication 
start working on code by writing automated tests before writing just enough production code that is being tested 
(and then go on to refactor the code)
specification over validation
1. RED quickly add a test - just enough test for my code to fail
   / write a little test that doesn't work, perhaps doesn't even compile at first
2. run the test, see it fail
3. GREEN update my functional code to make it pass the new tests 
   / make the test work quickly, commiting what sins necessary in the process
4. REFACTOR run the tests again
   a. if they fail, I need to update my functional code again and retest until the tests are passed
   b. if they pass, continue development by quickly adding a test again, step 1
   / eliminate all the duplication created in just getting the test to work
   c. if they pass, stop development 

units are the pieces I break my software up into, and I write automated tests for each unit to verify it 
is working as expected

- automated unit tests keep me out of the time hungry debugger
- they reduce bugs in new features and in existing features 
*/

const someOrder = {
  items: [
    { name: "dragon food", price: 8, quantity: 8 },
    { name: "dragon cage (small)", price: 800, quantitiy: 2 },
    { name: "shipping", price: 40, shipping: true },
  ],
};

const orderTotal = (order) => {
  const totalItems = order.items

    /* from order.items array, create a new array containing all elements of the original array that 
    pass the specified test function/ aren't shipping items */
    .filter((x) => !x.shipping)

    // takes the items property of order argument
    /* .reduce reduces the array to a single value by applying a function to each element and accumulating the result 
    array.reduce(callbackFunction, initialValue); 
    (if no initialValue is given, accumulator starts with the first element)
    array.reduce((accumulator, currentValue) => {
        return accumulator + currentValue; 
        callback function takes an accumulator and current value, and returns the accumulator
        after the last iteration, accumulator contains the reduced value

        0 = initialValue
        prev = accumulator
        cur = currentValue 
    accumulator starts with initial value
    
    .reduce uses: summing values, flattening arrays, counting instances, etc. */
    .reduce((prev, cur) => prev + cur.price * cur.quantity, 0);

  /* .find is an array method that returns the value of the first element in the array that satisfies the provided 
  testing function 
  !!x.shipping is the boolean equivalent of x.shipping, returns true if x.shipping is a truthy value
  truthy - non-zero number, non-empty string, object, etc.
  falsy - 0, null, undefined, NaN, false, empty string */
  const shippingItem = order.items.find((x) => !!x.shipping);

  // if totalItems is greater than 0, shippingItem price will be 0, otherwise shippingItem.price is 40
  const shipping = totalItems > 1000 ? 0 : shippingItem.price;
  return totalItems + shipping;
};

result = orderTotal(someOrder);
// result 1664

/* to break one function up into a number of functions, there must be a complicated conceptual problem to break 
into smaller problems, each different conceptually 

test runners - tools that run the unit tests for me 
               they remove code duplication
               pretty test results, even if there is a fail in any one of the tests, all the tests will run
               predictable for team
               there is integration with continuous integration
               auto run on each change, every time I hit save

package.json - file in Node.js and JS apps that use npm
               it contains metadata about the project
               used to manage the project's dependencies, scripts, versioning, and other configurations
packages - collections of code, resources, and metadata that are bundled together to provide specific functionality or features
integrated terminal - command-line interface embedded within a development environment

npm init
get package.json
npm i --save-dev jest 
(installs test runner as a development dependency instead of as a production dependency)

Jest - Why Jest? 
it's established and ready to use
it comes bundled with the create react app
it's the boilerplate that Facebook provides for React 
it includes an assertion library 
assertion library - software tool that defines and verifies expected behavior of code
    assertions are statements that check if a condition is true
    if the condition is false, the assertion library typically throws an error, signaling that the test has failed
and a mocking library 
mocking library - software tool that is used to create mock objects
                  mock objects simulate the behavior of real objects in a controlled way
                  mocking is useful for isolating unites of code 
                  
Babel - JS tool that allows me to use modern JS features while maintaining compatibility with older environments and browsers
        it is a JS compiler
transpile - convert source code written in one language or version of a language into another language 
plugin - piece of software that adds specific features or functionalities to an existing program, app, or platform
preset - predefined collection of settings, configurations, and often plugins that are bundled together to simplify the setup process
polyfill - technique to provide functionality that is not natively supported by a web browser
source map - file that provides a way to map code within a transformed file back to its original source code
minification - removal of all unnecessary characters from source code without changing its functionality
webpack - module bundler of JS apps
module - any file that can be imported and used in my app
         building block of a Webpack bundle */

/* should test one method at a time
my tests for one function should not depend upon an external function behaving correctly (esp if that function is being tested elsewhere)

Explain what tightly coupled code is
I had lots of tightly couple code in my early projects
tightly coupled - functions that include references to functions in other parts of the code
                  tightly coupled code is hard to test

making something like this function testable means splitting up the different things happening 
prompt and alert don't need to be tested because they're built in to the browser */
function draftGuessingGame() {
  const magicNumber = 22;
  const guess = prompt("guess a number between 1 and 100!");
  if (guess > magicNumber) {
    alert("YOUR GUESS IS TOO BIG");
  } else if (guess < magicNumber) {
    alert("YOUR GUESS IS TOO SMALL");
  } else if (guess == magicNumber) {
    alert("YOU DID IT! 🎉");
  }
}

// I do need to test the number logic, which is easier to do once I untangle it from the other functions
function evaluateGuess(magicNumber, guess) {
  if (guess > magicNumber) {
    return "YOUR GUESS IS TOO BIG";
  } else if (guess < magicNumber) {
    return "YOUR GUESS IS TOO SMALL";
  } else if (guess == magicNumber) {
    return "YOU DID IT! 🎉";
  }
}

/* refactoring this way is much nicer bc the implementation is easier to extend
prompt and alert can be switched out for DOM methods
also easier to make the game more advanced by letting the user name multiple guesses */
function guessingGame() {
  const magicNumber = 22;
  const guess = prompt("guess a number between 1 and 100!");
  const message = evaluateGuess(magicNumber, guess);
  alert(message);
}

guessingGame();

/* TDD encourages better program architecture
- What should I try before testing tightly coupled code? 
  split up the code to make it more testable
- How can I test code that can't be decoupled?
  1. by removing dependencies from my code
  2. mocking
Describe a pure function and how it relates to TDD 
- What are the two requirements for a function to be pure?
  1. it must only depend on its input arguments
     it always returns the same result if the same arguments are passed in
     it does not depend on any state, or data, change during a program's execution
  2. it does not produce observable side effects i.e. network requests, input and output devices,or data mutation
- What are side effects and why is it important to identify them when testing a function?
  side effects - any interaction with the outside world from within a function
                 exs. changing a variable that exists outside the function
                      calling another method from within a function
                      making a HTTP request
                      printing to a screen or console
                      DOM query/manipulation
                      Math.random
                      getting the current time
  for a function to be declared pure, it must not have any side effects 
  
this function is pure because it doesn't depend on any external input, 
doesn't mutate any data, and doesn't have any size effects */
function priceAfterTax(productPrice) {
  return productPrice * 0.2 + productPrice;
}

/* this function is impure because it depends on the value of the tax variable */
let tax = 20;
function calculateTax(productPrice) {
  return productPrice * (tax / 100) + productPrice;
}
/* pure functions are used heavily in Functional Programming
Functioning Programming - programming paradigm that treats computation as the evaluation of mathematical functions
                          and avoids changing-state and mutable data
                          it emphasizes the use of pure functions, higher-order functions, and immutability
ReactJS require the use of pure functions
not all functions need to be, or should be, pure
exs. event handler for a button press that manipulates the DOM is not a candidate for a pure function
     and the event handler can call other pure functions which will reduce the number of impure functions in my app
pure functions are immediately testable

Explain what mocking is 
mocking - writing "fake" versions of a function that always beahves exactly how I want
- When would I use a mock function?
  ex. I'm testing a function that gets information from a DOM input, I can create a fake version of the input-grabbing
  function that always returns a specific value and use that mock function in my test
- I could use mock functions in place of areal network or database call 
  I need to do unit tests and automated tests many, many times, and I need to run them very fast
  and in some cases, it'll be impossible to use a real API 
  even if I had a test API, it would slow me down 
  ex. I cannot do 200 test cc transactions
  also, network calls tend to fail some of the time 
  mock functions return mock values, and they allow me to inspect the mock function after I finish running the tests
  so I can check that the mock function was called in the way that I expected it to 
  - How should I test incoming query messages?
- Why should I not test implementation?
- Should I test private metnods?
- Why should I not test outgoing messages with no side effects?
*/
