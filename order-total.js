function orderTotal(order) {
  return order.items.reduce(
    (prev, cur) => cur.price * (cur.quantity || 1) + prev,
    0
  );
}

function sum(a, b) {
  return a + b;
}

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

module.exports = {
  orderTotal,
  sum,
  FlickrFetcher,
};

/* connects to the Flickr API to find the latest pictures of Pugs 
assertion - bit that does the actual test as opposed to all the setup stuff */