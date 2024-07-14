import classes from './Header.module.css';
import matfLogo from '../img/matf.gif';
import aobLogo from '../img/AobColor.png';

const Header = () => {
  return (
    <header className={classes.appHeader}>
      <a href='http://www.matf.bg.ac.rs/' target='_blank' rel='noreferrer'>
        <img
          className={classes.logo}
          src={matfLogo}
          title='University of Belgrade, Faculty of Mathematics'
          alt='University of Belgrade, Faculty of Mathematics logo'>
        </img>
      </a>
      <a href='http://aob.rs/' target='_blank'  rel='noreferrer'>
        <img
          className={classes.logo}
          src={aobLogo}
          title='Astronomical Observatory of Belgrade'
          alt='Astronomical Observatory of Belgrade logo'>
        </img>
      </a>
    </header>
  );
}

export default Header;
