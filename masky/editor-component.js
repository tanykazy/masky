import {
  LitElement,
  html,
  css,
  styleMap,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js";

class EditorComponent extends LitElement {
  static styles = css`
    #canvas-wrapper {
      position: relative;
      overflow: hidden;
      max-width: 100%;
      /* width: 100%; */
      /* height: 80vh; */
      padding: 0;
      box-sizing: content-box;
    }
    #canvas-wrapper::before {
      content: "";
      display: block;
      padding-top: 50%;
    }
    #canvas-wrapper canvas {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border: 0;
      max-width: 100%;
      box-sizing: content-box;
      padding: 0;
      /* margin: 0; */
    }
    #image-input {
      position: absolute;
      margin: auto;
    }
  `;

  render() {
    const styles = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: "auto",
      position: "absolute",
      // border: 0,
      // "max-width": "100%",
      // "box-sizing": "content-box",
      // padding: 0,
      "transform-origin": `${this.xpoint}px ${this.ypoint}px`,
      transform: `scale(${this.zoomRatio})`,
    };
    // style=${styleMap(styles)}
    return html`
      <div id="editor-wrapper">
        <canvas
          id="image-canvas"
          class="editor-canvas"
          style=${styleMap(styles)}
          width="${this.width}"
          height="${this.height}"
        >
        </canvas>

        <canvas
          id="draw-canvas"
          class="editor-canvas"
          style=${styleMap(styles)}
          width="${this.width}"
          height="${this.height}"
        ></canvas>

        <canvas
          id="temp-canvas"
          class="editor-canvas"
          style=${styleMap(styles)}
          width="${this.width}"
          height="${this.height}"
        ></canvas>

        <canvas
          id="pointer-canvas"
          class="editor-canvas"
          style=${styleMap(styles)}
          width="${this.width}"
          height="${this.height}"
          @wheel="${this.onMouseWheel}"
          @mousedown="${this.startPoint}"
          @mousemove="${this.movePoint}"
          @mouseup="${this.endPoint}"
        ></canvas>

        <input
          id="image-input"
          type="file"
          accept="image/*"
          @input="${this.onInputImageFile}"
        />
      </div>
    `;
  }

  static properties = {
    width: {},
    height: {},
    moveflg: {},
    xpoint: {},
    ypoint: {},
    zoomRatio: {},
  };

  constructor() {
    super();
    // console.log(this.width);
    // console.log(this.height);
    this.width = 0;
    this.height = 0;
    this.moveflg = false;
    this.xpoint = 0;
    this.ypoint = 0;
    this.zoomRatio = 1;
  }

  onInputImageFile(event) {
    const input = this.renderRoot.getElementById("image-input");
    // console.log(input);
    // console.log(input.value);
    // console.log(input.files);
    const file = input.files[0];
    // console.log(file);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", (event) => {
      this.imageLoader(event.target.result);
    });
  }

  imageLoader(url) {
    const image = new Image();
    image.src = url;
    image.addEventListener("load", () => {
      const scale = Math.min(
        this.width / image.naturalWidth,
        this.height / image.naturalHeight
      );
      // console.log(scale);

      this.width = image.width * scale;
      this.height = image.height * scale;
      // console.log(this.width);
      // console.log(this.height);

      window.setTimeout(() => {
        const canvas = this.renderRoot.getElementById("image-canvas");
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, this.width, this.height);
        // context.drawImage(image, 0, 0, image.width, image.height);
      });
    });
  }

  // マウスホイール変更イベント
  onMouseWheel(event) {
    this.xpoint = event.offsetX;
    this.ypoint = event.offsetY;

    // 拡大率算出
    const direction = event.deltaY < 0 ? 1 : -1;
    this.zoomRatio += 0.1 * direction;

    if (this.zoomRatio < 1) {
      this.zoomRatio = 1;
    } else if (this.zoomRatio > 10) {
      this.zoomRatio = 10;
    }

    // 小数点第二以下切り捨て
    this.zoomRatio = Math.round(this.zoomRatio * 10) / 10;

    // console.log(this.zoomRario);

    // 算出した拡大率で描画
    // zoom();
    // document.getElementById("dispScale").innerHTML = this.zoomRario;

    // ポインタも再設定
    // if (
    //   (mode == "1" && (inputType == "1" || inputType == "2")) ||
    //   mode == "2"
    // ) {
    //   pointer(event);
    // }
  }

  startPoint(event) {
    const canvas = this.renderRoot.getElementById("image-canvas");
    const context = canvas.getContext("2d");

    event.preventDefault();

    context.beginPath();

    this.xpoint = event.offsetX;
    this.ypoint = event.offsetY;

    context.moveTo(this.xpoint, this.ypoint);
  }

  movePoint(event) {
    console.log(event);
    if (event.buttons === 1 || event.witch === 1 || event.type == "touchmove") {
      const canvas = this.renderRoot.getElementById("image-canvas");
      const context = canvas.getContext("2d");

      this.xpoint = event.offsetX;
      this.ypoint = event.offsetY;
      this.moveflg = true;

      const defSize = 2;
      const defColor = "#ff0000";
      context.lineTo(this.xpoint, this.ypoint);
      context.lineCap = "round";
      context.lineWidth = defSize * 2;
      context.strokeStyle = defColor;
      context.stroke();
    }
  }

  endPoint(event) {
    if (this.moveflg === false) {
      const canvas = this.renderRoot.getElementById("image-canvas");
      const context = canvas.getContext("2d");
      const defSize = 2;
      const defColor = "#ff0000";
      context.lineTo(this.xpoint - 1, this.ypoint - 1);
      context.lineCap = "round";
      context.lineWidth = defSize * 2;
      context.strokeStyle = defColor;
      context.stroke();
    }
    this.moveflg = false;
  }
}
customElements.define("editor-component", EditorComponent);
