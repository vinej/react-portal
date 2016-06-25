// coul be set by a text function
// 
var testFunction = null

export function setTestFunction(testFct) {
  testFunction = testFct;
}

export default function(action, next) {
  if (testFunction) {
    testFunction(action)
  }

  return next(null, action);
}