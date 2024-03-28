import { json } from './json1.js';

function generateNav() {
  const navContainer = document.getElementById('main-nav');

  // Iterating over the 'About' section
  Object.entries(json.About).forEach(([key, value]) => {
    const spanElement = document.createElement('span');
    spanElement.innerHTML = `<a href="${value}">${key}</a>`;
    navContainer.appendChild(spanElement);
  });

  // Iterating over the 'How to' section
  Object.entries(json["How to"]).forEach(([key, value]) => {
    const spanElement = document.createElement('span');
    spanElement.innerHTML = `<a href="${value}">${key}</a>`;
    navContainer.appendChild(spanElement);
  });

  // Adding the login link
  const loginSpan = document.createElement('span');
  loginSpan.innerHTML = `<a href="${json.login}">Login</a>`;
  navContainer.appendChild(loginSpan);
}

window.addEventListener('load', generateNav);