import jsQR from "jsqr";

addEventListener("message", ({ data }) => {
  var imageData = data;

  if (imageData.data) {
    var code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert"
    });
    postMessage(code);
  }
});
