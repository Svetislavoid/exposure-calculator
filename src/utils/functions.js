import { CUSTOM } from './types';

export const getQE = (lambda, cameraQE) => {
  let diff = 999999999999;
  let pos = 0;

  Object.keys(cameraQE).forEach((key) => {
    if (Math.abs(lambda / 10 - key) < diff) {
      diff = Math.abs(lambda / 10 - key);
      pos = key;
    }
  });

  return cameraQE[pos];
};

// Error function
export const erf = (x) => {
  // erf(x) = 2/sqrt(pi) * integrate(from=0, to=x, e^-(t^2) ) dt
  // with using Taylor expansion,
  //        = 2/sqrt(pi) * sigma(n=0 to +inf, ((-1)^n * x^(2n+1))/(n! * (2n+1)))
  // calculating n=0 to 50
  let m = 1.00;
  let s = 1.00;
  let sum = x * 1.0;

  for(let i = 1; i < 50; i++){
    m *= i;
    s *= -1;
    sum += (s * Math.pow(x, 2.0 * i + 1.0)) / (m * (2.0 * i + 1.0));
  }

  return 2 * sum / Math.sqrt(Math.PI);
};

// Figure out what fraction of a star's light falls within the aperture.
// We assume that the starlight has a circular gaussian distribution with
// FWHM given by the first argument (with units of arcsec). We calculate
// the fraction of that light which falls within an aperture of radius
// given by second argument (with units of arcsec).
export const fractionInside = (fwhm, radius) => {
  let sigma;
  let z;
  let x1;
  // let large = 1000.0;
  let ratio;

  // calculate how far out the 'radius' is in units of 'sigmas'
  sigma = fwhm / 2.35;
  z = radius / (sigma * 1.414);

  // now, we assume that a radius of 'large' is effectively infinite
  x1 = this.erf(z);
  ratio = (x1 * x1);

  return ratio;
};

// Figure out what fraction of a star's light falls within the aperture.
// We assume that the starlight has a circular gaussian distribution with
// FWHM given by the first argument (with units of arcsec). This function
// goes to the trouble of calculating how much of the light falls within
// fractional pixels defined by the given radius of a synthetic aperture.
// It is slow but more accurate than the 'fraction_inside' function.
export const fractionInsideSlow = (fwhm, radius, pxSize) => {
  let i, j, k, l;
  let maxPixRad;
  let sigma2;
  let x, y;
  let fx, fy;
  let psfCenterX, psfCenterY;
  let ratio;
  let bit;
  let thisBit;
  let pxSum;
  let allSum;
  let radSum;
  let rad2, radius2;
  let inten;
  let piece;

  // how many pieces do we sub-divide pixels into?
  piece = 20;

  // rescale FWHM and aperture radius into pixels (instead of arcsec)
  fwhm /= pxSize;
  radius /= pxSize;

  maxPixRad = 30;

  // check to make sure user isn't exceeding our built-in limits
  if (radius >= maxPixRad) {
    console.log('Warning: radius exceeds limit of ' + maxPixRad);
  }

  // these values control the placement of the star on the pixel grid:
  //    (0,0) to make the star centered on a junction of four pixels
  //    (0.5, 0.5) to make star centered on one pixel
  psfCenterX = 0.5;
  psfCenterY = 0.5;

  sigma2 = fwhm / 2.35;
  sigma2 = sigma2 * sigma2;
  radius2 = radius * radius;
  bit = 1.0 / piece;

  radSum = 0;
  allSum = 0;

  for (i = 0 - maxPixRad; i < maxPixRad; i++) {
    for (j = 0 - maxPixRad; j < maxPixRad; j++) {

      // now, how much light falls into pixel (i, j)?
      pxSum = 0;
      for (k = 0; k < piece; k++) {

        x = (i - psfCenterX) + (k + 0.5) * bit;
        fx = Math.exp(-(x * x) / (2.0 * sigma2));

        for (l = 0; l < piece; l++) {

          y = (j - psfCenterY) + (l + 0.5) * bit;
          fy = Math.exp(-(y * y) / (2.0 * sigma2));

          inten = fx * fy;
          thisBit = inten * bit * bit;
          pxSum += thisBit;

          rad2 = x * x + y * y;
          if (rad2 <= radius2) {
            radSum += thisBit;
          }
        }
      }
      allSum += pxSum;
    }
  }

  ratio = radSum / allSum;

  return ratio;
};

