// import the three modules
const axios = require("axios");

const {
  orderTotal,
  FlickrFetcher,
  Users,
  bar,
  foo,
  fooFunction,
  Wheel,
  Gear,
  OtherGear,
  defaultExport,
} = require("./order-total");

// simplest test is with exact equality
test("two plus two is four", () => {
  /* returns an "expectation" object 
  I will typically call matchers on these expectation objects 
  toBe(4) is the matcher
  when Jest runs, it tracks all the failing matchers so that it can print out error messages */
  expect(2 + 2).toBe(4);
});

// toBe uses Object.is to test exact equality

/* use toEqual to check the value of an object
toEqual recursively checks every field of an object or array 
toEqual ignores object keys with undefined properties, undefined array items, array sparseness,
or object type mismatch
use toStrictEqual to take them into account */
test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

function sum(a, b) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

// I can test for the opposite of a match using not
test("adding positive numbers is not zero", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

it("works", () => {
  // assertions
  expect(1).toBe(1);
  // expect(1).toBe(2);
});

const emptyFunction = () => {};

/* 
1. fetch data, an async API call to vatapi.com,
2. parse the response from the fetch
3. take the parsed response and extract the vat rate
4. orderTotal is now asynchronous and will return a promise 
   multiply orderTotal's return value with the vat rate 

Good question to always ask myself: What is the smallest possible step I can take?

all the tests need to be changed to expect a promise 
first test, makes sure vatapi.com gets called */
it("calls vatapi.com correctly", () => {
  let isFakeFetchCalled = false;
  /* fakeFetch has assertion for what url should be with beginning what it is, and
  the country code the same as order.country */
  const fakeFetch = (url) => {
    expect(url).toBe(
      "https://eu.vatapi.com/v2/vat-rate-check?rate_type=TBE&country_code=DE"
    );
    // after assertion, toggles the flag
    isFakeFetchCalled = true;
  };
  orderTotal(fakeFetch, {
    country: "DE",
    items: [{ name: "dragon waffles", price: 20, quantity: 2 }],
    /* how can fetch be inspected to find what the result should be 
  instead, use mock functions, which will run immediately 
  use something that overrides require, and allows me to inject it into the runtime */
  }).then((result) => {
    // expect the flag to be toggled
    expect(isFakeFetchCalled).toBe(true);
  });
});

it("if country code specified", () => {});

it("Quantity", () =>
  orderTotal(emptyFunction, {
    items: [{ name: "dragon candy", price: 2, quantity: 3 }],
  }).then((result) => expect(result).toBe(6)));

it("No quantity specified", () =>
  orderTotal(emptyFunction, {
    items: [{ name: "dragon candy", price: 3 }],
  }).then((result) => expect(result).toBe(3)));

// if (
//   orderTotal({
//     items: [{ name: "dragon candy", price: 2, quantity: 3 }],
//   }) != 6
// ) {
//   throw new Error("Check fail: Quantity");
// }

it("Happy path (Example 1)", () =>
  orderTotal(emptyFunction, {
    items: [
      { name: "dragon food", price: 8, quantity: 1 },
      { name: "dragon cage (small)", price: 800, quantity: 1 },
    ],
  }).then((result) => expect(result).toBe(808)));

// if (
//   orderTotal({
//     items: [
//       { name: "dragon food", price: 8, quantity: 1 },
//       { name: "dragon cage (small)", price: 800, quantitiy: 1 },
//     ],
//   }) !== 808
// ) {
//   throw new Error("Check fail: Happy path (Example 1) ");
// }

it("Happy path (Example 2)", () =>
  orderTotal(emptyFunction, {
    items: [
      { name: "dragon collar", price: 20, quantity: 1 },
      { name: "dragon chew toy", price: 40, quantity: 1 },
    ],
  }).then((result) => expect(result).toBe(60)));

// if (
//   orderTotal({
//     items: [
//       { name: "dragon collar", price: 20, quantity: 1 },
//       { name: "dragon chew toy", price: 40, quantity: 1 },
//     ],
//   }) !== 60
// ) {
//   throw new Error("Check fail: Happy path (Example 2) ");
// }

// if (
//   orderTotal({
//     items: [{ name: "dragon candy", price: 3 }],
//   }) != 3
// ) {
//   throw new Error("Check fail: No quantity specified");
// }

/* sometimes I will need to distinguish between undefined, null, and false 
but sometimes I do not want to treat these differently
Jest has helper methods that let me be explicit about what I want 
toBeNull matches only null
toBeUndefined matches only undefined
toBeDefined is the opposite of toBeUndefined
toBeTruthy matches anything that an if statement treats as true
toBeFalsy matches anything that an if statement treats as false */
test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test("zero", () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

// most ways of comparing numbers have matcher equivalents
test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);
});

