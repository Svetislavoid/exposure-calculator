import { Field } from 'react-final-form';
import InputField from './InputField';

const SelectField = ({ field, customFieldSelected }) => {
  const { name, label, component, options, customInputs } = field;

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
        customFieldSelected[name] && customInputs.map((customInputField) => {
          return <InputField field={customInputField} />;
        })
      }
    </>
  );
}

export default SelectField;
