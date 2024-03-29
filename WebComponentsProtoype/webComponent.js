class UniversalHeader extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    async connectedCallback() {
      const modulePath = document.querySelector('meta[name="json-path"]').getAttribute('content');
      try {
        const { default: data } = await import(modulePath);
        const menuContent = Object.entries(data)
          .filter(([key]) => typeof data[key] === 'object' && key !== 'Image')
          .map(([menuName, menuItems]) => `
            <section class="menu-section">
              <h2>${menuName}</h2>
              <ul class="hide">
                ${Object.entries(menuItems).map(([key, value]) => `
                  <li>
                    <a href="${value}">${key}</a>
                  </li>
                `).join('')}
              </ul>
            </section>
          `).join('');
  
        this.shadowRoot.innerHTML = `
          <style>
            nav {
              display: flex;
              align-items: center;
              padding: 1rem;
              justify-content: space-between;
              background-color: #004a89;
              color:#f2f2f2;
              height: fit;
            }

            img {
                height: 5rem;
            }

            section:hover {
              background-color: gray;
            }

            .show {
              display: block;
            }

            .hide {
              display: none;
            }

            ul {
                position: absolute;
                background-color: gray;
            }
            li {
                list-style: none;
            }

            a:link {
                text-decoration: inherit;
                color: inherit;
                cursor: auto;
            }
            
          </style>
          <nav>
            <img src="${data.Image}" alt="Header Image">
            ${menuContent}
            <a href="${data.login}">Login</a>
          </nav>
        `;
  
        this.shadowRoot.querySelectorAll('.menu-section').forEach((section) => {
          section.querySelector('h2').addEventListener('click', () => {
            const ul = section.querySelector('ul');
            ul.classList.toggle('show');
            ul.classList.toggle('hide');
          });
        });
      } catch (error) {
        console.error('Error importing data:', error);
      }
    }
  }
  
  customElements.define('universal-header', UniversalHeader);