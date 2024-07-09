import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../app/modalSlice';
import './Modal.css';

const Modal = () => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(toggleModal());
  };

  const closeModal = () => {
    dispatch(toggleModal());
  };

  return (
    <div className='modalOverlay'>
      <div className='modal'>
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
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
