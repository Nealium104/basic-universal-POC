class UniversalHeader extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    async connectedCallback() {
      const modulePath = document.querySelector('meta[name="json-path"]').getAttribute('content');
  
      try {
        const { default: data } = await import(modulePath);
  
        const aboutContent = `
          <ul>
            ${Object.entries(data.About).map(([key, value]) => `
              <li>
                <a href="${value}">${key}</a>
              </li>
            `).join('')}
          </ul>
        `;
  
        const howToContent = `
          <ul>
            ${Object.entries(data['How to']).map(([key, value]) => `
              <li>
                <a href="${value}">${key}</a>
              </li>
            `).join('')}
          </ul>
        `;
  
        this.shadowRoot.innerHTML = `
        <style>
            nav {
                display: flex;
                gap: 1rem;
                color: red;
            }
        </style>
          <nav>
            <img src="${data.Image}" alt="Header Image">
            <h2>About</h2>
            ${aboutContent}
            <h2>How to</h2>
            ${howToContent}
            <a href="${data.login}">Login</a>
          </nav>
        `;
      } catch (error) {
        console.error('Error importing data:', error);
      }
    }
  }
  
  customElements.define('universal-header', UniversalHeader);