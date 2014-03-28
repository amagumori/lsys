$(document).ready(function() {

  var c = document.getElementById("canvas1");
  var ctx = c.getContext("2d");
  var Xcor = c.width / 2;
  var Ycor = (c.height / 3) + 50;   // change this back
  ctx.translate(Xcor, Ycor);
  var rot = 0;

/*  L-SYSTEM
 *  Constructor should take an options object as argument with:
 *  axiom : String
 *  rule : String
 *  generations : Number
 *  angle : Number
 *  length : Number
 *  [optional] :
 *  strokeColor : Array (4-element array : R | G | B | A )
 */

function Lsys(options) {

  for (var k in options) this[k] = options[k];

  if (typeof(this.axiom) == undefined) {
    this.axiom = "default axiom.";     // CHANGEME
  }
  if (typeof(this.rule) == undefined) {
    this.rule = "default rule.";     // CHANGEME
  }
  if (typeof(this.generations) == undefined) {
    this.generations = "default generations.";
  }
  if (typeof(this.angle) == undefined) {
    this.angle = 60;
  }
  if (typeof(strokeColor) == undefined) {
    this.strokeColor = [140, 240, 140, 0.8];     // CHANGEME
  }

  this.currentString = this.axiom
  this.index = 0;

  console.log(JSON.stringify(this))

  //ctx.strokeStyle = 'white';
  ctx.strokeStyle = 'rgba(65, 226, 244, 0.012);'

}

Lsys.prototype.recursiveSolver = function() {

  if (this.generations > 0) { 
    this.currentString = this.currentString.replace("F", this.rule);
    console.log(this.currentString);
    this.generations -= 1;
    this.recursiveSolver();
  }
  this.turtle(this.currentString);
}

Lsys.prototype.turtle = function(string) {
  for(var idx=0; idx < string.length; idx++) {
    var str = string.charAt(idx);
    switch(str) {
      case "F":
        FORWARD(this.length);
        console.log(Xcor, Ycor, rot);
        break;
      case "X": 
        break;
      case "-":
        LEFT(this.angle);
        break;
      case "+":
        RIGHT(this.angle);
        break;
      default:
        return new Error("character not found in grammar.")
        break;
    }
  }
}

var Lsystems = {
  houdini3 : {
    axiom : "F-F-F-F-F-F",
    rule  : "F-F+F-F-F+F",
    generations : 128,
    angle : 60.1,
    length : 180,
    strokeColor : [160, 140, 180, 0.8], 
    backgroundColor : [18, 18, 18]
  }
}

// "private" / helper functions

function FORWARD(len) { 
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, - len*2);
  ctx.translate(0, -len);
  ctx.stroke();
  Xcor += len * Math.cos(BEARING() * Math.PI / 180);
  Ycor += len * Math.sin(BEARING() * Math.PI / 180);
}

function BEARING() { 
  return rot + 90;
}

function RIGHT(ang) { 
  rot -= ang;
  rot = rot % 360;
  ctx.rotate(ang * Math.PI / 90.1);
}

function LEFT(ang) { 
  RIGHT( - ang )
}

function SQUARE() { 
  FORWARD(40);
  RIGHT(90);
  FORWARD(40);
  RIGHT(90);
  FORWARD(40);
  RIGHT(90);
  FORWARD(40);
  RIGHT(90);
}

function OUT_OF_BOUNDS() { 
  if (Xcor < 0 || Xcor >= c.width) { 
    return true;
  } else if (Ycor < 0 || Ycor >= c.height) { 
    return true;
  } else {
    return false;
  }
}

function RESET() { 
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

var l = new Lsys(Lsystems.houdini3);
l.recursiveSolver();

})
