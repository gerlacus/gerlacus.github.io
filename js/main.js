// PARALLAX SCROLLING

function scrollBg() {
    var scrolltotop = document.scrollingElement.scrollTop;
    var target = document.getElementById("bg");
    var offset = -2000;
    var xvalue = "center";
    var factor = 0.5;
    var yvalue = offset + (scrolltotop * factor);
    target.style.backgroundPosition = xvalue + " " + yvalue + "px";
  }

document.getElementById("body").onscroll = scrollBg;
document.getElementById("body").onload = scrollBg;


// AUDIO

//TODO: fix this at some point plz
const audioElements = document.getElementsByClassName("audio");
var indexPlaying = 0;

for (var i = 0; i < audioElements.length; i++) {
        console.log("i = " + i);
        if (!audioElements[i].paused) {
            console.log("playing!");
            indexPlaying = audioElements[i];
        }
    }


const audioElement = audioElements[indexPlaying];
const audioContext = new AudioContext();
const track = audioContext.createMediaElementSource(audioElement);
const masterGain = audioContext.createGain();
const analyser = audioContext.createAnalyser();

// Build Audio Chain

track
  .connect(masterGain)
  .connect(analyser)
  .connect(audioContext.destination);


/*
   * The Web Audio API provides the AnalyserNode for this purpose.
   * In addition to providing the raw waveform (aka time domain) data,
   * it provides methods for accessing the audio spectrum (aka frequency domain) data.
   *
   * At this point, the waveform array will contain values from -1 to 1 corresponding to the audio waveform playing
   * through the masterGain node. This is just a snapshot of whatever’s currently playing.
   * */
const waveform = new Float32Array(analyser.frequencyBinCount);
analyser.getFloatTimeDomainData(waveform);

function updateWaveform() {
  requestAnimationFrame(updateWaveform);
  analyser.getFloatTimeDomainData(waveform);
}

updateWaveform();

// Setup canvas
var style = getComputedStyle(document.body);

var btn = document.getElementById("div-listen");
var btnPosition = btn.getBoundingClientRect();

var width = btnPosition.width;
var height = btnPosition.height;

const oscCanvas = document.getElementById("oscilloscope");
oscCanvas.width = width;
oscCanvas.height = height;
const canvasContext = oscCanvas.getContext("2d");

function drawOscilloscope() {

  requestAnimationFrame(drawOscilloscope);

  canvasContext.clearRect(0, 0, oscCanvas.width, oscCanvas.height);
  canvasContext.beginPath();
  canvasContext.strokeStyle = "#f0efebff";
//   canvasContext.lineWidth = oscCanvas.height / 5;
  

  for (let i = 0; i < waveform.length; i++) {
    const x = i;
    const y = ((1.5 + ((waveform[i])/ 2)) * (oscCanvas.height * 0.33));
    if (i === 0) {
      canvasContext.moveTo(x, y);
    } else {
       canvasContext.lineWidth = (Math.abs((y / 2) - y)) - 80;
      
      canvasContext.lineTo(x, y);
    }
  }
  canvasContext.stroke();
}

drawOscilloscope();

// track.disconnect(audioContext.destination)
// .disconnect(analyser)
// .disconnect(masterGain);

// Spectrogram
/*
    * In this case we’ll request the data as a Uint8Array because values in the range 0-255
    * are exactly what we need when performing Canvas pixel manipulation.
    * */
const spectrum = new Uint8Array(analyser.frequencyBinCount);

// function updateSpectrum() {
//   requestAnimationFrame(updateSpectrum);
//   analyser.getByteFrequencyData(spectrum);
// }

// updateSpectrum();

// // Setup Canvas
// const spectroCanvas = document.getElementById("spectrogram");
// spectroCanvas.width = spectrum.length;
// spectroCanvas.height = 200;
// const spectroContext = spectroCanvas.getContext("2d");
// let spectroOffset = 0;

// function drawSpectrogram() {
//   requestAnimationFrame(drawSpectrogram);

//   const slice = spectroContext.getImageData(
//     0,
//     spectroOffset,
//     spectroCanvas.width,
//     1
//   );

//   for (let i = 0; i < spectrum.length; i++) {
//     slice.data[4 * i + 0] = spectrum[i]; // R
//     slice.data[4 * i + 1] = spectrum[i]; // G
//     slice.data[4 * i + 2] = spectrum[i]; // B
//     slice.data[4 * i + 3] = 255; // A
//   }

//   spectroContext.putImageData(slice, 0, spectroOffset);
//   spectroOffset += 1;
//   spectroOffset %= spectroCanvas.height;
// }

// drawSpectrogram();