// for floating point equality, use toBeCloseTo instead of toEqual
test("adding floating point numbers", () => {
  const value = 0.1 + 0.2;
  // expect(value).toBe(0.3);
  expect(value).toBeCloseTo(0.3);
});

// I can check strings against regex with toMatch
test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect("Christoph").toMatch(/stop/);
});

// I can check if an array or iterable contains a particular item using toContain
const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
];

test("the shopping list has milk on it", () => {
  expect(shoppingList).toContain("milk");
  /* a Set - built-in object that allows me to store unique values of any type,  
    whether primitive values or object references */
  expect(new Set(shoppingList)).toContain("milk");
});

function compileAndroidCode() {
  throw new Error("you are using the wrong JDK!");
}

// verifies the function behaves as expected when it throws an error
test("compiling android goes as expected", () => {
  /* basic throw check - checks if calling the function results in an error being thrown */
  expect(() => compileAndroidCode()).toThrow();
  /* type check - checks if the error thrown is an instance of the Error class (ensures 
  that the thrown error is of type Error */
  expect(() => compileAndroidCode()).toThrow(Error);

  /* I can also use a string that must be contained in the error message or a regexp
  string containment - checks if the error message includes the string "you are using the wrong JDK" */
  expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK");
  // regexp match - verifies that the error message matches the regex /JDK/, meaning it contains the substring "JDK"
  expect(() => compileAndroidCode()).toThrow(/JDK/);

  /* exact match using regexp - match an exact error message using regexp 
  checks if the error message exactly matches "you are using the wrong JDK" */
  // expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // test fails bc actual error messsage has !
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // test pass
});

// use toThrow to test whether a particular function throws an error when it's called
/* the function that throws an exception needs to be invoked within a wrapping function otherwise the
toThrow assertion will fail 

it() - used to define a test case, in a more behavior-driven development
test() - used to define a test case, that can be used more generically and is not tied to any specific style

describe(description, callback) - function that groups related test cases together 
test(description, callback)
assertions use Jest's built-in expect function with matchers like toBe
this test just checks that my module exists 
"FlickrFetcher" describes the suite of tests
arrow function is the callback function containing the test cases */
/* describe("FlickrFetcher", () => {
  /* first test case - checks existence 
  test("should exist", () => {
    // assertion that checks if FlickrFetcher is defined
    expect(FlickrFetcher).toBeDefined();
  });

  // group tests related to the photoObjToUrl method of FlickrFetcher
  describe("#photoObjToURL", () => {
    // second test case - checks the functionality of the photoObjToURL method
    test("should take a photo object and return a URL", () => {
      let testCases = [
        {
          input: {
            id: "25373736106",
            owner: "99117316@N03",
            secret: "146731fcb7",
            server: "1669",
            farm: 2,
            title: "Dog goes to desperate measure to avoid walking on a leash",
            ispublic: 1,
            isfriend: 0,
            isfamily: 0,
          },
          expected:
            "https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg",
        },
        {
          input: {
            id: "24765033584",
            owner: "27294864@N02",
            secret: "3c190c104e",
            server: "1514",
            farm: 2,
            title: "the other cate",
            ispublic: 1,
            isfriend: 0,
            isfamily: 0,
          },
          expected:
            "https://farm2.staticflickr.com/1514/24765033584_3c190c104e_b.jpg",
        },
        {
          input: {
            id: "24770505034",
            owner: "97248275@N03",
            secret: "31a9986429",
            server: "1577",
            farm: 2,
            title: "Some pug picture",
            ispublic: 1,
            isfriend: 0,
            isfamily: 0,
          },
          expected:
            "https://farm2.staticflickr.com/1577/24770505034_31a9986429_b.jpg",
        },
      ];
      testCases.forEach(function (t) {
        let actual = FlickrFetcher.photoObjToURL(t.input);
        expect(actual).toBe(t.expected);
      });
      //   //photo object with various properties
      //   let input = {
      //     id: "25373736106",
      //     owner: "99117316@N03",
      //     secret: "146731fcb7",
      //     server: "1669",
      //     farm: 2,
      //     title: "Dog goes to desperate measure to avoid walking on a leash",
      //     ispublic: 1,
      //     isfriend: 0,
      //     isfamily: 0,
      //   };
      //   // calling the method under test
      //   let actual = FlickrFetcher.photoObjToURL(input);
      //   /* expected variable holds the expected URL that should be returned by
      //   the photoObjToURL method  when passed the input object */
//   let expected =
//     "https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg";
//   // assertion that checks if the value of actual matches expected
//   expect(actual).toBe(expected);

