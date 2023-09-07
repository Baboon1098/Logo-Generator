const fs = require('fs');
const { createSVG } = require('svg.js');

function createLogo(text, textColor, shape, shapeColor) {
    const canvas = createSVG(300, 200);
  
    let shapeElement;
    switch (shape) {
      case 'circle':
        shapeElement = canvas.circle(150, 100, 50).fill(shapeColor);
        break;
      case 'triangle':
        shapeElement = canvas.polygon([[150, 50], [100, 150], [200, 150]]).fill(shapeColor);
        break;
      case 'square':
        shapeElement = canvas.rect(100, 50, 100, 100).fill(shapeColor);
        break;
      default:
        console.error('Invalid shape');
        process.exit(1);
    }
}