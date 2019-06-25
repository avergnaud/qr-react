import React, { Component } from "react";
import "./QrReader.scss";
import jsQR from "jsqr";

// https://reactjs.org/docs/refs-and-the-dom.html

export class QrReader extends Component {
  constructor(props) {
    super(props);

    // create a ref to store the video DOM element
    this.videoElement = React.createRef();
    // create a ref to store the canvas DOM element
    this.canvasElement = React.createRef();

    this.canvas = null;

    this.state = {
      ready: false,
      loadingMessage:
        "🎥 Unable to access video stream (please make sure you have a webcam enabled)",
      codeFound: false,
      qrCodeValue: ""
    };
  }

  componentDidMount() {
    this.canvas = this.canvasElement.current.getContext("2d");
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(stream => {
        this.videoElement.current.srcObject = stream;
        this.videoElement.current.play();
        /* https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame */
        requestAnimationFrame(() => this.tick());
      });
  }

  drawLine(begin, end) {
    this.canvas.beginPath();
    this.canvas.moveTo(begin.x, begin.y);
    this.canvas.lineTo(end.x, end.y);
    this.canvas.lineWidth = 4;
    this.canvas.strokeStyle = "#FF3B58";
    this.canvas.stroke();
  }

  tick() {
    this.setState({ loadingMessage: "⌛ Loading video..." });
    if (
      this.videoElement.current.readyState ===
      this.videoElement.current.HAVE_ENOUGH_DATA
    ) {
      this.setState({ ready: true });
    }
    this.canvasElement.current.height = this.videoElement.current.videoHeight;
    this.canvasElement.current.width = this.videoElement.current.videoWidth;
    /* affiche l'image de la balise <video> */
    this.canvas.drawImage(
      this.videoElement.current,
      0,
      0,
      this.canvasElement.current.width,
      this.canvasElement.current.height
    );

    if (
      this.canvasElement.current.width > 0 &&
      this.canvasElement.current.height > 0
    ) {
      var imageData = this.canvas.getImageData(
        0,
        0,
        this.canvasElement.current.width,
        this.canvasElement.current.height
      );
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert"
      });
      if (code) {
        this.drawLine(
          code.location.topLeftCorner,
          code.location.topRightCorner
        );
        this.drawLine(
          code.location.topRightCorner,
          code.location.bottomRightCorner
        );
        this.drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner
        );
        this.drawLine(
          code.location.bottomLeftCorner,
          code.location.topLeftCorner
        );
        this.setState({ codeFound: true });
        this.setState({ qrCodeValue: code.data });
      } else {
        this.setState({ codeFound: false });
      }
    }

    requestAnimationFrame(() => this.tick());
  }

  render() {
    return (
      <div id="main-qr">
        <h1>jsQr Demo</h1>
        <a id="githubLink" href="https://github.com/cozmo/jsQR">
          View documentation on Github
        </a>
        <p>
          Pure JavaScript QR code decoding library. Ready{" "}
          {String(this.state.ready)}
        </p>
        <div id="loading-message" className={this.state.ready ? "hidden" : ""}>
          {this.state.loadingMessage}
        </div>
        <canvas
          ref={this.canvasElement}
          id="canvas"
          className={this.state.ready ? "" : "hidden"}
        />
        <div id="output" className={this.state.ready ? "" : "hidden"}>
          <div
            id="outputMessage"
            className={this.state.codeFound ? "hidden" : ""}
          >
            No QR code detected.
          </div>
          <div className={this.state.codeFound ? "" : "hidden"}>
            <b>Data:</b> <span id="outputData">{this.state.qrCodeValue}</span>
          </div>
        </div>
        {/* playsinline required to tell iOS safari we don't want fullscreen */}
        <video ref={this.videoElement} playsInline={true} />
      </div>
    );
  }
}
