import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header';
import Modal from './components/Modal';
import Calculator from './components/Calculator';
import Footer from './components/Footer';

const App = () => {
  const isShown = useSelector((state) => state.modal.isShown);

  return (
    <div className='app'>
      <Header />
      <main className='appMain'>
        { isShown && <Modal /> }
        <Calculator />
      </main>
      <Footer />
    </div>
  );
}

export default App;