//   // second test with a different object
//   input = {
//     id: "24765033584",
//     owner: "27294864@N02",
//     secret: "3c190c104e",
//     server: "1514",
//     farm: 2,
//     title: "the other cate",
//     ispublic: 1,
//     isfriend: 0,
//     isfamily: 0,
//   };
//   expected =
//     "https://farm2.staticflickr.com/1514/24765033584_3c190c104e_b.jpg";
//   actual = FlickrFetcher.photoObjToURL(input);
//   expect(actual).toBe(expected);

//   input = {
//     id: "24770505034",
//     owner: "97248275@N03",
//     secret: "31a9986429",
//     server: "1577",
//     farm: 2,
//     title: "Some pug picture",
//     ispublic: 1,
//     isfriend: 0,
//     isfamily: 0,
//   };
//   expected =
//     "https://farm2.staticflickr.com/1577/24770505034_31a9986429_b.jpg";
//   actual = FlickrFetcher.photoObjToURL(input);
//   expect(actual).toBe(expected);
/* });
  });
}); */
/*
var
scope: function-scoped, not block-scoped
       if declared outside any function, it is globally scoped
hoisting: declarations are hoisted to the top of their scope before code execution
          but the initialization remains in place
re-declaration: a var variable can be re-declared within the same scope w/o causing an error
let
scope: block-scoped
hoisting: declarations are hoisted to the top of their block, but they are not initialized
          I cannot use the variable until the declaration is encountered in the code
          "temporal dead zone"
re-declaration: a let variable cannot be re-declared within the same scope
const
scope: block-scoped
hoisting: declarations are hoisted to the top of their block, but they are not initialized
          I cannot use the variable until the declaration is encountered in the code
          "temporal dead zone"
re-declaration: a const variable cannot be re-declared within the same scope 
                variables declared with const must be initialized at the time of declaration
                and cannot be reassigned
                if the const variable is an object or array, its properties or elements can still be changed 
                
Start small: pick one small, easy bit of a project to do TDD with that
Once comfortable with the three steps: start thinking about how I can bring more stuff into tests
Think about how to restructure my code to make it easier to test */

class UserService {
  constructor(database) {
    this.database = database;
  }

  // UserService class has method getUserById that relies on the Database class to fetch user data
  getUserById(userId) {
    return this.database.findUserById(userId);
  }
}

test("should fetch user by ID from the database", () => {
  /* create a mock of the Database class using Jest's jest.fn() which
  mock simulates the findUserById method and provides a predefined return value */
  const mockDatabase = {
    findUserById: jest.fn().mockReturnValue({ id: 1, name: "John Doe" }),
  };

  // create an instance of UserService passing the mock database to its constructor
  const userService = new UserService(mockDatabase);

  // call the method under test
  const user = userService.getUserById(1);

  // assertions
  // assert that the getUserId method returns the expected user object
  expect(user).toEqual({ id: 1, name: "John Doe" });
  // assert the mock was called once
  expect(mockDatabase.findUserById).toHaveBeenCalledTimes(1);
  // assert the mock was called with the correct argument
  expect(mockDatabase.findUserById).toHaveBeenCalledWith(1);
});

class blackBoxCalculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
  }
}

/* black box testing focuses on the testing the public API of the blackBoxCalculator class 
without any knowledge of its internal implementation
only care about the inputs and expected outputs */
describe("Calculator - Black Box Testing", () => {
  let calculator;

  beforeEach(() => {
    calculator = new blackBoxCalculator();
  });
  // tests only the public methods (add, subtract, multiply, divide)
  test("should add two numbers correctly", () => {
    expect(calculator.add(2, 3)).toBe(5);
    expect(calculator.add(-1, -1)).toBe(-2);
  });

  test("should subtract two numbers correctly", () => {
    expect(calculator.subtract(5, 3)).toBe(2);
    expect(calculator.subtract(-1, -1)).toBe(0);
  });

  test("should multiply two numbers correctly", () => {
    expect(calculator.multiply(2, 3)).toBe(6);
    expect(calculator.multiply(-1, -1)).toBe(1);
  });

  test("should divide two numbers correctly", () => {
    expect(calculator.divide(6, 3)).toBe(2);
    expect(calculator.divide(-1, -1)).toBe(1);
  });

  test("should throw an error when dividing by zero", () => {
    expect(() => calculator.divide(1, 0)).toThrow("Division by zero");
  });
});

class whiteBoxCalculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
  }

  // Private method (by convention)
  _isNonNegative(number) {
    return number >= 0;
  }
}

/* tests internal implemental details, _isNonNegative method
requires knowledge of the the internal structure of the Calculator class */
describe("Calculator - White Box Testing", () => {
  let calculator;

  beforeEach(() => {
    calculator = new whiteBoxCalculator();
  });

  test("should add two numbers correctly", () => {
    expect(calculator.add(2, 3)).toBe(5);
  });

  // directly tests a private method
  test("should test private method _isNonNegative", () => {
    expect(calculator._isNonNegative(5)).toBe(true); // Directly testing a private method
    expect(calculator._isNonNegative(-1)).toBe(false);
  });
});

