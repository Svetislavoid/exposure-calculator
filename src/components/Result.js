import { useDispatch } from 'react-redux';
import { toggleResult } from '../app/reducers';
import { getLabelFromValue, formFields } from '../utils/formFields';
import './Result.css';

const Result = ({fieldsValues}) => {
  const dispatch = useDispatch();

  const goBack = () => {
    dispatch(toggleResult());
  };

  const renderSelectedValues = (formField, fieldsValues) => {
    const { name, label, options, customInputs } = formField;

    return (
      <>
        <p>{label} <span className='bold'>{options ? getLabelFromValue(options, fieldsValues[name]) : fieldsValues[name]}</span></p>
        {
          fieldsValues[name] === 'custom' &&
            <div className='customInfo'>
              {
                customInputs.map(({ name, label }) => {
                  return <p>{label} <span className='bold'>{fieldsValues[name]}</span></p>
                })
              }
            </div>
        }
      </>
    )};

  return (
    <div className='result'>
      <section>
        {
          formFields.map(formField => {
            return renderSelectedValues(formField, fieldsValues);
          })
        }
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
