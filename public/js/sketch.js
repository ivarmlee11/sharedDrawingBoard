var socket;
var myColor1;
var myColor2;
var myColor3;
var sizeSlider;

function setup() {
  socket = io.connect(PORT);
  bg = loadImage('images/gridBoard.png');
  socket.on('mouse', newDrawing);
  var cnv = createCanvas(1000, 740);

  rSlider = createSlider(0, 255, 0);
  rSlider.position(20, 20);
  gSlider = createSlider(0, 255, 0);
  gSlider.position(20, 50);
  bSlider = createSlider(0, 255, 255);
  bSlider.position(20, 80);
  sizeSlider = createSlider(0, 255, 70);
  sizeSlider.position(20, 110);
  cnv.position(200,20)
};

function newDrawing(data) {
  noStroke();
  redTint = data.redTint;
  greenTint = data.greenTint;
  blueTint = data.blueTint;
  radius = data.radius
  opacity = 0
  fill(redTint,greenTint,blueTint );
  ellipse(data.x, data.y, radius, radius);  
};


function mouseDragged() {
  console.log('this guy is drawing now ' + socket.id);
  console.log('sending this to the server' + mouseX + ',' + mouseY);

  var data = {
    x: mouseX,
    y: mouseY,
    redTint: myColor1,
    greenTint: myColor2,
    blueTint: myColor3,
    radius: radius
  };

  socket.emit('mouse', data);

  noStroke();
  fill(myColor1, myColor2, myColor3);
  ellipse(mouseX, mouseY, radius, radius);
};



function draw() {
  myColor1 = rSlider.value();
  myColor2 = gSlider.value();
  myColor3 = bSlider.value();
  radius = sizeSlider.value();
  background(bg);
};