class PubSub {
  constructor() {
    /* initializes events objectto store event listeners 
    the keys will be event names, and the values with be arrays of listener functions */
    this.events = {};
  }

  subscribe(event, listener) {
    // checks if the event name does not already exist in the events object
    if (!this.events[event]) {
      // if not, initializes an array for that event
      this.events[event] = [];
    }
    // adds the listener function to the array of listeners for the specified event
    this.events[event].push(listener);
  }

  unsubscribe(event, listenerToRemove) {
    // if the event name does not exist, returns immediately
    if (!this.events[event]) return;

    // filters out the listenerToRemove from the array of listeners for the specified event
    this.events[event] = this.events[event].filter(
      (listener) => listener !== listenerToRemove
    );
  }

  publish(event, data) {
    if (!this.events[event]) return;

    /* iterates over the the array of listeners for the specified event 
    and calls each listener function, passing the data to it */
    this.events[event].forEach((listener) => listener(data));
  }
}

/* implementation of the publish/subscribe pattern
how to define listener functions, subscribe to events, publish events, and unsubscribe from events */
const pubSub = new PubSub();

// logs a message with the user's name
function handleUserCreated(userData) {
  console.log(`User created: ${userData.name}`);
}

// logs a message with the order ID
function handleOrderCreated(orderData) {
  console.log(`Order created: ${orderData.id}`);
}

// subscribes the handleUserCreated function to the userCreated event
pubSub.subscribe("userCreated", handleUserCreated);
// susbcribes the handleOrderCreated function to the orderCreated event
pubSub.subscribe("orderCreated", handleOrderCreated);

/* publishes the userCreated event with user data
calls the handleUserCreated function and logs the message */
pubSub.publish("userCreated", { name: "John Doe" });
/* publishes the orderCreated event with order data
calls the handleOrderCreated function and logs the message */
pubSub.publish("orderCreated", { id: 123, amount: 49.99 });

// unsubscribes the handleUserCreated function from the userCreated event
pubSub.unsubscribe("userCreated", handleUserCreated);

/* attempts to publish the userCreated event with new user data, but
since handleUserCreated was unsubscribed, there is no output */
pubSub.publish("userCreated", { name: "Jane Doe" }); // No output, as the listener was unsubscribed
/* publishes the orderCreated event with new order data
calls the handleOrderCreated function and logs the message */
pubSub.publish("orderCreated", { id: 124, amount: 79.99 }); // Order created: 124;

/* Setup and Teardown
often while writing tests, I have some setup work that needs to happen before tests run, and
I have some finishing work that needs to happen after tests run 
Jest provides helper functions to handle this 

Repeating Setup
if I have some work I need to do repeatedly for many tests, I canuse beforeEach and afterEach hooks
hook - mechanisms for allowing custom functionality to be added to an existing system or framework 

Several tests interact with a database of cities
initializeCityDatabase() must be called before each of these test
clearCityDataBase() must be called after each of these tests */

let cityDatabase = [];
let foodDatabase = {};
function initializeCityDatabase() {
  return new Promise((resolve) => {
    cityDatabase = ["Vienna", "San Juan"];
    resolve();
  });
}
function isCity(name) {
  return cityDatabase.includes(name);
}
function clearCityDatabase() {
  return new Promise((resolve) => {
    cityDatabase = [];
    resolve();
  });
}
beforeEach(() => {
  initializeCityDatabase();
});
afterEach(() => {
  clearCityDatabase();
});
test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has Dan Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});

/* beforeEach and afterEach can handle async code the same way tests can handle async code
they can either take a done parameter or return a promise */

/* if initializeCityDatabase() returned a promise that resolved when the database was initialized
return that promise */
beforeEach(() => {
  return initializeCityDatabase();
});

/* One-Time Setup
sometimes, I only need to do setup once, at the beginning of the file 
Jest provides beforeAll and afterAll hooks to handle this situation 

if both initializeCityDatabase() and clearCityDatabase() returned promises,
and the city database could be reused between tests */
beforeAll(() => {
  return initializeCityDatabase;
});

