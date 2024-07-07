import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { toggleModal, setCustomFieldsConfig } from '../app/modalSlice';
import { required, mustBeNumber, minValue, composeValidators } from '../utils/functions';

import './Calculator.css';

const Calculator = () => {
  const [currentValues, setCurrentValues] = useState({
    telescope: 'cassegrain',
    reducer: 1,
    ccd: 'iXon897',
    binning: 1,
    filter: 'B'
  });
  const telescopeRef = useRef(null);
  const reducerRef = useRef(null);
  const ccdRef = useRef(null);
  const binningRef = useRef(null);
  const filterRef = useRef(null);
  const dispatch = useDispatch();

  const customFields = {
    telescope: [
      {name: 'diameter', label: 'Telescope diameter (m):', inputType: 'input', validators: ['required', 'mustBeNumber', {name: 'minValue', param: 0}]},
      {name: 'focalLength', label: 'Telescope focal length (m):', inputType: 'input', validators: ['required', 'mustBeNumber', {name: 'minValue', param: 0}]},
      {name: 'effectiveArea', label: 'Effective area of main mirror (%):', inputType: 'input', validators: ['required', 'mustBeNumber', {name: 'minValue', param: 0}]}
    ],
    reducer: [
      {name: 'reducer', label: 'Reducer:', inputType: 'input', validators: ['required', 'mustBeNumber', {name: 'minValue', param: 0}]}
    ],
    ccd: [
      {name: 'readOutNoise', label: 'CCD read-out noise (e<sup>-</sup>/pix):', inputType: 'input', validators: ['required', 'mustBeNumber', {name: 'minValue', param: 0}]},
      {name: 'darkCurrent', label: 'CCD dark current (e<sup>-</sup>/s/pix):', inputType: 'input', validators: ['required', 'mustBeNumber', {name: 'minValue', param: 0}]},
      {name: 'pixelSize', label: 'CCD pixel size (&#181;m):', inputType: 'input', validators: ['required', 'mustBeNumber', {name: 'minValue', param: 0}]},
      {name: 'quantumEfficiency', label: 'CCD quantum efficiency (%):', inputType: 'input', validators: ['required', 'mustBeNumber', {name: 'minValue', param: 0}, {name: 'maxValue', param: 100}]}
    ],
    binning: [
      {name: 'binning', label: 'Binning:', inputType: 'input', validators: ['required', 'mustBeNumber', {name: 'minValue', param: 0}]}
    ],
    filter: [
      {name: 'wavelength', label: 'Filter mean wavelength (&#8491;):', inputType: 'input', validators: ['required', 'mustBeNumber', {name: 'minValue', param: 0}]},
      {name: 'bandwidth', label: 'Filter bandwidth (&#8491;):', inputType: 'input', validators: ['required', 'mustBeNumber', {name: 'minValue', param: 0}]},
      {name: 'flux', label: 'Zero magnitude flux (photon/s/cm<sup>2</sup>/&#8491;):', inputType: 'input', validators: ['required', 'mustBeNumber', {name: 'minValue', param: 0}]},
      {name: 'extinctionCoefficient', label: 'Extinction coefficient (mag/airmass):', inputType: 'input', validators: ['required', 'mustBeNumber', {name: 'minValue', param: 0}]}
    ]
  };

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
    signalToNoise: NUMBER_TYPE
  };

  const parseTypes = (values) => {
    const parsedValues = {...values};
    Object.entries(values).forEach(([key, value]) => {
      if (types[key] === NUMBER_TYPE) {
        parsedValues[key] = parseFloat(value);
      }
    });

    return parsedValues;
  };

  const handleFieldChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    console.log(binningRef);

    binningRef.current.value = 2;

    if (fieldValue === 'custom') {
      console.log(currentValues);
      dispatch(toggleModal());
      dispatch(setCustomFieldsConfig(customFields[fieldName]));
    }
  };

  const onSubmit = (values) => {
    const parsedValues = parseTypes(values);
    console.log({parsedValues});
  };

  const storeCurrentValue = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setCurrentValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue
      }
    })
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        object: 'point',
        telescope: 'cassegrain',
        reducer: '1',
        ccd: 'iXon897',
        binning: '1',
        filter: 'B',
        transparency: '',
        airmass: '',
        skyBrightness: '19',
        seeing: '',
        aperture: '',
        magnitude: '',
        signalToNoise: ''
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} onChange={handleFieldChange}>
          <fieldset>
            <legend>Exposure time calculator</legend>

            <div className='form'>
              <div className='parameters'>
                <label>Object:</label>
                <Field name='object' component='select'>
                  <option value='point'>Point</option>
                  <option value='extended'>Extended</option>
                </Field>
              </div>

              <div className='parameters'>
                <label>Telescope:</label>
                <Field name='telescope' component='select' ref={telescopeRef} onClick={storeCurrentValue}>
                  <option value='cassegrain'>60cm Cassegrain</option>
                  <option value='nasmyth'>1.4m Milankovic</option>
                  <option value='custom' className='customTelescope'>Custom telescope</option>
                </Field>
              </div>

              <div className='parameters'>
                <label>Reducer:</label>
                <Field name='reducer' component='select' ref={reducerRef} onClick={storeCurrentValue}>
                  <option value='1'>none</option>
                  <option value='0.64'>0.64x</option>
                  <option value='0.5'>0.5x</option>
                  <option value='custom' className='customReducer'>Custom reducer</option>
                </Field>
              </div>

              <div className='parameters'>
                <label>CCD:</label>
                <Field name='ccd' component='select' ref={ccdRef} onClick={storeCurrentValue}>
                  <option value='iXon897'>ANDOR iXon 897</option>
                  <option value='iKonL936'>Andor iKon-L 936</option>
                  <option value='sbigstxl6303e'>SBIG STXL-6303E</option>
                  <option value='ProLinePL23042'>ProLine PL23042</option>
                  <option value='custom' className='customCCD'>Custom CCD</option>
                </Field>
              </div>

              <div className='parameters'>
                <label>CCD binning:</label>
                <Field name='binning' component='select' ref={binningRef} onClick={storeCurrentValue}>
                  <option value='1'>1x1</option>
                  <option value='2'>2x2</option>
                  <option value='3'>3x3</option>
                  <option value='4'>4x4</option>
                  <option value='5'>5x5</option>
                  <option value='custom' className='customBinning'>Custom binning</option>
                </Field>
              </div>

              <div className='parameters'>
                <label>Band:</label>
                <Field name='filter' component='select' ref={filterRef} onClick={storeCurrentValue}>
                  <option value='B'>B (4450 &#8491;)</option>
                  <option value='V'>V (5510 &#8491;)</option>
                  <option value='R'>R (6580 &#8491;)</option>
                  <option value='I'>I (8060 &#8491;)</option>
                  <option value='L'>L (35000 &#8491;)</option>
                  <option value='Ha'>H&alpha; (6563 &#8491;)</option>
                  <option value='Red-continuum'>Red-continuum (6452 &#8491;)</option>
                  <option value='[SII]'>[SII] (6716 &#8491;)</option>
                  <option value='G'>G (4770 &#8491;)</option>
                  <option value='R1'>R (6231 &#8491;)</option>
                  <option value='I1'>I (7625 &#8491;)</option>
                  <option value='ZS'>ZS (8930 &#8491;)</option>
                  <option value='Y'>Y (10200 &#8491;)</option>
                  <option value='custom' className='customBand'>Custom band</option>
                </Field>
              </div>

              <div className='parameters'>
                <Field className='transparency' name='transparency' validate={composeValidators(required, mustBeNumber, minValue(0))}>
                  {({ input, meta }) => (
                    <>
                      <label>Total transparency on all optical elements:</label>
                      <input {...input} type='text' className={meta.error && meta.touched ? 'error' : 'noError'} />
                    </>
                  )}
                </Field>
              </div>

              <div className='parameters'>
                <Field className='airmass' name='airmass' validate={composeValidators(required, mustBeNumber, minValue(0))}>
                  {({ input, meta }) => (
                    <>
                      <label>Airmass:</label>
                      <input {...input} type='text' className={meta.error && meta.touched ? 'error' : 'noError'} />
                    </>
                  )}
                </Field>
              </div>

              <div className='parameters'>
                <Field className='skyBrightness' name='skyBrightness' component='input' validate={composeValidators(required, mustBeNumber, minValue(0))}>
                  {({ input, meta }) => (
                    <>
                      <label>Sky brightness (mag/arcsec<sup>2</sup>):</label>
                      <input {...input} type='text' className={meta.error && meta.touched ? 'error' : 'noError'} />
                    </>
                  )}
                </Field>
              </div>

              <div className='parameters'>
                <Field className='seeing' name='seeing' component='input' validate={composeValidators(required, mustBeNumber, minValue(0))}>
                  {({ input, meta }) => (
                    <>
                      <label>Seeing (FWHM in arcsec):</label>
                      <input {...input} type='text' className={meta.error && meta.touched ? 'error' : 'noError'} />
                    </>
                  )}
                </Field>
              </div>

              <div className='parameters'>
                <Field className='aperture' name='aperture' component='input' validate={composeValidators(required, mustBeNumber, minValue(0))}>
                  {({ input, meta }) => (
                    <>
                      <label>Radius for photometry (arcsec):</label>
                      <input {...input} type='text' className={meta.error && meta.touched ? 'error' : 'noError'} />
                    </>
                  )}
                </Field>
              </div>

              <div className='parameters'>
                <Field className='magnitude' name='magnitude' component='input' validate={composeValidators(required, mustBeNumber, minValue(0))}>
                  {({ input, meta }) => (
                    <>
                      <label>Magnitude:</label>
                      <input {...input} type='text' className={meta.error && meta.touched ? 'error' : 'noError'} />
                    </>
                  )}
                </Field>
              </div>

              <div className='parameters'>
                <Field className='signalToNoise' name='signalToNoise' component='input' validate={composeValidators(required, mustBeNumber, minValue(0))}>
                  {({ input, meta }) => (
                    <>
                      <label>S/N:</label>
                      <input {...input} type='text' className={meta.error && meta.touched ? 'error' : 'noError'} />
                    </>
                  )}
                </Field>
              </div>

              <button type='submit' className='btn submit'>Calculate</button>
            </div>

            <div className='result hidden'>
              <section>
                <p>Object: <span className='r-object bold'></span></p>
                <p>Telescope: <span className='r-telescope bold'></span></p>
                <p>Reducer: <span className='r-reducer bold'></span></p>
                <p>CCD: <span className='r-ccd bold'></span></p>
                <p>CCD binning: <span className='r-binning bold'></span></p>
                <p>Band: <span className='r-filter bold'></span></p>
                <p>Total transparency on all optical elements: <span className='r-transparency bold'></span></p>
                <p>Airmass: <span className='r-airmass bold'></span></p>
                <p>Sky brightness (mag/arcsec<sup>2</sup>): <span className='r-sky-brightness bold'></span></p>
                <p>Seeing (FWHM in arcsec): <span className='r-seeing bold'></span></p>
                <p>Radius for photometry (arcsec): <span className='r-aperture bold'></span></p>
                <p>Magnitude: <span className='r-magnitude bold'></span></p>
                <p>S/N: <span className='r-signal-to-noise bold'></span></p>
                <p>Signal from the object: <span className='s_sig bold'>0</span> e<sup>-</sup>/s</p>
                <p>Signal from the sky: <span className='s_sky bold'>0</span> e<sup>-</sup>/s/pix</p>
                <p>Dark current: <span className='s_dc bold'>0</span> e<sup>-</sup>/s/pix</p>
                <p>Read out noise: <span className='s_ro bold'>0</span> e<sup>-</sup>/pix</p>
                <p>Number of pixels: <span className='n_pix bold'>0</span> pix</p>
                <p className='exposure bold'>Exposure time: <span>0</span></p>
                <p className='showGraph'>
                <label>Show graph</label>
                  <input type='checkbox' id='showGraph' name='showGraph' />
                </p>
              </section>
              <canvas id='canvas' className='collapsed' width='550' height='400'></canvas>
              <input type='button' className='btn back' value='Back' />
            </div>
          </fieldset>
        </form>
      )}
    />
  );
}

export default Calculator;
