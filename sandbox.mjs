import fetch from "node-fetch";
import pipe from "lodash/fp/flow";

async function fetchData() {
  // try {
  const response = await fetch(
    "https://eu.vatapi.com/v2/vat-rate-check?rate_type=TBE&country_code=DE",
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "25pHSVcc4G1yUxd8SNT2x8pYyByuk6LDRdV2OCD1",
      },
    }
  );

  const data = await response.json();
  const vatRate = data.rates.telecoms.standard.rate;
  console.log(vatRate);
  return vatRate;
  // } catch (error) {
  //   console.error("Fetch error:", error);
  // }
}
fetchData();

/* some review
CLOSURE 
closure - gives me access to an outer function's scope from an inner function 
          when functions are nested, the inner functions have access to the 
          variables declared in the outer function scope,
          even after the outer function has returned 
          they are live references to the outer-scoped variable */

// outer functions returns an object with two methods
const createSecret = (secret) => {
  return {
    /* methods are defined inside outer function and thus form closures 
    they both capture the secret variable */
    getSecret: () => secret,
    setSecret: (newSecret) => {
      secret = newSecret;
    },
  };
};

const mySecret = createSecret("My secret");
console.log(mySecret.getSecret()); // My secret

mySecret.setSecret("My new secret");
console.log(mySecret.getSecret()); // My new secret

/* common uses for closures:
- data privacy
- curry and partial applications (used to improve function composition 
- sharing data with even handlers and callbacks 

data privacy
encapsulation - allows me to hide the implementation details of a class from the outside world
closure - let me declare private variables for objects, variables not accessible outside the function */
// data privacy
const createCounter = () => {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
};

const Counter = createCounter();
console.log(Counter.increment()); // 1

Counter.decrement();
console.log(Counter.getCount()); // 0
/* curried functions and partial applications 

curried function - takes multiple arguments one at a time */
const add = (a) => (b) => a + b;

/* partial application - function that has been applied to some, but not yet all of its arguments 
                         using a curried function to fix some argument of a function and create 
                         a new function with fewer arguments */
const increment = add(1);

console.log(increment(2)); // 3

/* function composition -  combining simpler functions to build complex ones
   higher-order functions - functions that operate on other functions 
   point-free style - functions are defined without mentioning their arguments explicitly */
// point-free style
const add2 = (a) => (b) => a + b;
const increment2 = add2(1);
const double = (x) => x * 2;
const incrementAndDouble = (x) => double(increment2(x));
console.log(incrementAndDouble(3));

/* pure function 
pure function - 1. they are deterministic
                   given the same input, a pure function will always return the same output
                   non-deterministic functions: random number generation, global variable that can change state,
                                                parameter that can change state, current system time
                2. they have no side-effects 
                   side effect - any application state change that is observable outside 
                   the called function other than its return value
                   side effects: modifying any external variable or object property, logging to the console,
                                 writing to the screen, file, or network, throwing an error (instead function 
                                 should return a result indicating the error)
                                 triggering any external process

(web protocol - set of rules and standards that govern how data is transmitted over the data
                defines the format, timing, sequencing, and error-checking of data transmission) 
                
function composition - combining 2 or more functions to produce a new function */
const functionCompose = (f, g) => f(g(x));

const g = (num) => num + 1;
const f = (num) => num * 2;

const h = functionCompose(f, g);
h(20); // 42
/* function composition is how React developers can clean up large component trees with function composition
instead of nesting components, compose them together to create a higher-order component that can enhance any
component passed to it with additional functionality

functional programming 
functional programming - treats computation as the evalulation of math functions and avoids 
                         changing-state and mutable data
                         leads to better test coverage and few bugs 
                         emphasize use of pure functions, immutability (immutable data structures are easier to 
                         reason about than mutable data structures), higher-order functions (functions that take 
                         other functions as arguments or return functions as their result), and declarative code 
                         declarative code - programs are written in terms of what they do, rather than how they do it 
                         pure functions are the primary units of composition in functional programming 
                         
promise 
promise - object representing the eventual competion or failure of an asynchronous operation 
          it's a placeholder for a value that is initially known, because the computation of 
          its value is not yet complete
          promises are stateful: they're either pending, fulfilled, or rejected 
          promises are immutable, once they're fulfilled or rejected, their state cannot change 
          promises are reliable in asynchronous flow control
          promises can be chained - the output of one Promise can be used as input for another 
          .then() for success or .catch() for handling failures 
          chaining is the async equivalent of function composition */
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!");
    // I could also reject with a new error on failure
  }, 1000);
});

promise
  .then((value) => {
    console.log(value); // Success!
  })
  .catch((error) => {
    console.log(error);
  });

// async/await lets me treat promises and promise returning functionas as if they are synchronous
const processData = async () => {
  try {
    // waits until the promise is resolved
    const data = await fetchData();
    // Process and display the data
    console.log("Processed:", data);
  } catch (error) {
    // handles any error
    console.error("Error:", error);
  }
};

