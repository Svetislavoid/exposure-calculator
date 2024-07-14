import { useSelector } from 'react-redux';
import Header from './components/Header';
import Modal from './components/Modal';
import Calculator from './components/Calculator';
import Footer from './components/Footer';
import classes from './App.module.css';

const App = () => {
  const isModalShown = useSelector((state) => state.global.isModalShown);

  return (
    <div className={classes.wrapper}>
      { isModalShown && <Modal /> }
      <Header />
      <main>
        <Calculator />
      </main>
      <Footer />
    </div>
  );
}

export default App;
