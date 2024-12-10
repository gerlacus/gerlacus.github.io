// PARALLAX SCROLLING

function scrollBg() {
    var scrolltotop = document.scrollingElement.scrollTop;
    var target = document.getElementById("bg");
    var offset = -800;
    var xvalue = "center";
    var factor = -0.5;
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

    var totalWaveform = 0;

    for (let i = 0; i < waveform.length; i++) {
      var x = i;
      var y = ((1.0 + ((waveform[i]))) * (oscCanvas.height * 0.5));

      totalWaveform += waveform[i];

      if (i === 0) {
        canvasContext.moveTo(x, y);
      } else {
        var lineWidth = Math.cos(x*6.28/waveform.length) + (Math.abs(y) * 0.05);
        alpha = Math.pow(Math.abs(waveform[i]), 0.2) + 0.1;

        canvasContext.lineWidth = lineWidth;
      
        

        canvasContext.lineTo(x, y);
      }
    }

    var averageWaveform = totalWaveform / waveform.length;

    let r_val = (alpha * 55) + 150;
    let g_val = (alpha * 200) + 80;
    let b_val = (alpha * 100) + 120;

    strokeStyle = 'rgba(' + r_val + ', ' + g_val + ', ' + b_val + ', ' + alpha + ')';

    updateDivListenGlow(255, 191, 99, alpha * 0.5);

    canvasContext.strokeStyle = strokeStyle;
    canvasContext.stroke();
  }

  drawOscilloscope();

  function updateDivListenGlow(r, g, b, a)
  {
    // const divListenGlow = document.getElementById('div-listen-glow');
    const divListenGlow = document.getElementById('div-listen');
    const boxShadowValue = "inset 0px 0px " + (3 * a) + "rem rgba(" + r + ", " + g + ", " + b + ", " + a + ")";

    const boxShadowValue1 = "inset 0px 0px 3vw rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    const boxShadowValue2 = "inset 0px var(--col_bg_fade_s)"
    const boxShadowValue3 = "inset calc(0px - var(--bg_fade_s)) calc(0px - var(--bg_fade_s)) var(--bg_fade_s) var(--col_bg_fade_s)"
    
    divListenGlow.style.boxShadow = boxShadowValue;
  }

}