import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class EditorComponent extends LitElement {
  static styles = css`
  `;

  render() {
    return html`
      <canvas width="300" height="300">
        キャンバスの表示内容を説明する代替テキストです。
      </canvas>
    `;
  }
}
customElements.define("editor-component", EditorComponent);
