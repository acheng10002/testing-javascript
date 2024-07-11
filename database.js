class Database {
  findUserById(userId) {
    // simulate database lookup
    return { id: userId, name: "John Doe" };
  }
}

module.exports = Database;

/* unit test - test individual units (modules, functions, classes) in isolation
integration test - test integrations between two or more units
functional test - test the application from the point of view of the user 
                  functional tests are a subset of integration tests

user interaction workflow - simulated UI manipulation, to data layer updates, and back to the user output 

forms of coupling
1. subclass coupling - subclasses depend on the implementation and entire hierarchy of the parent class
FUNCTION COMPOSITION IS BETTER THAN CLASS INHERITANCE
2. control dependencies - code that controls its dependencies by telling them what to do
                          if the control API of the dependency changes, the dependent code will break 
DOING ONE THING IS BETTER THAN RESPONSIBILITY OVERLOAD
3. mutable state dependencies - code that shares mutable state with other code e.g. can change properties on a shared object
                                ex. two functions sharing an object
IMMUTABILITY IS BETTER THAN MUTATION
4. state shape dependencies - code that shares data structures with other code, and only uses a subset of the structure
                              if the shape of the shared structure changes, it could break the dependent code
DESCRIBING STRUCTURE IS BETTER THAN PROCEDURAL INSTRUCTIONS
5. event/message coupling - code that communicates with other units via message passing, events, etc. 
PURE FUNCTIONS AND ISOLATED SIDE EFFECTS IS BETTER THAN SIDE-EFFECTS

tight coupling is caused by:
class inheritance - coupling is multiplied by each layer of inheritance and each descendant class
global variables
mutable global state (browser DOM, shared storage, network)
module imports with side-effects
implicit dependencies from compositions ex. const enhancedWidgetFactory = compose(eventEmitter, widgetFacotry, enhancements)
    widgetFactory depends on eventEmitter
dependency injection containers
dependency injection parameters
control paramters (an outside unit is controlling the subject unit by telling it what to do)
mutable parameters 

loose coupling:
module imports without side-effects 
message passing/pubsub
immutable parameters (can still cause shared dependencies on state shape)

Just how tightly or loosely coupled is a unit?

Ask: Can the unit be tested without mocking dependencies? If it can't, it's tightly coupled to the mocked dependencies

How to loosen coupling:
1. use pure functions instead of classes, imperative procedures, or mutating functions
2. isolate side-effects from the rest of my program logic; don't mix logic with I/O (including network I/O, rendering UI, logging)
3. remove dependent logic from imperative compositions to make the compositions delcarative
   declarative compositions do not need their own unit tests 
   Don't unit test I/O.
   I/O is for integrations. Use integration tests instead.
   It's ok to mock and fake for integration tests.
   
pure functions cannot directly mutate global variables, the arguments passed into them, the network, 
the disk, or the screen; all they do is return a value

if I'm passed an array or an object, and I want to return a changed version of the object, I 
can't just make the changes to the object and return it, I have to create a new copy of the
object with the required changes
use array accessor methods (concat, filter, map, reduce, slice), Object.assign(), using a new
empty object as the target, or the array or object spread syntax
*/

// not pure
const signInUser = (user) => (user.isSignedIn = true);

const foo = {
  name: "Foo",
  isSignedIn: false,
};
// Foo was mutated
console.log(
  signInUser(foo), // true
  foo
); // { name: "Foo", isSignedIn: true }

// pure
const pureSignInUser = (user) => ({ ...user, isSignedIn: true });
const pureFoo = {
  name: "Foo",
  isSignedIn: false,
};
// Foo was not mutated
console.log(
  signInUser(foo), // { name: "Foo", isSignedIn: true }
  foo // { name: "Foo", isSignedIn: false }
);

/* I can use a library for immutable data types 
by creating a new object, I can use an identity comparison check to detect changes to the object 

isolate side-effects from the rest of my program logic:
1. use pub/sub to decouple I/O from views and program logic
   emit an event or action object describing an event or intent 
2. isolate logic from I/O, compose functions which return promises 
3. use objects that represent future computations rather than directly triggering computation with I/O 

1. Use a publish/subscribe pattern, pub/sub pattern
   in them, units don't directly all each other
   instead, they publish messages that other units (subscribes listen to) 
   publishers don't know what if any units will subscribe and subscribers don't know what 
   if any publishers will publish 
   
2. isolate logic from I/O 
   monad compositions (like promises) can be used to eliminate dependent logic from compositions */