export const secondsToTime = (secs) => {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor(secs % 3600 / 60);
  const seconds = Math.floor(secs % 60);

  let exposureTime;

  if (hours) {
    exposureTime = `${hours}h ${minutes}m ${seconds}s (${secs}s)`;
  } else if (minutes) {
    exposureTime = `${minutes}m ${seconds}s (${secs}s)`;
  } else {
    exposureTime = `${seconds}s`;
  }

  return exposureTime;
};

export const calculateExposureTime = ({ fieldsValues, telescopes, cameras, bands }) => {
  const {
    object,
    telescope,
    reducer,
    ccd,
    binning,
    filter,
    transparency,
    airmass,
    skyBrightness,
    seeing,
    aperture,
    magnitude,
    signalToNoise,
    customTelescopeDiameter,
    customTelescopeFocalLength,
    customTelescopeEffectiveArea,
    customReducer,
    customReadOutNoise,
    customDarkCurrent,
    customPixelSize,
    customQuantumEfficiency,
    customBinning,
    customWavelength,
    customBandwidth,
    customFlux,
    customExtinctionCoefficient
  } = fieldsValues;

  // reducer values
  const reducerValue = reducer === CUSTOM ? customReducer : reducer;

  // binning values
  const binningValue = binning === CUSTOM ? customBinning : binning;

  // telescope values
  const diameter = telescope === CUSTOM ? customTelescopeDiameter : telescopes[telescope].diameter;
  const focalLength = (telescope === CUSTOM ? customTelescopeFocalLength : telescopes[telescope].focalLength) * reducerValue;
  const effectiveArea = telescope === CUSTOM ? customTelescopeEffectiveArea : telescopes[telescope].effectiveAreaCoeff;

  // bands values
  const wavelength = filter === CUSTOM ? customWavelength : bands[filter].wavelength;
  const bandwidth = filter === CUSTOM ? customBandwidth : bands[filter].bandwidth;
  const photonFlux = (filter === CUSTOM ? customFlux : bands[filter].fluxPh) * 10000;
  const extinctionCoefficient = filter === CUSTOM ? customExtinctionCoefficient : bands[filter].extinctCoeff;

  // camera values
  const darkCurrent = ccd === CUSTOM ? customDarkCurrent : cameras[ccd].dc;
  const readOutNoise = ccd === CUSTOM ? customReadOutNoise : cameras[ccd].ro;
  const pixelSize = ccd === CUSTOM ? customPixelSize : cameras[ccd].pxSize;
  const quantumEfficiency = ccd === CUSTOM ? customQuantumEfficiency : getQE(wavelength, cameras[ccd].qe);

  const resolution = (binningValue * pixelSize * 206265 / focalLength).toFixed(2);
  const numberOfPixels = object === 'point' ? (Math.pow(aperture / resolution, 2) * Math.PI).toFixed(2) : 1;
  const telescopeArea = Math.pow(diameter, 2) * Math.PI / 4 * effectiveArea;

  const signal = object === 'point' ? Math.pow(10, -1 * (magnitude + airmass * extinctionCoefficient) / 2.5) * photonFlux * telescopeArea * transparency * quantumEfficiency * bandwidth * fractionInsideSlow(seeing, aperture, resolution) : Math.pow(10, -1 * (magnitude + airmass * extinctionCoefficient) / 2.5) * photonFlux * telescopeArea * transparency * quantumEfficiency * bandwidth * Math.pow(resolution, 2) * fractionInsideSlow(seeing, aperture, resolution);
  const sky = Math.pow(10, -1 * skyBrightness / 2.5) * photonFlux * telescopeArea * transparency * quantumEfficiency * bandwidth * Math.pow(resolution, 2);

  const exposure = ((Math.pow(signalToNoise, 2) * (signal + (sky + darkCurrent) * numberOfPixels) + Math.sqrt(Math.pow(signalToNoise, 4) * Math.pow((signal + (sky + darkCurrent) * numberOfPixels), 2) + 4 * Math.pow(signal * signalToNoise * readOutNoise, 2) * numberOfPixels)) / (2 * Math.pow(signal, 2))).toFixed(2);

  return exposure;
};

