const canvas = document.getElementById('scribbleCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearCanvas');

// Set canvas size to be responsive
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.6;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let painting = false;

function startPosition(e) {
  painting = true;
  draw(e);
}

function endPosition() {
  painting = false;
  ctx.beginPath(); // Reset the path
}

function draw(e) {
  if (!painting) return;

  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#333';

  // Get mouse or touch position
  const posX = e.clientX || e.touches[0].clientX;
  const posY = e.clientY || e.touches[0].clientY;

  ctx.lineTo(posX - canvas.offsetLeft, posY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(posX - canvas.offsetLeft, posY - canvas.offsetTop);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// Touch events for mobile devices
canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw);

// Clear button functionality
clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
