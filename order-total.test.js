// import the three modules
const { orderTotal, sum, FlickrFetcher } = require("./order-total");

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

it("Quantity", () =>
  expect(
    orderTotal({
      items: [{ name: "dragon candy", price: 2, quantity: 3 }],
    })
  ).toBe(6));

// if (
//   orderTotal({
//     items: [{ name: "dragon candy", price: 2, quantity: 3 }],
//   }) != 6
// ) {
//   throw new Error("Check fail: Quantity");
// }

it("Happy path (Example 1)", () =>
  expect(
    orderTotal({
      items: [
        { name: "dragon food", price: 8, quantity: 1 },
        { name: "dragon cage (small)", price: 800, quantitiy: 1 },
      ],
    })
  ).toBe(808));

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
  expect(
    orderTotal({
      items: [
        { name: "dragon collar", price: 20, quantity: 1 },
        { name: "dragon chew toy", price: 40, quantitiy: 1 },
      ],
    })
  ).toBe(60));

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

it("No quantity specified", () =>
  expect(
    orderTotal({
      items: [{ name: "dragon candy", price: 3 }],
    })
  ).toBe(3));

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
describe("FlickrFetcher", () => {
  /* first test case - checks existence */
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
    });
  });
});

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