afterAll(() => {
  return clearCityDatabase();
});
test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});
test("city database has Dan Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});
/* Scoping
the top level before* and after* hooks apply to every test in a file 
hooks declared inside a describe block apply only to the tests within that describe block 
if I had a food database on top of a city database, I could do different setup for different tests */
// applies to all tests in this file
beforeEach(() => {
  return initializeCityDatabase();
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has Dan Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});

function initializeFoodDatabase() {
  return new Promise((resolve) => {
    foodDatabase = {
      Vienna: "Wiener Schnitzel",
      "San Juan": "Mofongo",
    };
    resolve();
  });
}
function isValidCityFoodPair(city, food) {
  return foodDatabase[city] === food;
}
describe("matching cities to foods", () => {
  // applies only to tests in this describe block
  beforeEach(() => {
    return initializeFoodDatabase();
  });
  test("Vienna <3 veal", () => {
    expect(isValidCityFoodPair("Vienna", "Wiener Schnitzel")).toBe(true);
  });
  test("Dan Juan <3 plaintains", () => {
    expect(isValidCityFoodPair("San Juan", "Mofongo")).toBe(true);
  });
});

// order of execution of all hooks
beforeAll(() => console.log("1 - beforeAll"));
afterAll(() => console.log("1 - afterAll"));
beforeEach(() => console.log("1 - beforeEach"));
afterEach(() => console.log("1 - afterEach"));

test("", () => console.log("1 - test"));

describe("Scoped / Nested block", () => {
  beforeAll(() => console.log("2 - beforeAll"));
  afterAll(() => console.log("2 - afterAll"));
  beforeEach(() => console.log("2 - beforeEach"));
  afterEach(() => console.log("2 - afterEach"));

  test("", () => console.log("2 - test"));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll

/* Order of Execution
Jest executes all describe handlers in a test file before it executes any of the actual tests 
another reason to do setup and teardown inside before* and after* handlers rather than inside the describe block 
once the describe blocks are complete, by default, Jest runs all the rests serially in the order 
they were encountered in the collection phase, waiting for each to finish and be tidied up before moving on
*/
describe("describe outer", () => {
  console.log("describe outer-a");

  describe("describe inner 1", () => {
    console.log("describe inner 1");

    test("test 1", () => console.log("test 1"));
  });

  console.log("describe outer-b");

  test("test 2", () => console.log("test 2"));

  describe("describe inner 2", () => {
    console.log("describe inner 2");

    test("test 3", () => console.log("test 3"));
  });

  console.log("describe outer-c");
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test 1
// test 2
// test 3

/* just like the describe and test blocks, Jest calls the before* and after* hooks in the order of declaration 
the after* hooks of the enclosing scope are called first */
beforeEach(() => console.log("connection setup"));
beforeEach(() => console.log("database setup"));

afterEach(() => console.log("database teardown"));
afterEach(() => console.log("connection teardown"));

test("test 1", () => console.log("test 1"));

describe("extra", () => {
  beforeEach(() => console.log("extra database setup"));
  afterEach(() => console.log("extra database teardown"));

  test("test 2", () => console.log("test 2"));
});

// connection setup
// database setup
// test 1
// database teardown
// connection teardown

// connection setup
// database setup
// extra database setup
// test 2
// extra database teardown
// database teardown
// connection teardown

/* General Advice
if a test is failing, one of the first thing to check should be whether the test is failing 
when it's the only test that runs
to run only one test with Jest, temporarily change the test command to a test.only */
// test.only("this will be the only test that runs", () => {
//   expect(true).toBe(false);
// });

test("this test will not run", () => {
  expect("A").toBe("A");
});

/* if a test often fails when it's run as part of a larger suit, but doesn't fail when I run
it alone, something from a different test is interfering with this one
I can often fix this by clearning some shared state with beforeEach
if I'm not sure whether some shared state is being modified, I can also try a beforeEach that logs data */

/* Testing Async Code
when I have code that runs asynchronously, Jest needs to know when the code it is testing has completed
before it can move on to another test 

Promises
return a promise from my test 
Jest will wait for that promise to resolve
if the promise is rejected, the test will fail */

function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("peanut butter");
    }, 100); // Simulating async operation with a timeout
  });
}

// fetchData returns a promise that is supposed to resolve to the string 'peanut butter'
test("the data is peanut butter", () => {
  return fetchData().then((data) => {
    expect(data).toBe("peanut butter");
  });
});

/* Async/Await
instead of returning a promise from my test, I can use async and await in my tests
use async keyword in front of the function passed to test */
test("the data is peanut butter", async () => {
  const data = await fetchData();
  expect(data).toBe("peanut butter");
});

function fetchDataFirstError() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("error");
    }, 100); // Simulate async operation with a timeout
  });
}

test("the fetch fails with an error", async () => {
  expect.assertions(1);
  try {
    await fetchDataFirstError();
  } catch (error) {
    expect(error).toMatch("error");
  }
});

