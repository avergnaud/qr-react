(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){},16:function(e,t,a){},17:function(e,t,a){},18:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(2),r=a.n(o),s=(a(15),a(16),a(3)),c=a(4),d=a(7),l=a(5),h=a(8),u=(a(17),a(6)),m=a.n(u),v=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(d.a)(this,Object(l.a)(t).call(this,e))).videoElement=i.a.createRef(),a.canvasElement=i.a.createRef(),a.canvas=null,a.state={ready:!1,loadingMessage:"\ud83c\udfa5 Unable to access video stream (please make sure you have a webcam enabled)",codeFound:!1,qrCodeValue:""},a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.canvas=this.canvasElement.current.getContext("2d"),navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}).then(function(t){e.videoElement.current.srcObject=t,e.videoElement.current.play(),requestAnimationFrame(function(){return e.tick()})})}},{key:"drawLine",value:function(e,t){this.canvas.beginPath(),this.canvas.moveTo(e.x,e.y),this.canvas.lineTo(t.x,t.y),this.canvas.lineWidth=4,this.canvas.strokeStyle="#FF3B58",this.canvas.stroke()}},{key:"tick",value:function(){var e=this;if(this.setState({loadingMessage:"\u231b Loading video..."}),this.videoElement.current.readyState===this.videoElement.current.HAVE_ENOUGH_DATA&&this.setState({ready:!0}),this.canvasElement.current.height=this.videoElement.current.videoHeight,this.canvasElement.current.width=this.videoElement.current.videoWidth,this.canvas.drawImage(this.videoElement.current,0,0,this.canvasElement.current.width,this.canvasElement.current.height),this.canvasElement.current.width>0&&this.canvasElement.current.height>0){var t=this.canvas.getImageData(0,0,this.canvasElement.current.width,this.canvasElement.current.height),a=m()(t.data,t.width,t.height,{inversionAttempts:"dontInvert"});a?(this.drawLine(a.location.topLeftCorner,a.location.topRightCorner),this.drawLine(a.location.topRightCorner,a.location.bottomRightCorner),this.drawLine(a.location.bottomRightCorner,a.location.bottomLeftCorner),this.drawLine(a.location.bottomLeftCorner,a.location.topLeftCorner),this.setState({codeFound:!0}),this.setState({qrCodeValue:a.data})):this.setState({codeFound:!1})}requestAnimationFrame(function(){return e.tick()})}},{key:"render",value:function(){return i.a.createElement("div",{id:"main-qr"},i.a.createElement("h1",null,"jsQr Demo"),i.a.createElement("a",{id:"githubLink",href:"https://github.com/cozmo/jsQR"},"View documentation on Github"),i.a.createElement("p",null,"Pure JavaScript QR code decoding library. Ready"," ",String(this.state.ready)),i.a.createElement("div",{id:"loading-message",className:this.state.ready?"hidden":""},this.state.loadingMessage),i.a.createElement("canvas",{ref:this.canvasElement,id:"canvas",className:this.state.ready?"":"hidden"}),i.a.createElement("div",{id:"output",className:this.state.ready?"":"hidden"},i.a.createElement("div",{id:"outputMessage",className:this.state.codeFound?"hidden":""},"No QR code detected."),i.a.createElement("div",{className:this.state.codeFound?"":"hidden"},i.a.createElement("b",null,"Data:")," ",i.a.createElement("span",{id:"outputData"},this.state.qrCodeValue))),i.a.createElement("video",{ref:this.videoElement,playsInline:!0}))}}]),t}(n.Component);var E=function(){return i.a.createElement("div",{className:"App"},i.a.createElement(v,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,a){e.exports=a(18)}},[[9,1,2]]]);
//# sourceMappingURL=main.351d4a30.chunk.js.map