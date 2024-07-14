import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleResult } from '../app/reducers';
import { getLabelFromValue, formFields } from '../utils/formFields';
import classes from './Result.module.css';
import cn from 'classnames';

const Result = ({fieldsValues}) => {
  const [isGraphShown, setIsGraphShown] = useState(false);
  const dispatch = useDispatch();

  const toggleGraph = () => {
    setIsGraphShown((isGraphShown) => !isGraphShown);
  };

  const goBack = () => {
    dispatch(toggleResult());
  };

  const renderSelectedValues = (formField, fieldsValues) => {
    const { name, label, options, customInputs } = formField;

    return (
      <>
        <p>{label} <strong>{options ? getLabelFromValue(options, fieldsValues[name]) : fieldsValues[name]}</strong></p>
        {
          fieldsValues[name] === 'custom' &&
            <div className={classes.customInfo}>
              {
                customInputs.map(({ name, label }) => {
                  return <p>{label} <strong>{fieldsValues[name]}</strong></p>
                })
              }
            </div>
        }
      </>
    )};

  return (
    <div>
      <section>
        {
          formFields.map(formField => {
            return renderSelectedValues(formField, fieldsValues);
          })
        }
        <p className={classes.result}><strong>Exposure time: <span>0</span></strong></p>
        <p className={classes.showGraph} onClick={toggleGraph}>
          <input id='showGraph' type='checkbox' name='showGraph' />
          <label for='showGraph' onClick={toggleGraph}>Show graph</label>
        </p>
      </section>
      {
        isGraphShown && <canvas id='canvas' width='550' height='400'></canvas>
      }
      <button type='button' className={cn('btn', 'back')} onClick={goBack}>Back</button>
    </div>
  );
}

export default Result;
