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
