const modulePath = document.querySelector('meta[name="json-path"]').getAttribute('content');

import(modulePath)
.then(module => {
  const json = module.default;
  generateNav(json);
})
.catch(error => {
  console.error("Error with json", error);
})

function generateNav(json) {

  const navContainer = document.createElement('nav');
  navContainer.classList.add('bg-blue-800', "px-4", "py-8", "flex", "gap-8", "text-white");
  document.body.insertBefore(navContainer, document.body.firstChild);

  const aboutContainer = document.createElement('ul');
  aboutContainer.setAttribute("id", "aboutContainer");
  navContainer.appendChild(aboutContainer);
  
  Object.entries(json.About).forEach(([key, value]) => {
    const liElement = document.createElement('li');
    liElement.innerHTML=` <a href="${value}">${key}</a>`
    aboutContainer.appendChild(liElement)
  });
  
  const howToContainer = document.createElement('ul');
  howToContainer.setAttribute("id", "howToContainer");
  navContainer.appendChild(howToContainer);

  Object.entries(json['How to']).forEach(([key, value]) => {
    const liElement = document.createElement('li');
    liElement.innerHTML=` <a href="${value}">${key}</a>`
    howToContainer.appendChild(liElement)
  });

  const loginSpan = document.createElement('span');
  loginSpan.innerHTML = `<a class="px-4 py-2 rounded bg-white text-blue-800" href="${json.login}">Login</a>`;
  navContainer.appendChild(loginSpan);
}