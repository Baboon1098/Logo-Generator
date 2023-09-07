const fs = require('fs');
const inquirer = require('inquirer');

function generateSVG(text, textColor, shape, shapeColor) {
  let svgContent;

  if (shape === 'circle') {
    svgContent = `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="150" cy="100" r="50" fill="${shapeColor}" />
        <text x="50%" y="50%" fill="${textColor}" text-anchor="middle">${text}</text>
      </svg>
    `;
  } else if (shape === 'triangle') {
    svgContent = `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <polygon points="150,50 100,150 200,150" fill="${shapeColor}" />
        <text x="50%" y="50%" fill="${textColor}" text-anchor="middle">${text}</text>
      </svg>
    `;
  } else if (shape === 'square') {
    svgContent = `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${shapeColor}" />
        <text x="50%" y="50%" fill="${textColor}" text-anchor="middle">${text}</text>
      </svg>
    `;
  }

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