import { useDispatch } from 'react-redux';
import { toggleResult } from '../app/reducers';
import { optionValuesToLabels } from '../utils/formFields';
import './Result.css';

const Result = ({fieldsValues}) => {
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
    customBandwidth,
    customBinning,
    customDarkCurrent,
    customExtinctionCoefficient,
    customFlux,
    customPixelSize,
    customQuantumEfficiency,
    customReadOutNoise,
    customReducer,
    customTelescopeDiameter,
    customTelescopeEffectiveArea,
    customTelescopeFocalLength,
    customWavelength
  } = fieldsValues;

  const dispatch = useDispatch();

  const goBack = () => {
    dispatch(toggleResult());
  };

  return (
    <div className='result'>
      <section>
        <p>Object: <span className='bold'>{optionValuesToLabels.object[object]}</span></p>
        <p>Telescope: <span className='bold'>{optionValuesToLabels.telescope[telescope]}</span></p>
        {
          telescope === 'custom' && (
            <div className='customInfo'>
              <p>Diameter (m): <span className='bold'>{customTelescopeDiameter}</span></p>
              <p>Focal length (m): <span className='bold'>{customTelescopeFocalLength}</span></p>
              <p>Effective area of main mirror (%): <span className='bold'>{customTelescopeEffectiveArea}</span></p>
            </div>
          )
        }
        <p>Reducer: <span className='bold'>{optionValuesToLabels.reducer[reducer]}</span></p>
        {
          reducer === 'custom' && (
            <div className='customInfo'>
              <p>Custom reducer: <span className='bold'>{customReducer}</span></p>
            </div>
          )
        }
        <p>CCD: <span className='bold'>{optionValuesToLabels.ccd[ccd]}</span></p>
        {
          ccd === 'custom' && (
            <div className='customInfo'>
              <p>Read-out noise (e<sup>-</sup>/pix): <span className='bold'>{customReadOutNoise}</span></p>
              <p>Dark current (e<sup>-</sup>/s/pix): <span className='bold'>{customDarkCurrent}</span></p>
              <p>Pixel size (&#181;m): <span className='bold'>{customPixelSize}</span></p>
              <p>Quantum efficiency (%): <span className='bold'>{customQuantumEfficiency}</span></p>
            </div>
          )
        }
        <p>CCD binning: <span className='bold'>{optionValuesToLabels.binning[binning]}</span></p>
        {
          binning === 'custom' && (
            <div className='customInfo'>
              <p>Custom binning: <span className='bold'>{customBinning}</span></p>
            </div>
          )
        }
        <p>Band: <span className='bold'>{optionValuesToLabels.filter[filter]}</span></p>
        {
          filter === 'custom' && (
            <div className='customInfo'>
              <p>Mean wavelength (&#8491;): <span className='bold'>{customWavelength}</span></p>
              <p>Bandwidth (&#8491;): <span className='bold'>{customBandwidth}</span></p>
              <p>Zero magnitude flux (photon/s/cm<sup>2</sup>/&#8491;): <span className='bold'>{customFlux}</span></p>
              <p>Extinction coefficient (mag/airmass): <span className='bold'>{customExtinctionCoefficient}</span></p>
            </div>
          )
        }
        <p>Total transparency on all optical elements: <span className='bold'>{transparency}</span></p>
        <p>Airmass: <span className='bold'>{airmass}</span></p>
        <p>Sky brightness (mag/arcsec<sup>2</sup>): <span className='bold'>{skyBrightness}</span></p>
        <p>Seeing (FWHM in arcsec): <span className='bold'>{seeing}</span></p>
        <p>Radius for photometry (arcsec): <span className='bold'>{aperture}</span></p>
        <p>Magnitude: <span className='bold'>{magnitude}</span></p>
        <p>S/N: <span className='bold'>{signalToNoise}</span></p>
        <p>Signal from the object: <span className='bold'>0</span> e<sup>-</sup>/s</p>
        <p>Signal from the sky: <span className='bold'>0</span> e<sup>-</sup>/s/pix</p>
        <p>Dark current: <span className='bold'>0</span> e<sup>-</sup>/s/pix</p>
        <p>Read out noise: <span className='bold'>0</span> e<sup>-</sup>/pix</p>
        <p>Number of pixels: <span className='bold'>0</span> pix</p>
        <p className='exposure bold'>Exposure time: <span>0</span></p>
        <p className='showGraph'>
        <label>Show graph</label>
          <input type='checkbox' id='showGraph' name='showGraph' />
        </p>
      </section>
      <canvas id='canvas' className='collapsed' width='550' height='400'></canvas>
      <button type='button' className='btn back' onClick={goBack}>Back</button>
    </div>
  );
}

export default Result;
