import { Field } from 'react-final-form';

const InputField = ({field}) => {
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
}

export default InputField;