// I can combine async and await with .resolves or rejects
test("the data is peanut butter", async () => {
  await expect(fetchData()).resolves.toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  await expect(fetchDataFirstError()).rejects.toMatch("error");
});
/* *** be sure to return/await the promise, if it's omitted, the test will complete before 
the promise returned from fetchData resolves or rejects

if I expect a promise to be rejected, use .catch method
add expect.assertions to verify that a certain number of assertions are called
otherwise, a fulfilled promise would not fail the test */
test("the fetch fails with an error", () => {
  expect.assertions(1);
  return fetchDataFirstError().catch((error) => expect(error).toMatch("error"));
});

/* 
Callbacks
can use callbacks instead of promises
instead of returning a promise, fetchData can expect a callback:
fetches some data
then calls callback(null, data) when it is complete. but
the test will complete as soon as fetchData completes, before even calling the callback

instead of putting the test in a function with an empty argument, use a single argument called done
done - callback function provided by Jest that I call to signal that my test is complete
Jest will wait until the done callback is called before finishing the test
*/
test("the data is peanut butter", (done) => {
  /* callback will be passed to fetchData, error is any error during data fetching
  and data is data returned by fetchData */
  function callback(error, data) {
    // if there is an error
    if (error) {
      // calls done(error) to signal Jest that the test has failed, and return to exit the function
      done(error);
      return;
    }
    /* expect is wrapped in a try block and error is passed in the catch block to done so that
    I can see in the test log why it failed 
    try block tests the value of data */
    try {
      expect(data).toBe("peanut butter");
      // if assertion passes, done is called with no arg, signaling that the test is complete and successful
      done();
      /* if the expect statement fails, throws an error is done() is not called 
    without the try block, I would end up with an opaque timeout error that doesn't 
    show what value was received by expect(data) */
    } catch (error) {
      done(error);
    }
  }
  /* when fetchData completes (either successfully or with an error), it calls callback 
  fetchData initiates the data fetch and callback handles the result */
  fetchData(callback);
});
/* if done is never called, the test will fail with timeout error 
if I mix with the done callback with returning a Promise in the same test function, Jest throws
an error to prevent ambiguous signaling of test completion 
this avoids potential memory leaks and ensures Jest can reliably determine when the test has finished */

/*
resolves/.rejects 
I can use the .resolves matcher in my expect statement, and Jest will wait for the promise to resolve
if the promise is rejected, the test will automatically fail
*/
test("the data is peanut butter", () => {
  /* the assertion must be returned, 
  if it's omitted, my test will complete before the promise returned from fetchData 
  is resolved and then() has a chance to execute the callback */
  return expect(fetchData()).resolves.toBe("peanut butter");
});

/* use the .rejects matcher if I expect a promise to be rejected 
if the promise is fulfilled, the test will automatically fail */
test("the fetch fails with an error", () => {
  return expect(fetchDataFirstError()).rejects.toMatch("error");
});

class DatabaseForMocking {
  getUser(id) {
    // simulate fetching user data from a database
    return { id, name: "John Doe" };
  }
}

class UserServiceForMocking {
  constructor() {
    this.database = new DatabaseForMocking();
  }

  // UserService class has method getUserById that relies on the Database class to fetch user data
  getUser(id) {
    return this.database.getUser(id);
  }
}

jest.mock("./order-total.test");

// erasing the actual implementation of a function
test("should erase the actual implementation of getUserForMocking", () => {
  const userService = new UserServiceForMocking();
  const mockGetUser = userService.database.getUser;

  // assert that the actual implementation is erased
  expect(mockGetUser).toBeDefined();
  // the mock returns undefined by default
  expect(mockGetUser()).toBeUndefined();
});

// capturing calls to the function and the parameters passed into those calls
test("should capture calls to getUserForMocking and its parameters", () => {
  const userService = new UserServiceForMocking();
  const mockGetUser = userService.database.getUser;

  // mockImplementation replaces the actual implementation of getUser with a dummy function
  mockGetUser.mockImplementation(() => {});

  userService.getUser(1);
  userService.getUser(2);

  // assert that the function was called twice
  expect(mockGetUser).toHaveBeenCalledTimes(2);
  // assert that the function was called with the correct parameter, 1
  expect(mockGetUser).toHaveBeenCalledWith(1);
  // assert that the function was called with the correct parameter, 2
  expect(mockGetUser).toHaveBeenCalledWith(2);
});

// capturing instances of constructor functions when instantiated with new
test("should capture instances of DatabaseForMocking when instantiated with new", () => {
  // instantiates new DatabaseForMocking()
  const userService = new UserServiceForMocking();

  // assert that the DatabaseForMocking constructor was called once
  expect(DatabaseForMocking).toHaveBeenCalledTimes(3);

  // assert that the userService.database is an instance of the the mocked DatabaseForMocking
  expect(userService.database).toBeInstanceOf(DatabaseForMocking);
});

