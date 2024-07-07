import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header';
import Modal from './components/Modal';
import Calculator from './components/Calculator';
import Footer from './components/Footer';

const App = () => {
  const isModalShown = useSelector((state) => state.modal.isShown);
  const modalData = useSelector((state) => state.modal.data);

  return (
    <div className='app'>
      { isModalShown && <Modal data={modalData} /> }
      <Header />
      <main className='appMain'>
        <Calculator />
      </main>
      <Footer />
    </div>
  );
}

export default App;