/* TypeScript - superset of JS that adds static typing to JS 
   static typing - defined types for my variables and function parameters to ensure consistency throughout my code
                   helps devs catch errors early in the dev process, improve code quality, and maintainability
                   static typing/ type checking gets performed at compile-time; variables are explicitly declared 
                      with a specific type and the type cannot change 
                   dynamic typing/ type checking gets performed at runtime; variables do not have fixed types
                      drawback - higher risk of runtime errors since type errors are only caught at runtime
   has enhanced IDE support - IDEs provide better autocompletion, navigation, and refactoring 
   get transpiled into JS - compatible with any browser or JS environment 
   has interfaces - allows me to specify abstract contracts that objects and functions must satisfy 
   is highly compatible with existing JS code - JS code can be gradually migrated to TypeScript */

/*
interface User {
  id: number;
  name: string;
}

type GetUser = (userId: number) => User;

const getUser: GetUser = (userId) => {
  // Fetch user data from a database or API
  return {
    id: userId,
    name: "John Doe",
  };
};
*/

/* web components
web components - set of web platform APIs that allow me to create new custom, reuable, encapsulated 
                  HTML tags to use in web pages and web apps 
                  they're built using open web technologies, HTML, CSS, JavaScript 
                  they are part of the browser and do not require external libraries or frameworks
                  allow me to create reusable components that can be used in any framework, or no framework at all
                  W3C standards: HTML, CSS, XML, Web Content Accessibility Guidelines, Web Authentication,
                                  Privacy Interest Group, Web Assembly, WebRTC 
React Hook 
hooks - functions that let me use state and other React features without writing a class
        gives functions additional flexibility, lets me group related functionality together in a single hook call
        and separates unrelated functionality by implementing it in separate function calls 
hooks must be used at the top level of React functions
they must only be used in React function components or custom Hooks

How Do I Create A Click Counter in React?                                  
*/

/* dependency injection - design pattern that allows an object to receive other objects it depends on,
                          rather than creating them internally
                          helps decouple the creation of dependencies from their usage
                          
a Logger class that handles logging, and a UserService class that depends on this Logger */
class Logger {
  log(message) {
    console.log(message);
  }
}

// UserService class depends on the Logger class for logging
class UserService {
  /* Logger is injected into UserService
  UserService accepts a Logger instance through its constructor, 
  decoupling the creation of Logger from its usage */
  constructor(logger) {
    this.logger = logger;
  }

  createUser(user) {
    // user creation logic
    this.logger.log(`User ${user.name} created.`);
  }
}

const logger = new Logger();

/* inject the Logger into the UserService 
instance of Logger created outside the UserService
Logger instance is then injected into the UserService through its constructor */
const userService = new UserService(logger);
userService.createUser({ name: "John Doe" });

/* race condition where multiple threads increment a shared counter variable
without proper synchronization, a race condition occurs */
let counter = 0;
function incrementCounter() {
  let temp = counter;
  temp = temp + 1;
  counter = temp;
}

// simulate two threads incrementing the counter
incrementCounter();
incrementCounter();

console.log(counter); // expected output: 2, but might be 1 due to race condition

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((y, f) => f(y), x);

// functions to compose
const a = (n) => n + 1;
const b = (n) => n * 2;

/* different types of code need different levels and kinds of mocks
some code primarily facilitate I/O, so have to test I/O, and need lots of mocks 
if there is logic (conditional expressions, assignments to variables, explicit 
function calls to units, etc.) probably need unit test coverage */

// imperative composition
// take an argument and assign it to x
const doStuffBadly = (x) => {
  // create a binding called afterA and assign the result of g(x) to it
  const afterA = a(x);
  // create a binding called afterB and assign the result of b(afterA) to it
  const afterB = b(afterA);
  // return the value of afterB
  return afterB;
};
/* imperative style requires logic that should be tested */

/* declarative composition - tells the computer the relationships between things
                             it's a description of structure 
doStuffBetter is the piped composition of a and b 
assuming b and a have their own unit tests, and pip() has its own, there's no logic here to unit test */
const doStuffBetter = pipe(a, b);

console.log(
  doStuffBadly(20), // 42
  doStuffBetter(20) // 42
);

/* mixin - design pattern that allows a class to incorporate behaviors and properties from multiple sources s*/
// Define mixin functions
const canFly = (Base) =>
  class extends Base {
    fly() {
      console.log(`${this.name} is flying!`);
    }
  };

const canSwim = (Base) =>
  class extends Base {
    swim() {
      console.log(`${this.name} is swimming!`);
    }
  };

// Define a base class
class Animal {
  constructor(name) {
    this.name = name;
  }
}

// Create a derived class using mixins
class Duck extends canSwim(canFly(Animal)) {
  quack() {
    console.log(`${this.name} is quacking!`);
  }
}

// Create an instance of the derived class
const duck = new Duck("Duck");

duck.fly(); // Outputs: Duck is flying!
duck.swim(); // Outputs: Duck is swimming!
duck.quack(); // Outputs: Duck is quacking!
