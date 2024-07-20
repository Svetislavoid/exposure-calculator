import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import Modal from './components/Modal';
import Calculator from './components/Calculator';
import About from './components/About';
import classes from './App.module.css';
import { toggleAboutPage } from './app/reducers';

const App = () => {
  const dispatch = useDispatch();
  const isModalShown = useSelector((state) => state.global.isModalShown);
  const isAboutPage = useSelector((state) => state.global.isAboutPage);

  const togglePage = () => {
    dispatch(toggleAboutPage());
    window.scrollTo(0, 0);
  };

  return (
    <div className={classes.wrapper}>
      { isModalShown && <Modal /> }
      <Header />
      <main>
        {
          isAboutPage && <button className={classes.togglePageButton} onClick={togglePage}>&#8592; Back to calculator</button>
        }
        <About isShown={isAboutPage} />
        <Calculator isShown={!isAboutPage} />
        {
          !isAboutPage && <button className={classes.togglePageButton} onClick={togglePage}>About the calculator</button>
        }
      </main>
    </div>
  );
}

export default App;
