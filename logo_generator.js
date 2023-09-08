const fs = require('fs');
const inquirer = require('inquirer');
const {Circle} = require('./lib/shapes');
const {Triangle} = require('./lib/shapes');
const {Square} = require('./lib/shapes');

function generateSVG(text, textColor, shape, shapeColor) {
  let svgContent;
  let shapeInstance;

  if (shape === 'circle') {
    shapeInstance = new Circle();
  } else if (shape === 'triangle') {
    shapeInstance = new Triangle();
  } else if (shape === 'square') {
    shapeInstance = new Square();
  }

  // Debug: Print shape and shapeInstance
  console.log('Selected Shape:', shape);
  console.log('Shape Instance:', shapeInstance);

  // Debug: Check if setColor method exists
  if (typeof shapeInstance.setColor === 'function') {
    shapeInstance.setColor(shapeColor);
  } else {
    console.error('setColor method not found on shapeInstance');
  }

  svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shapeInstance.render()}
      <text x="50%" y="50%" fill="${textColor}" text-anchor="middle">${text}</text>
    </svg>`;

  fs.writeFileSync('logo.svg', svgContent);
  console.log('Generated logo.svg');
}


inquirer
  .prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters:',
      validate: (input) => {
        if (input.length <= 3) {
          return true;
        }
        return 'Please enter up to three characters.';
      },
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter text color (color keyword or hexadecimal number):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter shape color (color keyword or hexadecimal number):',
    },
  ])
  .then((answers) => {
    generateSVG(answers.text, answers.textColor, answers.shape, answers.shapeColor);
  })
  .catch((error) => {
    console.error(error);
  });

  // test