import { useState } from 'react';
import { Form } from 'react-final-form';
import { initialValues, formFields } from '../utils/formFields';
import { parseTypes } from '../utils/types';
import InputField from './InputField';
import SelectField from './SelectField';

import './Calculator.css';

const Calculator = () => {
  const [isCustomTelescope, setIsCustomTelescope] = useState(false);
  const [isCustomReducer, setIsCustomReducer] = useState(false);
  const [isCustomCCD, setIsCustomCCD] = useState(false);
  const [isCustomBinning, setIsCustomBinning] = useState(false);
  const [isCustomFilter, setIsCustomFilter] = useState(false);

  const customFieldSelected = {
    telescope: isCustomTelescope,
    reducer: isCustomReducer,
    ccd: isCustomCCD,
    binning: isCustomBinning,
    filter: isCustomFilter
  };

  const handleFieldChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const isCustomField = fieldValue === 'custom';

    switch (fieldName) {
      case 'telescope':
        setIsCustomTelescope(isCustomField);
        break;
      case 'reducer':
        setIsCustomReducer(isCustomField);
        break;
      case 'ccd':
        setIsCustomCCD(isCustomField);
        break;
      case 'binning':
        setIsCustomBinning(isCustomField);
        break;
      case 'filter':
        setIsCustomFilter(isCustomField);
        break;
      default:
        break;
    }
  };

  const onSubmit = (values) => {
    const parsedValues = parseTypes(values);
    console.log({parsedValues});
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} onChange={handleFieldChange}>
          <fieldset>
            <legend>Exposure time calculator</legend>

            <div className='form'>
              {
                formFields.map((field) => {
                  const { name, component } = field;

                  return (
                    <div className='parameters' key={name}>
                      {
                        component === 'input' && <InputField field={field} />
                      }
                      {
                        component === 'select' && <SelectField field={field} customFieldSelected={customFieldSelected} />
                      }
                    </div>
                  )
                })
              }

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
