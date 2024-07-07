import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../app/modalSlice';
import { required, mustBeNumber, minValue, maxValue, composeValidators } from '../utils/functions';
import './Modal.css';

const Modal = ({data}) => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(toggleModal());
  };

  const closeModal = () => {
    dispatch(toggleModal());
  };

  const validationFunctions = {
    required,
    mustBeNumber,
    minValue,
    maxValue
  };

  return (
    <div className='modalOverlay'>
      <div className='modal'>
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className='form'>
                {
                  data.map(({name, label, inputType, validators}) => {
                    const validatorFunctions = validators.map((validator) => {
                      return validator.name ? validationFunctions[validator.name](validator.param) : validationFunctions[validator];
                    });

                    return (
                      <Field name={name} validate={composeValidators(...validatorFunctions)} key={name}>
                        {({ input, meta }) => {
                          let inputField = null;

                          switch (inputType) {
                            case 'input':
                              inputField = <input {...input} type='text' className={meta.error && meta.touched ? 'error' : 'noError'} />
                              break;
                            default:
                              break;
                          }

                          return (
                            <>
                              <label dangerouslySetInnerHTML={{__html: label}} />
                              {inputField}
                            </>
                          );
                        }}
                      </Field>
                    )
                  })
                }
              </div>
              <div className='buttons'>
                <button className='btn modalSubmit' type='submit'>Ok</button>
                <button className='btn modalCancel' type='reset' onClick={closeModal}>Cancel</button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
}

export default Modal;
