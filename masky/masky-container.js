import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

import "./editor-component.js";

export class MaskyContainer extends LitElement {
  static properties = {};
  static styles = css`
    :host {
      display: inline-block;
      padding: 10px;
      background: lightgray;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html` <editor-component></editor-component> `;
  }
}
customElements.define("masky-container", MaskyContainer);
