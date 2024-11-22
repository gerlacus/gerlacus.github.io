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

var audioElement = document.getElementById("audio");
var track;
var masterGain;
var analyser;
var audioContext; // = new AudioContext();

function handleOscilloscopeStart()
{

  

  if (audioContext)
  {
    audioContext.resume();
  }
  else
  {
    audioContext = new AudioContext();
    track = audioContext.createMediaElementSource(audioElement);

    masterGain = audioContext.createGain();
    analyser = audioContext.createAnalyser();
    
    track
    .connect(masterGain)
    .connect(analyser)
    .connect(audioContext.destination);
  }


  

  // Build Audio Chain

  


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
  var btn = document.getElementById("div-listen");
  var btnPosition = btn.getBoundingClientRect();

  const oscCanvas = document.getElementById("oscilloscope");
  oscCanvas.width = Math.min(oscCanvas.width, btnPosition.width);
  oscCanvas.height = Math.min(oscCanvas.height, btnPosition.height);

  const canvasContext = oscCanvas.getContext("2d");

  function drawOscilloscope()
  {
    requestAnimationFrame(drawOscilloscope);
    canvasContext.clearRect(0, 0, oscCanvas.width, oscCanvas.height);
    canvasContext.beginPath();

    var strokeStyle;
    var alpha = 0.0;

    for (let i = 0; i < waveform.length; i++) {
      var x = i;
      var y = ((1.0 + ((waveform[i]))) * (oscCanvas.height * 0.5));

      if (i === 0) {
        canvasContext.moveTo(x, y);
      } else {
        var lineWidth = Math.cos(x*6.28/waveform.length) + (Math.abs(y) * 0.05);
        alpha = (Math.abs(waveform[i]) * 5) + 0.1;

        canvasContext.lineWidth = lineWidth;
      
        canvasContext.lineTo(x, y);
      }
    }

    let r_val = (alpha * 55) + 150;
    let g_val = (alpha * 200) + 80;
    let b_val = (alpha * 100) + 120;

    strokeStyle = 'rgba(' + r_val + ', ' + g_val + ', ' + b_val + ', ' + alpha + ')';

    canvasContext.strokeStyle = strokeStyle;
    canvasContext.stroke();
  }

  drawOscilloscope();


}
//handleOscilliscope();

// document.getElementById("audio").onclick = handleOscilliscope;

//handleOscilliscopeStart();

function handleOscilliscopeEnd()
{
  // console.log("stopping! track = " + track);
  // if (track !== null)
  // {
  //   track.disconnect();
  //   track = null;
  //   console.log("track disconnected. track now = " + track);
  // }

  // if (audioContext !== null)
  // {
  //   console.log("audio Context not null");
  //   audioContext.close().then(function() {
  //     audioContext = null;
  //   });
  // }
}

// track.disconnect(audioContext.destination)
// .disconnect(analyser)
// .disconnect(masterGain);

// Spectrogram
/*
    * In this case we’ll request the data as a Uint8Array because values in the range 0-255
    * are exactly what we need when performing Canvas pixel manipulation.
    * */
// const spectrum = new Uint8Array(analyser.frequencyBinCount);

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