// configure the mock getUser function to return specific values at test time
test("should allow test-time configuration of return values", () => {
  const userService = new UserServiceForMocking();
  const mockGetUser = userService.database.getUser;

  mockGetUser
    // allows me to specify return values for consecutibe calls to getUser
    .mockReturnValueOnce({ id: 1, name: "Alice" })
    .mockReturnValueOnce({ id: 2, name: "Bob" });

  const user1 = userService.getUser(1);
  const user2 = userService.getUser(2);

  // assert that the getUser function returns the expected user objects for each call
  expect(user1).toEqual({ id: 1, name: "Alice" });
  expect(user2).toEqual({ id: 2, name: "Bob" });
});

function forEach(items, callback) {
  for (const item of items) {
    callback(item);
  }
}

// to test forEach, I can use a mock function, and inspect the mock's state to ensure the callback is invoked as expected
const mockCallback = jest.fn((x) => 42 + x);

test("forEach mock function", () => {
  forEach([0, 1], mockCallback);

  // mock function was called twice
  expect(mockCallback.mock.calls).toHaveLength(2);

  // first argument of the first call was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // first argument of the second call was 0
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // return value of the first call was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});

/* .mock property
all mock functions have a special .mock property
.mock property - where data about how the function has been called and what the function returned is kept 
                 it also tracks the value of this for each call */
const myMock1 = jest.fn();
const a = new myMock1();
console.log(myMock1.mock.instances); // > [<a>]

const myMock2 = jest.fn();
const b = {};
const bound = myMock2.bind(b);
bound();
console.log(myMock2.mock.contexts); // > [<a>]

/* these mock members are useful in tests to assert how these functions get called, instantiated, or what they returned 
// The function was called exactly once
expect(someMockFunction.mock.calls).toHaveLength(1);

// The first arg of the first call to the function was 'first arg'
expect(someMockFunction.mock.calls[0][0]).toBe("first arg");

// The second arg of the first call to the function was 'second arg'
expect(someMockFunction.mock.calls[0][1]).toBe("second arg");

// The return value of the first call to the function was 'return value'
expect(someMockFunction.mock.results[0].value).toBe("return value");

// The function was called with a certain `this` context: the `element` object.
expect(someMockFunction.mock.contexts[0]).toBe(element);

// This function was instantiated exactly twice
expect(someMockFunction.mock.instances.length).toBe(2);

// The object returned by the first instantiation of this function
// had a `name` property whose value was set to 'test'
expect(someMockFunction.mock.instances[0].name).toBe("test");

// The first argument of the last call to the function was 'test'
expect(someMockFunction.mock.lastCall[0]).toBe("test");

/* Mock Return Values 
mock functions can also be used to inject test values into my code during a test
*/
const myMock = jest.fn();
console.log(myMock()); // > undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce("x").mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock()); // > 10, 'x', true, true

const filterTestFn = jest.fn();

// make the mock return true for the first call, and false for the second call
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

const result = [11, 12].filter((num) => filterTestFn(num)); // > [11]

console.log(filterTestFn.mock.calls[0][0]); // 11
console.log(filterTestFn.mock.calls[1][0]); // 12

/* Mocking Modules
ex. I have a class that fetches users from my API
the class useds axios to call the API then returns the data attribute which contains all the users */
jest.mock("axios");

test("should fetch users", () => {
  const users = [{ name: "Bob" }];
  const resp = { data: users };
  axios.get.mockResolvedValue(resp);
  /* or I could use the following
  axios.get.mockImplementation(() => Promise.resolve(resp)) */

  return Users.all().then((data) => expect(data).toEqual(users));
});
/* Mocking Partials
subsets of a module can be mocked and the rest of the module can keep their actual implementation
*/
jest.mock("./order-total", () => {
  const originalModule = jest.requireActual("./order-total");

  // mock the default export and named export 'foo'
  return {
    _esModule: true,
    ...originalModule,
    default: jest.fn(() => "mocked baz"),
    foo: "mocked foo",
  };
});

test("should do a partial mock", () => {
  const defaultExportResult = defaultExport();
  expect(defaultExportResult).toBe("mocked baz");
  expect(defaultExport).toHaveBeenCalled();

  expect(foo).toBe("mocked foo");
  expect(bar()).toBe("bar");
});
/*
Mock Implementations
there are cases where it's useful to full-on replace the implementation of a mock function
this can be done with jest.fn or the mockImplementationOnce method on mock functions */
const myMockFn = jest.fn((cb) => cb(null, true));

myMockFn((err, val) => console.log(val)); // > true

/* mockImplementation method is useful when I need to define the default implementation 
of a mock function that is created from another module 
jest.mock("./order-total");

foo.mockImplementation(() => 42);
foo(); // > 42

const myComplexMockFn = jest
  .fn()
  .mockImplementationOnce((cb) => cb(null, true))
  .mockImplementationOnce((cb) => cb(null, false));

myComplexMockFn((err, val) => console.log(val)); // > true

myComplexMockFn((err, val) => console.log(val)); // > false

/* when the mocked function runs out of implementations defined with mockImplementationOnce 
it will execute the default implemetation set with jest.fn 
const myMockFnNotEnoughIm = jest
  .fn(() => "default")
  .mockImplementationOnce(() => "first call")
  .mockImplementationOnce(() => "second call");

console.log(
  myMockFnNotEnoughIm(),
  myMockFnNotEnoughIm(),
  myMockFnNotEnoughIm(),
  myMockFnNotEnoughIm()
); // > 'first call', 'second call', 'default', 'default'
/* for cases where I have methods that are typically chained, and always need to return this, 
API available to simplify this in the form of a .mockReturnThis() that sits on all mocks 
const myObj = {
  myMethod: jest.fn().mockReturnThis(),
};

// is the same as

const otherObj = {
  myMethod: jest.fn(function () {
    return this;
  }),
};
/* Mock Names
I can optionally provide a name for my mock functions, which will be displayed instead of jest.fn() in the test error output
.mockName() lets me quickly identify the mock function reporting an error in my test output */
const myNamedMockFn = jest
  .fn()
  .mockReturnValue("default")
  .mockImplementation((scalar) => 42 + scalar)
  .mockName("add42");
/* Custom Matchers
// The mock function was called at least once
expect(mockFunc).toHaveBeenCalled();

// The mock function was called at least once with the specified args
expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);

// The last call to the mock function was called with the specified args
expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);

// All calls and the name of the mock is written as a snapshot
expect(mockFunc).toMatchSnapshot();

// common forms of inspecting the .mock property
// The mock function was called at least once
expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

// The mock function was called at least once with the specified args
expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);

// The last call to the mock function was called with the specified args
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
  arg1,
  arg2,
]);

// The first arg of the last call to the mock function was `42`
// (note that there is no sugar helper for this specific of an assertion)
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

// A snapshot will check that a mock was invoked the same number of times,
// in the same order, with the same arguments. It will also assert on the name.
expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
expect(mockFunc.getMockName()).toBe("a mock name");

/* unit tests prove that every cell behaves correctly, want them to be:
thorough - prove logically and completely that the object under test is behaving correctly
stable - don't want the test to break every time I change an implementation detail in the code
fast 
few 
focus on messages
every message that an object under test knows about comes from one of three places:
incoming - received from others 
outgoing - sent to others 
sent to self

every message can be of two types:
query - (no side effects) return something/change nothing 
         ex. send plus to an integer
command - (has a side effect) return nothing/change something
           ex. send save to a subclass of active record

popping something of a queue - pop something, query where I get something back 
                                changes queue, command part
queries and command have to be tested differently

incoming query - test incoming query messages 
                 by making assertions 
                 about what they send back/state 
                 assert result
                 (test the assertion and not the implementation)
*/

test("calculates diameter", () => {
  // get a new instance of the Wheel object
  const wheel = new Wheel(26, 1.5);
  // make an assertion about the value that is sent back when I send the message
  expect(wheel.diameter()).toBeCloseTo(29, 2);
});

/* incoming command - test incomming command messages
                      by making assertions
                      about direct public side effects 
                      
incoming queries and commands are only times when I make assertions about values 

receiver of incoming message has sole responsibility for asserting the result/direct public side effects */

test("setCog", () => {
  const gear = new Gear();
  // send the message that causes the side effect
  gear.setCog(27);
  // assert the side effect
  expect(gear.cog).toBe(27);
});

/*
sent to self query - do not test private methods
                     do not make assertions about their result
                     do not expect to send them
                     practical rule: do what saves me money

sent to self command - do not test private methods
                     do not make assertions about their result
                     do not expect to send them
                     practical rule: do what saves me money

outgoing query - do not test outgoing query messages
                 do not make assertions about their result
                 do not expect to send them
                 practical rule: do what saves me money

If a message has no visible side effects, the sender should not test it

outgoing command - the message must be sent, otherwise, the app won't be correct
                   it creates side effects upon which others depend
                   this is an integration test
                   expect to send outgoing command messages
                   again, expect to send
                   practical rule: break the rule if side effects are stable and cheap

                   my job to make sure my mock keep promise that it will implement a common API

Ensure mocks stay in sync with the API

*/
test("notifies observers when cogs change", () => {
  // to test that the message got sent: make a mock
  const mockObserver = {
    changed: jest.fn(),
  };
  // inject the mock
  const gear = new OtherGear(52, 11, {}, mockObserver);
  gear.setCog(27);

  // set an expectation that I send the message, trigger the event
  expect(mockObserver.changed).toHaveBeenCalledWith(52, 27);
});
