import cn from 'classnames';
import { Field } from 'react-final-form';

const InputField = ({field}) => {
  const { name, label, component, validation } = field;

  return (
    <Field name={name} key={name} component={component} validate={validation}>
      {({ input, meta }) => (
        <div className='formRow'>
          <label className='formLabel'>{label}</label>
          <input {...input} type='text' className={cn({'error' : meta.error && meta.touched})} />
        </div>
      )}
    </Field>
  );
}

export default InputField;
