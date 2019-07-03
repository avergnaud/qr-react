import React, { Component } from "react";
import "./QrReader.scss";
import Worker from './qr.worker';

// https://reactjs.org/docs/refs-and-the-dom.html

export class QrReader extends Component {

  constructor(props) {
    super(props);

    // create a ref to store the video DOM element
    this.videoElement = React.createRef();
    // create a ref to store the canvas DOM element
    this.canvasElement = React.createRef();
    this.canvas = null;
    this.worker = new Worker();

    this.state = {
      ready: false,
      loadingMessage:
        "🎥 Unable to access video stream (please make sure you have a webcam enabled)",
      codeFound: false,
      qrCodeValue: "",
      result: "No QR code detected..."
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
      
      this.worker.onmessage = ({ data }) => {
        let code = data;
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
          this.codeFound = true;
          this.setState({ result: code.data });
        } else {
          this.codeFound = false;
          requestAnimationFrame(() => this.tick());
        }
      };
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
      this.worker.postMessage(imageData);
    } else {
      requestAnimationFrame(() => this.tick());
    }
  }

  render() {
    return (
      <div id="main-qr">
        <h1>jsQr React WebWorker</h1>
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
            {this.state.result}
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