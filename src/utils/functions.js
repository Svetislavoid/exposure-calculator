import { CUSTOM } from './types';

const getQE = (lambda, cameraQE) => {
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

// const erf = (x) => {
//   // erf(x) = 2/sqrt(pi) * integrate(from=0, to=x, e^-(t^2) ) dt
//   // with using Taylor expansion,
//   //        = 2/sqrt(pi) * sigma(n=0 to +inf, ((-1)^n * x^(2n+1))/(n! * (2n+1)))
//   // calculating n=0 to 50
//   let m = 1.00;
//   let s = 1.00;
//   let sum = x * 1.0;

//   for (let i = 1; i < 50; i++) {
//     m *= i;
//     s *= -1;
//     sum += (s * Math.pow(x, 2.0 * i + 1.0)) / (m * (2.0 * i + 1.0));
//   }

//   return 2 * sum / Math.sqrt(Math.PI);
// };

// Figure out what fraction of a star's light falls within the aperture.
// We assume that the starlight has a circular gaussian distribution with
// FWHM given by the first argument (with units of arcsec). We calculate
// the fraction of that light which falls within an aperture of radius
// given by second argument (with units of arcsec).

// const fractionInside = (fwhm, radius) => {
//   // const large = 1000.0;

//   // calculate how far out the 'radius' is in units of 'sigmas'
//   const sigma = fwhm / 2.35;
//   const z = radius / (sigma * 1.414);

//   // now, we assume that a radius of 'large' is effectively infinite
//   const x1 = erf(z);
//   const ratio = (x1 * x1);

//   return ratio;
// };

// Figure out what fraction of a star's light falls within the aperture.
// We assume that the starlight has a circular gaussian distribution with
// FWHM given by the first argument (with units of arcsec). This function
// goes to the trouble of calculating how much of the light falls within
// fractional pixels defined by the given radius of a synthetic aperture.
// It is slow but more accurate than the 'fraction_inside' function.
const fractionInsideSlow = (fwhm, radius, pxSize) => {
  // how many pieces do we sub-divide pixels into?
  const piece = 20;

  // rescale FWHM and aperture radius into pixels (instead of arcsec)
  const fwhmRescaled = fwhm / pxSize;
  const radiusRescaled = radius / pxSize;

  const maxPixRad = 30;

  // check to make sure user isn't exceeding our built-in limits
  if (radiusRescaled >= maxPixRad) {
    console.log('Warning: radius exceeds limit of ' + maxPixRad);
  }

  // these values control the placement of the star on the pixel grid:
  //    (0,0) to make the star centered on a junction of four pixels
  //    (0.5, 0.5) to make star centered on one pixel
  const psfCenterX = 0.5;
  const psfCenterY = 0.5;

  const sigma = fwhmRescaled / 2.35;
  const sigmaSquared = Math.pow(sigma, 2);
  const radiusSquared = Math.pow(radiusRescaled, 2);
  const bit = 1.0 / piece;

  let radSum = 0;
  let allSum = 0;

  for (let i = 0 - maxPixRad; i < maxPixRad; i++) {
    for (let j = 0 - maxPixRad; j < maxPixRad; j++) {

      // now, how much light falls into pixel (i, j)?
      let pxSum = 0;
      for (let k = 0; k < piece; k++) {

        const x = (i - psfCenterX) + (k + 0.5) * bit;
        const fx = Math.exp(-Math.pow(x, 2) / (2.0 * sigmaSquared));

        for (let l = 0; l < piece; l++) {

          const y = (j - psfCenterY) + (l + 0.5) * bit;
          const fy = Math.exp(-(y * y) / (2.0 * sigmaSquared));

          const inten = fx * fy;
          const thisBit = inten * Math.pow(bit, 2);
          pxSum += thisBit;

          const radSquared = Math.pow(x, 2) + Math.pow(y, 2);
          if (radSquared <= radiusSquared) {
            radSum += thisBit;
          }
        }
      }
      allSum += pxSum;
    }
  }

  const ratio = radSum / allSum;

  return ratio;
};

const secondsToTime = (secs) => {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor(secs % 3600 / 60);
  const seconds = Math.floor(secs % 60);

  const hoursString = hours ? `${hours}h ` : '';
  const minutesString = minutes || (hours && seconds) ? `${minutes}m ` : '';
  const secondsString = seconds ? `${seconds}s ` : '';
  const secsString = `(${secs}s)`;

  return hoursString + minutesString + secondsString + secsString;
};

export const formatExposureTime = (exposureTime) => {
  if (exposureTime <= 20) {
    return `${exposureTime}s`;
  }

  if (exposureTime >= 1000000) {
    return `${Math.round(exposureTime)}s`;
  }

  return secondsToTime(Math.round(exposureTime));
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

  return { exposure, signal, sky, numberOfPixels, darkCurrent, readOutNoise };
};

// ===============
// GRAPH FUNCTIONS
// ===============

export const resetGraph = ({ canvas }) => {
  const context = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.strokeStyle = '#000';
  context.clearRect(0, 0, width, height);
};

export const drawGraphLines = ({ canvas, signalToNoise }) => {
  let xOffset = 25;
  const yOffset = 20;
  let numberOfXSteps = 0;
  let numberOfYSteps = 0;
  const widthOfXStep = 45;
  const widthOfYStep = 45;

  const context = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const txt = Math.ceil(signalToNoise * 1.3).toString();
  const txtWidth = context.measureText(txt).width;

  xOffset = txtWidth + 5 < 20 ? 25 : txtWidth + 5;

  context.setTransform(1, 0, 0, -1, 0, height);

  numberOfXSteps = 0;
  numberOfYSteps = 0;

  context.beginPath();

  // draw axes
  context.moveTo(xOffset, yOffset + 10);
  context.lineTo(width - 30, yOffset + 10);
  context.moveTo(xOffset + 10, yOffset);
  context.lineTo(xOffset + 10, height - 20);

  // draw x-axis steps
  for (let i = xOffset + 10 + widthOfXStep; i <= width - 30; i += widthOfXStep) {
    context.moveTo(i, yOffset + 10);
    context.lineTo(i, yOffset);
    numberOfXSteps++;
  }

  // draw y-axis steps
  for (let j = yOffset + 10 + widthOfYStep; j <= height - 20; j += widthOfYStep) {
    context.moveTo(xOffset + 10, j);
    context.lineTo(xOffset, j);
    numberOfYSteps++;
  }

  context.stroke();
  context.closePath();

  return { xOffset, yOffset, numberOfXSteps, numberOfYSteps, widthOfXStep, widthOfYStep };
};

export const addGraphValues = ({ canvas, signalToNoise, exposureTime, xOffset, yOffset, numberOfXSteps, numberOfYSteps, widthOfXStep, widthOfYStep }) => {
  const context = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  let n = 1;
  let m = 1;

  let upLimitX = Math.ceil(exposureTime * 1.3);
  let upLimitY = Math.ceil(signalToNoise * 1.3);

  context.setTransform(1, 0, 0, 1, 0, 0);

  // Axes labels
  context.font = '16px sans-serif';
  context.fillText('S/N', xOffset, 15);
  context.fillText('t(s)', width - 25, height - yOffset - 5);

  // Origin labels
  context.font = '10px sans-serif';
  context.fillText('0', 3, height - yOffset - 5); // y-axix
  context.fillText('0', xOffset + 7, height - yOffset + 15); // x-axis

  // x-axis values
  if (upLimitX > numberOfXSteps) {
    while (upLimitX % numberOfXSteps !== 0) {
      upLimitX++;
    }
    for (let j = xOffset + 10 + widthOfXStep; j < width - 30; j += widthOfXStep) {
      context.moveTo(j, height - 3);
      context.fillText(n * upLimitX / numberOfXSteps, j - 5, height - yOffset + 15);
      n++;
    }
  } else {
    for (let j = xOffset + 10 + widthOfXStep; j < width - 20; j += widthOfXStep) {
      context.moveTo(j, height - 3);
      context.fillText((n * upLimitX / numberOfXSteps).toFixed(2), j - 5, height - yOffset + 15);
      n++;
    }
  }

  // y-axis values
  if (upLimitY > numberOfYSteps) {
    while (upLimitY % numberOfYSteps !== 0) {
      upLimitY++;
    }
    for (let j = height - 15 - yOffset - widthOfYStep; j > 20; j -= widthOfYStep) {
      context.moveTo(0, j);
      context.fillText(m * upLimitY / numberOfYSteps, 3, j + 10);
      m++;
    }
  } else {
    for (let j = height - 15 - yOffset - widthOfYStep; j > 20; j -= widthOfYStep) {
      context.moveTo(0, j);
      context.fillText((m * upLimitY / numberOfYSteps).toFixed(2), 3, j + 10);
      m++;
    }
  }

  return { upLimitX, upLimitY };
};

export const drawGraph = ({ canvas, numberOfXSteps, xOffset, yOffset, numberOfYSteps, widthOfXStep, widthOfYStep, upLimitX, upLimitY, signal, sky, numberOfPixels, darkCurrent, readOutNoise }) => {
  const context = canvas.getContext('2d');
  const height = canvas.height;

  const scaleX = widthOfXStep * numberOfXSteps / upLimitX;
  const scaleY = widthOfYStep * numberOfYSteps / upLimitY;

  const dataPointsNo = 200;
  let snr = 0;

  context.setTransform(1, 0, 0, -1, xOffset + 11, height - yOffset - 11);
  context.beginPath();

  context.moveTo(0, 0);

  if (upLimitX !== 0) {
    for (let t = 0; t <= upLimitX; t += upLimitX / dataPointsNo) {
      snr = signal * t / Math.sqrt(signal * t + sky * numberOfPixels * t + darkCurrent * t * numberOfPixels + Math.pow(readOutNoise, 2) * numberOfPixels);
      context.lineTo(t * scaleX, snr * scaleY);
    }
  }

  context.stroke();
  context.closePath();

  return { scaleX, scaleY };
};

export const drawHelpLines = ({ canvas, xOffset, yOffset, scaleX, scaleY, signalToNoise, exposureTime }) => {
  const context = canvas.getContext('2d');
  const height = canvas.height;
  const width = canvas.width;

  context.setTransform(1, 0, 0, -1, xOffset + 11, height - yOffset - 11);
  context.beginPath();

  context.strokeStyle = '#bbb';

  context.moveTo(0, signalToNoise * scaleY - 1);
  context.lineTo(width, signalToNoise * scaleY - 1);
  context.moveTo(exposureTime * scaleX - 1, 0);
  context.lineTo(exposureTime * scaleX - 1, width);

  context.stroke();
  context.closePath();
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