export const formatExposureTime = (exposureTime) => {
  return exposureTime <= 20 ? `${exposureTime}s` : secondsToTime(Math.round(exposureTime));
};

// ===============
// GRAPH FUNCTIONS
// ===============

export const setXOffset = (sn) => {
  const ctx = this.canvas.getContext('2d');
  const txt = sn.toString();
  const txtWidth= ctx.measureText(txt).width;

  this.graph.xOffset = txtWidth + 5 < 20 ? 25 : txtWidth + 5;
};

export const resetGraph = () => {
  const ctx = this.canvas.getContext('2d');
  const height = this.canvas.height;
  const width = this.canvas.width;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.strokeStyle = '#000';

  ctx.clearRect(0, 0, width, height);
};

export const drawGraphLines = () => {
  const ctx = this.canvas.getContext('2d');
  const width = this.canvas.width;
  const height = this.canvas.height;

  this.setXOffset(Math.ceil(this.eqParams.snr * 1.3));

  ctx.setTransform(1, 0, 0, -1, 0, height);

  this.graph.broj_podeokaX = 0;
  this.graph.broj_podeokaY = 0;

  // important so we can later remove the lines drawn with lineTo() method
  ctx.beginPath();

  // koordinatne linije
  // x-osa
  ctx.moveTo(this.graph.xOffset, this.graph.yOffset + 10);
  ctx.lineTo(width - 30, this.graph.yOffset + 10);

  // y-osa
  ctx.moveTo(this.graph.xOffset + 10, this.graph.yOffset);
  ctx.lineTo(this.graph.xOffset + 10, height - 20);

  // podeoci na x osi
  for (var i = this.graph.xOffset + 10 + this.graph.podeokX; i <= width - 30; i += this.graph.podeokX) {
    ctx.moveTo(i, this.graph.yOffset + 10);
    ctx.lineTo(i, this.graph.yOffset);
    this.graph.broj_podeokaX++;
  }

  // podeoci na y osi
  for (var j = this.graph.yOffset + 10 + this.graph.podeokY; j <= height - 20; j += this.graph.podeokY) {
    ctx.moveTo(this.graph.xOffset + 10, j);
    ctx.lineTo(this.graph.xOffset, j);
    this.graph.broj_podeokaY++;
  }

  ctx.stroke();

  ctx.closePath();
};

