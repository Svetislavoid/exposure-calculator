import classes from './About.module.css';
import snrFormula from '../img/snr.png';
import exposureFormula from '../img/exposure.png';
import objectSignalFormula from '../img/objectSignal.png';
import skySignalFormula from '../img/skySignal.png';
import pixelNumberFormula from '../img/pixelNo.png';
import resolutionFormula from '../img/scale.png';

import Parameters from './Parameters';

const About = () => {
  return (
    <section className={classes.appAbout}>
      <h4>About the calculator</h4>

      <p>
        This calculator is made primarily for planning observations at the <a href='http://vidojevica.aob.rs/' target='_blank' rel='noreferrer'> Astronomical Station Vidojevica</a> <a href='http://aob.rs/' target='_blank' rel='noreferrer'>(Astronomical Observatory of Belgrade)</a>.
        By filling up the form and clicking on the 'Calculate' button, exposure time needed in order to achive wanted signal-to-noise ratio (S/N) is calculated.
        If, for the given parameters, exposure time is calculated to be less than 0.01s, calculator will not show any result and the graph will not be drawn.
      </p>

      <h4>How to use</h4>

      <p>
        In the form, instruments currently available at the AS Vidojevica can be chosen.
        Total throughput over all reflective and refractive optical surfaces in the telescope along with the transmission of the chosen
        filter should be calculated separately and entered in the 'Total transparency' field. The atmosphere transmission coefficient
        should also be calculated independently of the calculator and entered in the 'Sky transparency' field.
      </p>
      <p>
        Calculator can also be used with some custom instruments and options, and not only those listed in the dropdown menus.
        In order to do that, choose 'Custom' option from the dropdown menu and additional input fields will be shown.
      </p>
      <p>
        When using custom telescope, telescope effective area can be omitted, in which case a default value of 100% will be used.
      </p>
      <p>
        When using custom CCD, to get the best results enter quantum efficiency of the CCD at the wavelength that corresponds to the mean wavelength
        of a filter that is going to be used.
      </p>

      <h4>Calculations</h4>

      <p>Calculator uses the following equation to calculate signal-to-noise ratio (SNR):</p>

      <img className={classes.formula} src={snrFormula} alt='SNR formula'></img>

      <p>From this equation we get an expression for exposure time:</p>

      <img className={classes.formula} src={exposureFormula} alt='Exposure time formula'></img>

      <p>where S<sub>dc</sub> and S<sub>ro</sub> are camera dark current and read out noise values, respectively.</p>

      <p>Counts from the object, counts from the sky and number of pixels in the aperture are calculated as:</p>

      <img className={classes.formula} src={objectSignalFormula} alt='Counts from the object formula'></img>
      <img className={classes.formula} src={skySignalFormula} alt='Counts from the sky formula'></img>
      <img className={classes.formula} src={pixelNumberFormula} alt='Pixel number formula'></img>

      <p>where</p>

      <img className={classes.formula} src={resolutionFormula} alt='Camera resolution formula'></img>

      <p>is camera resolution.</p>

      <h4>Parameters</h4>
      <Parameters />
    </section>
  );
}

export default About;
