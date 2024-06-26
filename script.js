var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var circles = [
  {x: 50, y: 50, color: "red", initialColor: "red", hit: false, arrowX: 470, arrowY: 50},
  {x: 50, y: 150, color: "green", initialColor: "green", hit: false, arrowX: 470, arrowY: 150},
  {x: 50, y: 250, color: "blue", initialColor: "blue", hit: false, arrowX: 470, arrowY: 250},
  {x: 50, y: 350, color: "yellow", initialColor: "yellow", hit: false, arrowX: 470, arrowY: 350}
];


// Function to draw a circle
function drawCircle(circle) {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, 20, 0, 2 * Math.PI);
  ctx.fillStyle = circle.color;
  ctx.fill();
}

// Function to draw an arrow
function drawArrow(circle) {
  var headlen = 15; // length of head in pixels
  var fromx = circle.arrowX;
  var fromy = circle.arrowY;
  var tox = circle.arrowX - 20;
  var toy = circle.arrowY;
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  ctx.beginPath();
  ctx.moveTo(fromx, fromy); // Start at the head
  ctx.lineTo(tox, toy); // Draw line to the tail
  ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6)); // Draw line for arrow head
  ctx.moveTo(tox, toy); // Move back to the tail
  ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6)); // Draw line for other half of arrow head
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 2;
  ctx.stroke();
}


// Function to draw the canvas
function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(function(circle) {
    drawCircle(circle);
    drawArrow(circle);
  });
}

// Function to check if a point is inside a circle
function isPointInCircle(x, y, circle) {
  var dx = x - circle.x;
  var dy = y - circle.y;
  return dx * dx + dy * dy <= 20 * 20;
}

// Handle click events on the canvas
canvas.addEventListener('click', function(event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  circles.forEach(function(circle) {
    if (isPointInCircle(x, y, circle) && !circle.hit) {
      circle.hit = true;
      var intervalId = setInterval(function() {
        if (circle.arrowX > circle.x + 40) {
          circle.arrowX -= 4; // Increased the speed
          drawCanvas();
        } else {
          clearInterval(intervalId);
          circle.color = "gray"; // Change color to gray when arrow touches the circle
        }
      }, 100); // Decreased the interval
    }
  });
});


// Handle click events on the reset button
document.getElementById("resetButton").addEventListener('click', function() {
  circles.forEach(function(circle) {
    circle.hit = false;
    circle.arrowX = 470;
    circle.arrowY = circle.y; // Reset the arrowY position
    circle.color = circle.initialColor; // Reset the color to the initial color
  });
  drawCanvas();
});



// Draw the initial canvas
drawCanvas();
