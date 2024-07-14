import { useState } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { toggleResult } from '../app/reducers';
import { initialValues, formFields } from '../utils/formFields';
import { parseTypes, CUSTOM } from '../utils/types';
import InputField from './InputField';
import SelectField from './SelectField';
import Result from './Result';

import cn from 'classnames';
import classes from './Calculator.module.css';

const Calculator = () => {
  const [isCustomTelescope, setIsCustomTelescope] = useState(false);
  const [isCustomReducer, setIsCustomReducer] = useState(false);
  const [isCustomCCD, setIsCustomCCD] = useState(false);
  const [isCustomBinning, setIsCustomBinning] = useState(false);
  const [isCustomFilter, setIsCustomFilter] = useState(false);
  const [fieldsValues, setFieldsValues] = useState({});

  const dispatch = useDispatch();
  const showResult = useSelector((state) => state.global.showResult);

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
    const isCustomField = fieldValue === CUSTOM;

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
    dispatch(toggleResult());
    setFieldsValues(() => parsedValues);
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <form className={classes.form} onSubmit={handleSubmit} onChange={handleFieldChange}>
          <fieldset className={classes.fieldset}>
            <legend className={classes.legend}>Exposure time calculator</legend>
            {
              showResult ?
              <Result fieldsValues={fieldsValues} /> :
              <div className={classes.form}>
                {
                  formFields.map((field) => {
                    const { name, component } = field;

                    return (
                      <div className={classes.parameters} key={name}>
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

                <button type='submit' className={cn('btn', 'submit')}>Calculate</button>
              </div>
            }
          </fieldset>
        </form>
      )}
    />
  );
}

export default Calculator;
