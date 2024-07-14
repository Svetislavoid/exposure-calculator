import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../app/reducers';
import classes from './Modal.module.css';
import cn from 'classnames';

const Modal = () => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(toggleModal());
  };

  const closeModal = () => {
    dispatch(toggleModal());
  };

  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modal}>
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className={classes.buttons}>
                <button className={cn(classes.btn, classes.modalSubmit)} type='submit'>Ok</button>
                <button className={cn(classes.btn, classes.modalCancel)} type='reset' onClick={closeModal}>Cancel</button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
}

export default Modal;
