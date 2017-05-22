# CursorPointer
A JavaScript module to always point the mouse cursor pointer at a desired HTML element.

## Usage

Import the cursor-pointer.js file. Then in your script use `CursorPointer.pointAt` to start pointing.

```javascript
// Make sure the DOM has been loaded before trying to point to the element.
onload = function init() {
  
  var myDiv = document.getElementById("myDiv");
  CursorPointer.pointAt(myDiv);
  
};
```
