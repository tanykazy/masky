import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

import "./editor-component.js";

export class MaskyContainer extends LitElement {
  static properties = {
    greeting: {},
    planet: {},
  };
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = css`
    :host {
      display: inline-block;
      padding: 10px;
      background: lightgray;
    }
    .planet {
      color: var(--planet-color, blue);
    }
  `;

  constructor() {
    super();
    // Define reactive properties--updating a reactive property causes
    // the component to update.
    this.greeting = "Hello";
    this.planet = "World";
  }

  // The render() method is called any time reactive properties change.
  // Return HTML in a string template literal tagged with the `html`
  // tag function to describe the component's internal DOM.
  // Expressions can set attribute values, property values, event handlers,
  // and child nodes/text.
  render() {
    return html`
      <editor-component></editor-component>
      <span @click=${this.togglePlanet}>
        ${this.greeting}
        <span class="planet"> ${this.planet} </span>
      </span>
    `;
  }

  // Event handlers can update the state of @properties on the element
  // instance, causing it to re-render
  togglePlanet() {
    this.planet = this.planet === "World" ? "Mars" : "World";
  }
}
customElements.define("masky-container", MaskyContainer);
