window.onload = function() {

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var xCoord = canvas.width / 2;
var yCoord = canvas.height / 2;
// for "sierpinski": bias x = -165, bias y = -130
var originBiasX = 0;
var originBiasY = 0;
ctx.translate(xCoord + originBiasX, yCoord + originBiasY);
var rot = 0;

function Lsys ( options ) {
  for (var k in options) this[k] = options[k];

  this.currentString = this.axiom;
  this.index = 0;
  ctx.strokeStyle = this['strokeColor'];
}

Lsys.prototype.recursiveSolver = function ( ) {
  var fRegex = /F/g;
  var gRegex = /G/g;

  if ( this.generations > 0 ) {
    this.currentString = this.currentString.replace(fRegex, this.rule);
    console.log(this.currentString);
    this.generations -= 1;
    this.recursiveSolver();
  }
  this.turtle(this.currentString);
}

Lsys.prototype.turtle = function ( string ) {
  for (var i=0; i < string.length; i++ ) {
    var ch = string.charAt(i);
    switch ( ch ) {
      case 'F':
        forward(this.length);
        break;
      case '-':
        left(this.angle);
        break;
      case '+':
        right(this.angle);
        break;
      default:
        return new Error('character not found in grammar.');
        break;
    }
  }
}

function forward ( len ) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, - len*2);
  ctx.translate(0, -len);
  ctx.stroke();
  xCoord += len * Math.cos(bearing() * Math.PI / 180);
  yCoord += len * Math.sin(bearing() * Math.PI / 180);
}

function bearing () {
  return rot + 90;
}

function left ( angle ) {
  rot += angle;
  rot = rot % 360;
  ctx.rotate(angle * Math.PI / 180);
}

function right ( angle ) {
  left(-angle);
}

function reset () {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

var sierpinski = {
  axiom : "F+F+F+F+F+F+F+F+F+F+F+",
  rule : "F--F++F-F-F-F-F++F--F",
  generations : 4,
  angle : 15,
  length: 10,
  strokeColor : 'rgba(160, 140, 180, 0.07)'
}

var pattern2 = {
  axiom : "F--F+++F--F+++F--F+++F--F+++F--F+++F--F+++",
  rule : "F+F+F++F+F+F++",
  generations : 5,
  angle : 30,
  length : 50,
  strokeColor : 'rgba(140, 25, 223, 0.02)'
}

var pattern3 = {
  axiom : "F-F+++F-F+++F-F+++F-F+++F-F+++F-F+++F",
  rule : "F+F+F++F+F+F++F+F+F++F+",
  generations : 5,
  angle : 30,
  length : 50,
  strokeColor : 'rgba(140, 25, 223, 0.01)'
}

var l = new Lsys(pattern2);
l.recursiveSolver();

};
