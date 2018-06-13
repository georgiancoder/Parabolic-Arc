var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");
var offsetX = canvas.OffsetLeft;
var offsetY=canvas.Offset;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var subPoints = 5;

function Line(x, y,  endX, endY, fill){
  this.x = x;
  this.y = y;
  this.endX = endX;
  this.endY = endY;
  this.fill = fill;
}

Line.prototype.draw = function(){
  ctx.save();
  ctx.strokeStyle = this.fill;
  ctx.beginPath();
  ctx.moveTo(this.x,this.y);
  ctx.lineTo(this.endX, this.endY);
  ctx.stroke();
  ctx.restore();
  ctx.closePath();
}

function Point(radius, x, y, fill){
  this.radius = radius;
  this.x = x;
  this.y = y;
  this.fill = fill;
}

Point.prototype.inCursorInside = function(mouseX,mouseY){
  if((mouseX <= this.x+this.radius && mouseX >= this.x-this.radius) && (mouseY <= this.y+this.radius && mouseY >= this.y-this.radius)){
    return true;
  }
}
Point.prototype.draw = function(){
  ctx.save();
  ctx.fillStyle = this.fill;
  ctx.beginPath();
  ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
  ctx.fill();
  ctx.closePath();
}


  var point1 = new Point(10,canvas.width/2-200,canvas.height/2, "black");
var point2 = new Point(10,canvas.width/2+200,canvas.height/2+200, "black");
var point3 = new Point(10,canvas.width/2+200,canvas.height/2-200, "black");

var line1 = new Line(canvas.width/2-200, canvas.height/2, canvas.width/2 + 200, canvas.height/2+200, "red");
var line2 = new Line(canvas.width/2-200, canvas.height/2, canvas.width/2 + 200, canvas.height/2-200, "red");


function clearCanvas(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
}



function createSubPoints(line, numofSubPoints){
  var subpoints = [];
  var intervalX = (line.endX - line.x)/numofSubPoints;
  var intervalY = (line.endY - line.y) / numofSubPoints;
  for(i=1; i<=numofSubPoints-1; i++){
    subpoints.push(new Point(5,line.x + (i*intervalX),line.y + (i*intervalY), "green"));
  }
  return subpoints;
}

var subp1;
var subp2;

function drawSubPoints(pointsArr){
  for(i=0; i<pointsArr.length; i++){
    pointsArr[i].draw();
  }  
}

function drawSubLines(){
  for(i=0; i<subp1.length; i++){
    var line = new Line(subp1[i].x, subp1[i].y, subp2[(subp2.length-1)-i].x, subp2[(subp2.length-1)-i].y, "blue");
    line.draw();
  }
}

function drawScreen(){ 
  clearCanvas();
line1.draw();
line2.draw();
  
point1.draw();
point2.draw();
point3.draw();
  subp1 = createSubPoints(line1,subPoints);
  subp2 = createSubPoints(line2,subPoints);
  drawSubPoints(subp1);
  drawSubPoints(subp2);
  drawSubLines();
}

drawScreen();

function dragpoint(e){
  mouseX=parseInt(e.clientX);
      mouseY=parseInt(e.clientY);
  
      if(point1.inCursorInside(mouseX,mouseY))
      {
  $("canvas").mousemove(function(e){
          clearCanvas();
        point1.x = e.clientX;
        point1.y = e.clientY;
        line1.x = e.clientX;
        line2.x = e.clientX;
        line1.y = e.clientY;
        line2.y = e.clientY;
        drawScreen();
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();
        });
      }
      else if(point2.inCursorInside(mouseX,mouseY)){
         $("canvas").mousemove(function(e){
        point2.x = e.clientX;
        point2.y = e.clientY;
        line1.endX = e.clientX;
        line1.endY = e.clientY;
        drawScreen();
           e.stopPropagation();
    e.stopImmediatePropagation();
           e.preventDefault();
      });
      }
  else if(point3.inCursorInside(mouseX,mouseY)){
    $("canvas").mousemove(function(e){
        point3.x = e.clientX;
        point3.y = e.clientY;
        line2.endX = e.clientX;
        line2.endY = e.clientY;
        drawScreen();
      e.stopPropagation();
    e.stopImmediatePropagation();
      e.preventDefault();
    });
      }
}

// $("canvas").mousedown(function(e){
//   $("canvas").mousemove(function(e){
    
//     dragpoint(e);
//     e.stopPropagation();
//     e.stopImmediatePropagation();
//     e.preventDefault();
//   });
      
// }).mouseup(function(e){
//   console.log('mouse is up');
//   e.stopPropagation();
//     e.stopImmediatePropagation();
//   e.preventDefault();
//   $("canvas").off("mousemove");
  
// });

$("canvas").mousedown(dragpoint).mouseup(function(e){
      $("canvas").off("mousemove");    
  e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();
});



$("#points").change(function(e){
  subPoints = e.target.value;
  drawScreen();
});