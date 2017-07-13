var canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


var c = canvas.getContext("2d");
/*
c.fillRect(100, 100, 50, 250);
c.fillRect(200, 100, 50, 250);
c.fillStyle = "rgba(0, 100, 20, 0.4)";
c.fillRect(400, 100, 50, 250);
c.fillRect(500, 100, 50, 250);

// line

c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.strokeStyle = "#f5f";
c.stroke();

// arc
c.beginPath();



for (let i = 0; i < 90; i++) {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let ranColor = '#' + (Math.random().toString(16) + '000000').substring(2,8);
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false );
    c.strokeStyle = ranColor;
    c.stroke();
    
}
*/

var mouse = {
    x: null,
    y: null
}

addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
})

addEventListener('resize', function(event){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
                 })
var maxRadius = 40;
//var minRadius = 2;

var colorArray = [
    '#320e3b',
    '#bfd1e5',
    '#ebf5ee',
    '#d84797',
    '#3abeff',
 
]

function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    
    this.draw = function() {

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false );
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.fill();
        c.stroke();

    }
    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        
        this.x += this.dx;
        this.y += this.dy;
        // interactive
         
        if (mouse.x - this.x < 50 && mouse.x -this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius){
            this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        
        
        this.draw();
        
} 
    }




var circleArray = [];


function init() {
    circleArray = [];
    
for (let i=0; i < 300; i++){
    var radius = Math.random()* 2 + 1;
    var x = Math.random()* (innerWidth - radius * 2) + radius;
    var y = Math.random()* (innerHeight - radius * 2) + radius;
    var dx = (Math.random() -0.5)*5;
    var dy = (Math.random() - 0.5)*5;
   // var color = '#' + (Math.random().toString(16) + '000000').substring(2,8);
 
    circleArray.push(new Circle(x, y, dx, dy, radius));
}
console.log(circleArray);
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
  
}
init();
animate();

