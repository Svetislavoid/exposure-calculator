import './Modal.css';

const Modal = () => {
  return (
    <div className='modal'>
      <div className='telescopeParams'>
        <label for='telescopeDiameter'>Telescope diameter (m):</label>
        <input className='telescopeDiameter' type='text' />
        <label for='telescopeFocalLength'>Telescope focal length (m):</label>
        <input className='telescopeFocalLength' type='text' />
        <label for='telescopeEffectiveAreaCoef'>Effective area of main mirror (%):</label>
        <input className='telescopeEffectiveAreaCoef' type='text' />
      </div>
      <div className='reducerParams'>
        <label for='reducerValue'>Reducer:</label>
        <input className='reducerValue' type='text' />
      </div>
      <div className='ccdParams'>
        <label for='ccdRO'>CCD read-out noise (e<sup>-</sup>/pix):</label>
        <input className='ccdRO' type='text' />
        <label for='ccdDC'>CCD dark current (e<sup>-</sup>/s/pix):</label>
        <input className='ccdDC' type='text' />
        <label for='ccdPixelSize'>CCD pixel size (&#181;m):</label>
        <input className='ccdPixelSize' type='text' />
        <label for='ccdQE'>CCD quantum efficiency (%):</label>
        <input className='ccdQE' type='text' />
      </div>
      <div className='binningParams'>
        <label for='binningValue'>Binning:</label>
        <input className='binningValue' type='text' />
      </div>
      <div className='filterParams'>
        <label for='bandWavelength'>Filter mean wavelength (&#8491;):</label>
        <input className='bandWavelength' type='text' />
        <label for='bandBandwidth'>Filter bandwidth (&#8491;):</label>
        <input className='bandBandwidth' type='text' />
        <label for='bandFlux'>Zero magnitude flux (photon/s/cm<sup>2</sup>/&#8491;):</label>
        <input className='bandFlux' type='text' />
        <label for='extinctionCoeff'>Extinction coefficient (mag/airmass):</label>
        <input className='extinctionCoeff' type='text' />
      </div>
      <input type='button' className='btn modalSubmit' value='Ok' />
    </div>
  );
}

export default Modal;
