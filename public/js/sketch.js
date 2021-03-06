var socket;
var myColor1;
var myColor2;
var myColor3;
var sizeSlider;

function setup() {
  socket = io.connect('https://gridmapdraw.herokuapp.com/');
  bg = loadImage('images/gridBoard.png');

  // listens for mouse events from server and calls the newdrawing function
  socket.on('mouse', newDrawing);

  var cnv = createCanvas(1000, 740);
  rSlider = createSlider(0, 255, 0);
  rSlider.position(50, 3);
  gSlider = createSlider(0, 255, 0);
  gSlider.position(50, 42);
  bSlider = createSlider(0, 255, 255);
  bSlider.position(50, 84);
  sizeSlider = createSlider(0, 255, 70);
  sizeSlider.position(50, 125);
  cnv.position(200,20);
};

// this draws connected player's stuff

function newDrawing(data) {
  noStroke();
  redTint = data.redTint;
  greenTint = data.greenTint;
  blueTint = data.blueTint;
  radius = data.radius;
  opacity = 0;
  fill(redTint,greenTint,blueTint );
  ellipse(data.x, data.y, radius, radius);  
};

function mouseDragged() {
  console.log('this guy is drawing now ' + socket.id);
  console.log('sending this to the server' + mouseX + ',' + mouseY);

  // creates a data object

  var data = {
    x: mouseX,
    y: mouseY,
    redTint: myColor1,
    greenTint: myColor2,
    blueTint: myColor3,
    radius: radius
  };

  // when mouse button is held down the data object
  // is sent to the server
  
  socket.emit('mouse', data);
  
  // disables outline
  noStroke();

  // fills a RGB value
  fill(myColor1, myColor2, myColor3);

  // sets size
  ellipse(mouseX, mouseY, radius, radius);
};


// this is a game loop that is refreshing the canvas
function draw() {
  // console.log('drawing!');
  myColor1 = rSlider.value();
  myColor2 = gSlider.value();
  myColor3 = bSlider.value();
  radius = sizeSlider.value();
  background(bg);
};

function eraser() {
  // makes the RGB values white to erase stuff
  rSlider = createSlider(0, 255, 255);
  rSlider.position(50, 3);
  gSlider = createSlider(0, 255, 255);
  gSlider.position(50, 42);
  bSlider = createSlider(0, 255, 255);
  bSlider.position(50, 84);
  sizeSlider = createSlider(0, 255, 70);
  sizeSlider.position(50, 125);  
};


