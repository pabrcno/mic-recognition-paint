const audioContext = new window.AudioContext();
const analyser = audioContext.createAnalyser();

navigator.getUserMedia(
  { audio: true },
  (stream) => audioContext.createMediaStreamSource(stream).connect(analyser),
  (err) => console.log(err)
);
const dataArray = new Uint8Array(analyser.frequencyBinCount);
const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d"); // a canvas I have in my HTML
canvasContext.fillStyle = "firebrick";

const paint = () => {
  requestAnimationFrame(() => {
    analyser.getByteTimeDomainData(dataArray);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    dataArray.forEach((item, i) => {
      canvasContext.fillRect(i, item, 2, 2);
    });
    paint();
  });
};

paint();
