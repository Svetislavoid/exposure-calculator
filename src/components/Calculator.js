import { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { required, mustBeNumber, minValue, composeValidators, maxValue } from '../utils/functions';

import './Calculator.css';

const Calculator = () => {
  const [isCustomTelescope, setIsCustomTelescope] = useState(false);
  const [isCustomReducer, setIsCustomReducer] = useState(false);
  const [isCustomCCD, setIsCustomCCD] = useState(false);
  const [isCustomBinning, setIsCustomBinning] = useState(false);
  const [isCustomFilter, setIsCustomFilter] = useState(false);

  const initialValues = {
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
  };

  const formFields = [
    {
      name: 'object',
      component: 'select',
      label: 'Object:',
      options: [
        { value: 'point', label: 'Point' },
        { value: 'extended', label: 'Extended' }
      ]
    },
    {
      name: 'telescope',
      component: 'select',
      label: 'Telescope:',
      options: [
        { value: 'cassegrain', label: '60cm Cassegrain' },
        { value: 'nasmyth', label: '1.4m Milankovic' },
        { value: 'custom', label: 'Custom telescope' }
      ],
      customInputs: [
        {
          name: 'customTelescopeDiameter',
          component: 'input',
          label: 'Diameter (m):',
          validation: composeValidators(required, mustBeNumber, minValue(0))
        },
        {
          name: 'customTelescopeFocalLength',
          component: 'input',
          label: 'Focal length (m):',
          validation: composeValidators(required, mustBeNumber, minValue(0))
        },
        {
          name: 'customTelescopeEffectiveArea',
          component: 'input',
          label: 'Effective area of main mirror (%):',
          validation: composeValidators(required, mustBeNumber, minValue(0))
        }
      ],
      isCustomSelected: isCustomTelescope
    },
    {
      name: 'reducer',
      component: 'select',
      label: 'Reducer:',
      options: [
        { value: '1', label: 'None' },
        { value: '0.64', label: '0.64x' },
        { value: '0.5', label: '0.5x' },
        { value: 'custom', label: 'Custom reducer' }
      ],
      customInputs: [
        {
          name: 'customReducer',
          component: 'input',
          label: 'Custom reducer:',
          validation: composeValidators(required, mustBeNumber, minValue(0))
        }
      ],
      isCustomSelected: isCustomReducer
    },
    {
      name: 'ccd',
      component: 'select',
      label: 'CCD:',
      options: [
        { value: 'iXon897', label: 'ANDOR iXon 897' },
        { value: 'iKonL936', label: 'ANDOR iKon-L 936' },
        { value: 'sbigstxl6303e', label: 'SBIG STXL-6303E' },
        { value: 'ProLinePL23042', label: 'ProLine PL23042' },
        { value: 'custom', label: 'Custom CCD' }
      ],
      customInputs: [
        {
          name: 'customReadOutNoise',
          component: 'input',
          label: <>Read-out noise (e<sup>-</sup>/pix):</>,
          validation: composeValidators(required, mustBeNumber, minValue(0))
        },
        {
          name: 'customDarkCurrent',
          component: 'input',
          label: <>Dark current (e<sup>-</sup>/s/pix):</>,
          validation: composeValidators(required, mustBeNumber, minValue(0))
        },
        {
          name: 'customPixelSize',
          component: 'input',
          label: <>Pixel size (&#181;m):</>,
          validation: composeValidators(required, mustBeNumber, minValue(0))
        },
        {
          name: 'customQuantumEfficiency',
          component: 'input',
          label: 'Quantum efficiency (%):',
          validation: composeValidators(required, mustBeNumber, minValue(0), maxValue(100))
        }
      ],
      isCustomSelected: isCustomCCD
    },
    {
      name: 'binning',
      component: 'select',
      label: 'CCD binning:',
      options: [
        { value: '1', label: '1x1' },
        { value: '2', label: '2x2' },
        { value: '3', label: '3x3' },
        { value: '4', label: '4x4' },
        { value: '5', label: '5x5' },
        { value: 'custom', label: 'Custom binning' }
      ],
      customInputs: [
        {
          name: 'customBinning',
          component: 'input',
          label: 'Custom binning:',
          validation: composeValidators(required, mustBeNumber, minValue(0))
        }
      ],
      isCustomSelected: isCustomBinning
    },
    {
      name: 'filter',
      component: 'select',
      label: 'Band:',
      options: [
        { value: 'B', label: <>B (4450 &#8491;)</> },
        { value: 'V', label: <>V (5510 &#8491;)</> },
        { value: 'R', label: <>R (6580 &#8491;)</> },
        { value: 'I', label: <>I (8060 &#8491;)</> },
        { value: 'L', label: <>L (35000 &#8491;)</> },
        { value: 'Ha', label: <>H&alpha; (6563 &#8491;)</> },
        { value: 'Red-continuum', label: <>Red-continuum (6452 &#8491;)</> },
        { value: '[SII]', label: <>[SII] (6716 &#8491;)</> },
        { value: 'G', label: <>G (4770 &#8491;)</> },
        { value: 'R1', label: <>R (6231 &#8491;)</> },
        { value: 'I1', label: <>I (7625 &#8491;)</> },
        { value: 'ZS', label: <>ZS (8930 &#8491;)</> },
        { value: 'Y', label: <>Y (10200 &#8491;)</> },
        { value: 'custom', label: 'Custom band' }
      ],
      customInputs: [
        {
          name: 'customWavelength',
          component: 'input',
          label: <>Mean wavelength (&#8491;):</>,
          validation: composeValidators(required, mustBeNumber, minValue(0))
        },
        {
          name: 'customBandwidth',
          component: 'input',
          label: <>Bandwidth (&#8491;):</>,
          validation: composeValidators(required, mustBeNumber, minValue(0))
        },
        {
          name: 'customFlux',
          component: 'input',
          label: <>Zero magnitude flux (photon/s/cm<sup>2</sup>/&#8491;):</>,
          validation: composeValidators(required, mustBeNumber, minValue(0))
        },
        {
          name: 'customExtinctionCoefficient',
          component: 'input',
          label: <>Extinction coefficient (mag/airmass):</>,
          validation: composeValidators(required, mustBeNumber, minValue(0))
        }
      ],
      isCustomSelected: isCustomFilter
    },
    {
      name: 'transparency',
      component: 'input',
      label: 'Total transparency on all optical elements:',
      validation: composeValidators(required, mustBeNumber, minValue(0))
    },
    {
      name: 'airmass',
      component: 'input',
      label: 'Airmass:',
      validation: composeValidators(required, mustBeNumber, minValue(0))
    },
    {
      name: 'skyBrightness',
      component: 'input',
      label: <>Sky brightness (mag/arcsec<sup>2</sup>):</>,
      validation: composeValidators(required, mustBeNumber, minValue(0))
    },
    {
      name: 'seeing',
      component: 'input',
      label: 'Seeing (FWHM in arcsec):',
      validation: composeValidators(required, mustBeNumber, minValue(0))
    },
    {
      name: 'aperture',
      component: 'input',
      label: 'Radius for photometry (arcsec):',
      validation: composeValidators(required, mustBeNumber, minValue(0))
    },
    {
      name: 'magnitude',
      component: 'input',
      label: 'Magnitude:',
      validation: composeValidators(required, mustBeNumber, minValue(0))
    },
    {
      name: 'signalToNoise',
      component: 'input',
      label: 'S/N:',
      validation: composeValidators(required, mustBeNumber, minValue(0))
    }
  ];

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

  const parseTypes = (values) => {
    const parsedValues = {...values};
    Object.entries(values).forEach(([key, value]) => {
      if (types[key] === NUMBER_TYPE && !isNaN(parseFloat(value))) {
        parsedValues[key] = parseFloat(value);
      }
    });

    return parsedValues;
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

  const renderInputField = (field) => {
    const { name, label, component, validation } = field;

    return (
      <Field className={name} name={name} key={name} component={component} validate={validation}>
        {({ input, meta }) => (
          <>
            <label>{label}</label>
            <input {...input} type='text' className={meta.error && meta.touched ? 'error' : 'noError'} />
          </>
        )}
      </Field>
    );
  };

  const renderSelectField = (field) => {
    const { name, label, component, options, customInputs, isCustomSelected } = field;

    return (
      <>
        <label>{label}</label>
        <Field name={name} component={component}>
          {
            options.map((option) => {
              const { value, label } = option;

              return (
                <option value={value} key={value}>{label}</option>
              );
            })
          }
        </Field>
        {
          isCustomSelected && customInputs.map((customInputField) => {
            return renderInputField(customInputField);
          })
        }
      </>
    );
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
                        component === 'input' && renderInputField(field)
                      }
                      {
                        component === 'select' && renderSelectField(field)
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
