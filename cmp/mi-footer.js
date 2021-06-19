class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        Rojas Rodríguez Roberto Yael.
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