export const addGraphValues = () => {
  var ctx = this.canvas.getContext('2d');
  var height = this.canvas.height;
  var width = this.canvas.width;

  var n = 1;
  var m = 1;
  var t = this.eqParams.exposure;
  var snr = this.eqParams.snr;

  this.graph.upLimitX = Math.ceil(t * 1.3);
  this.graph.upLimitY = Math.ceil(snr * 1.3);

  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // oznake koordinatnih osa
  ctx.font = '16px sans-serif';
  ctx.fillText('S/N', this.graph.xOffset, 15);
  ctx.fillText('t(s)', width - 25, height - this.graph.yOffset - 5);

  // koordinatni početak
  ctx.font = '10px sans-serif';
  ctx.fillText('0', 3, height - this.graph.yOffset - 5); // y-osa
  ctx.fillText('0', this.graph.xOffset + 7, height - this.graph.yOffset + 15); // x-osa

  // vrednosti na x osi
  if (this.graph.upLimitX > this.graph.broj_podeokaX) {
    while (this.graph.upLimitX % this.graph.broj_podeokaX !== 0) {
      this.graph.upLimitX++;
    }
    for (var j = this.graph.xOffset + 10 + this.graph.podeokX; j < width - 30; j += this.graph.podeokX) {
      ctx.moveTo(j, height - 3);
      ctx.fillText(n * this.graph.upLimitX / this.graph.broj_podeokaX, j - 5, height - this.graph.yOffset + 15);
      n++;
    }
  } else {
    for (var j = this.graph.xOffset + 10 + this.graph.podeokX; j < width - 20; j += this.graph.podeokX) {
      ctx.moveTo(j, height - 3);
      ctx.fillText((n * this.graph.upLimitX / this.graph.broj_podeokaX).toFixed(2), j - 5, height - this.graph.yOffset + 15);
      n++;
    }
  }

  // vrednosti na y osi
  if (this.graph.upLimitY > this.graph.broj_podeokaY) {
    while (this.graph.upLimitY % this.graph.broj_podeokaY !== 0) {
      this.graph.upLimitY++;
    }
    for (var j = height - 15 - this.graph.yOffset - this.graph.podeokY; j > 20; j -= this.graph.podeokY) {
      ctx.moveTo(0, j);
      ctx.fillText(m * this.graph.upLimitY / this.graph.broj_podeokaY, 3, j + 10);
      m++;
    }
  } else {
    for (var j = height - 15 - this.graph.yOffset - this.graph.podeokY; j > 20; j -= this.graph.podeokY) {
      ctx.moveTo(0, j);
      ctx.fillText((m * this.graph.upLimitY / this.graph.broj_podeokaY).toFixed(2), 3, j + 10);
      m++;
    }
  }
};

export const drawGraph = () => {
  var ctx = this.canvas.getContext('2d');
  var height = this.canvas.height;
  var width = this.canvas.width;

  var scaleX = this.graph.podeokX * this.graph.broj_podeokaX / this.graph.upLimitX;
  var scaleY = this.graph.podeokY * this.graph.broj_podeokaY / this.graph.upLimitY;

  var sig = this.eqParams.sig;
  var sky = this.eqParams.sky;
  var dc = this.eqParams.dc;
  var ro = this.eqParams.ro;
  var n = this.eqParams.n;

  var snr = 0;

  ctx.setTransform(1, 0, 0, -1, this.graph.xOffset + 11, height - this.graph.yOffset - 11);
  ctx.beginPath();

  ctx.moveTo(0, 0);

  if (this.graph.upLimitX !== 0) {
    for (var t = 0; t <= this.graph.upLimitX; t += this.graph.upLimitX / this.graph.dataPointsNo) {
      snr = sig * t / Math.sqrt(sig * t + sky * n * t + dc * t * n + ro * ro * n);
      ctx.lineTo(t * scaleX, snr * scaleY);
    }
  }

  ctx.stroke();
  ctx.closePath();

  this.graph.drawn = true;
};

export const drawHelpLines = () => {
  var ctx = this.canvas.getContext('2d');
  var height = this.canvas.height;
  var width = this.canvas.width;

  var scaleX = this.graph.podeokX * this.graph.broj_podeokaX / this.graph.upLimitX;
  var scaleY = this.graph.podeokY * this.graph.broj_podeokaY / this.graph.upLimitY;

  var t = this.eqParams.exposure;
  var snr = this.eqParams.snr;

  ctx.setTransform(1, 0, 0, -1, this.graph.xOffset + 11, height - this.graph.yOffset - 11);
  ctx.beginPath();

  ctx.strokeStyle = '#bbb';

  ctx.moveTo(0, snr * scaleY - 1);
  ctx.lineTo(this.canvas.width, snr * scaleY - 1);
  ctx.moveTo(t * scaleX - 1, 0);
  ctx.lineTo(t * scaleX - 1, this.canvas.width);

  ctx.stroke();
  ctx.closePath();
};

// Field validation functions
export const required = value => (value ? undefined : 'Required');
export const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined);
export const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
export const maxValue = max => value =>
  isNaN(value) || value <= max ? undefined : `Should be less than ${max}`;
export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);
