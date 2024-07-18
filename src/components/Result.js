import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { toggleResult } from '../app/reducers';
import { getLabelFromValue, formFields } from '../utils/formFields';
import { CUSTOM } from '../utils/types';
import { TELESCOPES, CAMERAS, BANDS } from '../utils/params';
import { calculateExposureTime, formatExposureTime } from '../utils/functions';
import classes from './Result.module.css';
import cn from 'classnames';
import Canvas from './Canvas';

const Result = ({fieldsValues}) => {
  const [isGraphShown, setIsGraphShown] = useState(false);
  const dispatch = useDispatch();
  const { exposure: exposureTime, signal, sky, numberOfPixels, darkCurrent, readOutNoise } = calculateExposureTime({
    fieldsValues,
    telescopes: TELESCOPES,
    cameras: CAMERAS,
    bands: BANDS
  });
  const { signalToNoise } = fieldsValues;

  const toggleGraph = () => {
    setIsGraphShown((isGraphShown) => !isGraphShown);
  };

  const goBack = () => {
    dispatch(toggleResult());
  };

  const renderSelectedValues = (formField, fieldsValues) => {
    const { name, label, options, customInputs } = formField;

    return (
      <Fragment key={name}>
        <p>{label} <strong>{options ? getLabelFromValue(options, fieldsValues[name]) : fieldsValues[name]}</strong></p>
        {
          fieldsValues[name] === CUSTOM &&
            <div className={classes.customInfo}>
              {
                customInputs.map(({ name, label }) => {
                  return <p key={name}>{label} <strong>{fieldsValues[name]}</strong></p>
                })
              }
            </div>
        }
      </Fragment>
    )};

  return (
    <div>
      <div className={classes.resultWrapper}>
        <div>
          {
            formFields.map(formField => {
              return renderSelectedValues(formField, fieldsValues);
            })
          }
          <p>Signal from the object: <strong>{signal.toFixed(2)}</strong> e<sup>-</sup>/s</p>
          <p>Signal from the sky: <strong>{sky.toFixed(2)}</strong> e<sup>-</sup>/s/pix</p>
          <p>Dark current: <strong>{darkCurrent}</strong> e<sup>-</sup>/s/pix</p>
          <p>Read out noise: <strong>{readOutNoise}</strong> e<sup>-</sup>/pix</p>
          <p>Number of pixels: <strong>{numberOfPixels}</strong> pix</p>
          <p className={classes.result}><strong>Exposure time: {formatExposureTime(exposureTime)}</strong></p>
          <p className={classes.showGraph} onClick={toggleGraph}>
            <input id='showGraph' type='checkbox' name='showGraph' />
            <label htmlFor='showGraph' onClick={toggleGraph}>Show graph</label>
          </p>
        </div>
        {
          isGraphShown &&
          <div className={classes.graph}>
            <Canvas
              width="592"
              height="435"
              signalToNoise={signalToNoise}
              exposureTime={exposureTime}
              signal={signal}
              sky={sky}
              numberOfPixels={numberOfPixels}
              darkCurrent={darkCurrent}
              readOutNoise={readOutNoise}
            />
          </div>
        }
      </div>
      <button type='button' className={cn('btn', 'back')} onClick={goBack}>Back</button>
    </div>
  );
}

export default Result;
