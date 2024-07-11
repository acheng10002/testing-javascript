const axios = require("axios");

/* in order to test this method without actually hitting the API, I can use jest.mock(...)
to automatically mock the axios module 
then I can provide a mockResolvedValue for .get that returns the data I want my test to assert against
I am saying I want axois.get('/users.json') to return a fake response */
class Users {
  static all() {
    return axios.get("/users.json").then((resp) => resp.data);
  }
}

/* this needs to be made asynchronous, returning a promise
because fetch is an argument in orderTotal, fetch does not need to be required 
dependency injection - technique in unit testing where I pass in what would be a module,
as an argument instead */
function orderTotal(fetch, order) {
  fetch(
    "https://eu.vatapi.com/v2/vat-rate-check?rate_type=TBE&country_code=" +
      order.country
  );
  // Promise.resolve takes a value and wraps it in a promise
  return Promise.resolve(
    order.items.reduce((prev, cur) => cur.price * (cur.quantity || 1) + prev, 0)
  );
}

/* adding code that synchronously fetches data from a web service
the call to do this will be mocked 
vatAPI.com - service that will calculate the relevant VAT for me 
1. first get acquainted with a new API 
   call the vat api, completely isolated from all my other code */

/* quickest, simplest, easiest way to make the test pass is to return the URL expected 
only write enough code to make the test pass */
const FlickrFetcher = {
  //   photoObjToURL: function (photoObj) {
  //     if (photoObj.id === "25373736106") {
  //       return "https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg";
  //     }
  //     if (photoObj.id === "24765033584") {
  //       return "https://farm2.staticflickr.com/1514/24765033584_3c190c104e_b.jpg";
  //     }
  //     return "https://farm2.staticflickr.com/1577/24770505034_31a9986429_b.jpg";
  //   },
  /* defines photoObjToURL property on the FlickrFetcher object 
  photoObjToURL is a function that takes the parameter, photoObj, and converts it into a URL string */
  photoObjToURL: function (photoObj) {
    // returns an array literal that will be used to construct the URL
    return [
      // 1st element in  the array is the string
      "https://farm",
      // 2nd element is the value of photoObj.farm, a number representing the farm ID
      photoObj.farm,
      // 3rd element is the string
      ".staticflickr.com/",
      // 4th element is the value of photoObj.server, a string representing the server ID
      photoObj.server,
      // 5th element is the string
      "/",
      // 6th element is the value of photoObj.id, a string representing the photo ID
      photoObj.id,
      // 7th element is the string
      "_",
      // 8th element is the value of photoObj.secret, a string representing the secret key of the photo
      photoObj.secret,
      // 9th element is the string
      "_b.jpg",
      // .join() concatenates all the elements of the array into a single string without any separators
    ].join("");
  },
};

/* mocks - simulate the behavior of real objects and produce assertions about how they were 
           manipulated during the test run
   assertions - expect 
   Jest - testing framework that provides mocking capabilities making it easy to create mocks
          and verify their interactions in tests 
Use mocks, make assertions about their usage, and this ensures my code interacts with its 
dependencies correctly */

/* connects to the Flickr API to find the latest pictures of Pugs 
assertion - bit that does the actual test as opposed to all the setup stuff 

Mock Functions
mocks let me test the links between code by:
erasing the actual implementation of a function
capturing calls to the function (and the parameters passed into those calls)
capturing instances of constructor functions when instantiated with new 
allowing test-time configuration of return values 

two ways to mock functions:
1. create a mock function to use in test code
2. write a manual mock to override a module dependency

Using a mock function
testing implementation of a function, forEach, which invokes a callback for each item in a supplied array
*/

const foo = "foo";
const bar = () => "bar";

function fooFunction() {}

class Wheel {
  constructor(rim, tire) {
    this.rim = rim;
    this.tire = tire;
  }

  rim() {
    return this.rim;
  }

  tire() {
    return this.tire;
  }
  /* diameter is a query, changes nothing but does a calculation and returns a result */
  diameter() {
    return this.rim + this.tire * 2;
  }
}

class Gear {
  constructor(chainring, cog, wheel) {
    this.chainring = chainring;
    this.cog = cog;
    this.wheel = wheel;
  }

  chainring() {
    return this.chainring;
  }

  cog() {
    return this.cog;
  }

  wheel() {
    return this.wheel;
  }

  setCog(newCog) {
    this.cog = newCog;
  }

  gearInches() {
    return this.ratio() * this.wheel.diameter();
  }

  ratio() {
    return this.chainring / this.cog;
  }
}

class OtherGear {
  constructor(chainring, cog, wheel, observer) {
    this._chainring = chainring;
    this._cog = cog;
    this._wheel = wheel;
    this._observer = observer;
  }

  get chainring() {
    return this._chainring;
  }

  get cog() {
    return this._cog;
  }

  get wheel() {
    return this._wheel;
  }

  get observer() {
    return this._observer;
  }

  setCog(newCog) {
    this._cog = newCog;
    this.changed();
    return this._cog;
  }

  changed() {
    if (this._observer && typeof this._observer.changed === "function") {
      this._observer.changed(this._chainring, this._cog);
    }
  }
}

module.exports = {
  Users,
  orderTotal,
  FlickrFetcher,
  foo,
  bar,
  fooFunction,
  Wheel,
  Gear,
  OtherGear,
};

// module.exports = () => "baz";
