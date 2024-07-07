import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header';
import Modal from './components/Modal';
import Calculator from './components/Calculator';
import Footer from './components/Footer';

const App = () => {
  const isModalShown = useSelector((state) => state.modal.isShown);
  const customFieldsConfig = useSelector((state) => state.modal.customFieldsConfig);

  return (
    <div className='app'>
      { isModalShown && <Modal customFieldsConfig={customFieldsConfig} /> }
      <Header />
      <main className='appMain'>
        <Calculator />
      </main>
      <Footer />
    </div>
  );
}

export default App;
