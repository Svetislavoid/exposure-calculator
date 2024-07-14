const STRING_TYPE = 'string';
const NUMBER_TYPE = 'number';

const types = {
  object: STRING_TYPE,
  telescope: STRING_TYPE,
  reducer: NUMBER_TYPE,
  ccd: STRING_TYPE,
  binning: NUMBER_TYPE,
  filter: STRING_TYPE,
  transparency: NUMBER_TYPE,
  airmass: NUMBER_TYPE,
  skyBrightness: NUMBER_TYPE,
  seeing: NUMBER_TYPE,
  aperture: NUMBER_TYPE,
  magnitude: NUMBER_TYPE,
  signalToNoise: NUMBER_TYPE,
  customBandwidth: NUMBER_TYPE,
  customBinning: NUMBER_TYPE,
  customDarkCurrent: NUMBER_TYPE,
  customExtinctionCoefficient: NUMBER_TYPE,
  customFlux: NUMBER_TYPE,
  customPixelSize: NUMBER_TYPE,
  customQuantumEfficiency: NUMBER_TYPE,
  customReadOutNoise: NUMBER_TYPE,
  customReducer: NUMBER_TYPE,
  customTelescopeDiameter: NUMBER_TYPE,
  customTelescopeEffectiveArea: NUMBER_TYPE,
  customTelescopeFocalLength: NUMBER_TYPE,
  customWavelength: NUMBER_TYPE
};

export const parseTypes = (values) => {
  const parsedValues = {...values};
  Object.entries(values).forEach(([key, value]) => {
    if (types[key] === NUMBER_TYPE && !isNaN(parseFloat(value))) {
      parsedValues[key] = parseFloat(value);
    }
  });

  return parsedValues;
};

export const CUSTOM = 'custom';
