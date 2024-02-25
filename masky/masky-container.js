import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

import "./editor-component.js";

export class MaskyContainer extends LitElement {
  static properties = {
    width: {},
    height: {},
  };
  static styles = css`
    :host {
      background: lightgray;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <editor-component
        width="${this.width}"
        height="${this.height}"
      ></editor-component>
    `;
  }
}
customElements.define("masky-container", MaskyContainer);
