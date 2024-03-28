import { JSON1 } from './JSONSender.js';

function generateNav() {
  const navContainer = document.getElementById('main-nav');

  Object.entries(JSON1).forEach(([key, value]) => {
    const exampleElement = document.createElement('span');
    exampleElement.textContent = `${key}: ${value}`;
    navContainer.appendChild(exampleElement);
  });
}

window.addEventListener('load', generateNav);