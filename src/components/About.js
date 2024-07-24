import cn from 'classnames';
import classes from './About.module.css';

import Parameters from './Parameters';
import { MathJaxContext, MathJax } from 'better-react-mathjax';

const About = ({ isShown }) => {
  const config = {
    loader: { load: ["[tex]/html"] },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"]
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"]
      ]
    }
  };

  const snrFormula = `\\[SNR = \\frac{S_{sig}t}{\\sqrt{S_{sig}t + S_{sky}tn + S_{dc}tn + S^2_{ro}n}}\\]`;
  const exposureFormula = `\\[t = \\frac{SNR^2 (S_{sig} + S_{sky}n + S_{dc}n) + \\sqrt{SNR^4 (S_{sig} + S_{sky}n + S_{dc}n)^2 + 4S_{sig}^2 SNR^2 S_{ro}^2n}}{2S_{sig}^2}\\]`;
  const objectSignalFormula = `\\[S_{sig} = 10^{-\\frac{mag + airmass \\times extCoeff}{2.5}} \\times zeroMagnitudeFlux \\times totalTransparency \\times effectiveTelescopeArea \\times QE \\times bandwidth\\]`;
  const skySignalFormula = `\\[S_{sky} = 10^{-\\frac{mag_s + airmass \\times extCoeff}{2.5}} \\times zeroMagnitudeFlux \\times totalTransparency \\times effectiveTelescopeArea \\times QE \\times bandwidth \\times scale\\]`;
  const pixelNumberFormula = `\\[n = \\pi \\left(\\frac{radius['']}{scale}\\right)^2\\]`;
  const resolutionFormula = `\\[scale \\left[ \\frac{''}{pix} \\right] = \\frac{206265[''] \\times pxSize[m]}{focalLength[m]}\\]`;

  return (
    <MathJaxContext version={3} config={config}>
      <section className={cn(classes.appAbout, {[classes.hidden]: !isShown})}>
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

        <MathJax hideUntilTypeset={"first"}>{snrFormula}</MathJax>

        <p>From this equation we get an expression for exposure time:</p>

        <MathJax hideUntilTypeset={"first"}>{exposureFormula}</MathJax>

        <p>where <MathJax hideUntilTypeset={"first"} inline>{'\\(S_{dc}\\)'}</MathJax> and <MathJax hideUntilTypeset={"first"} inline>{'\\(S_{ro}\\)'}</MathJax> are camera dark current and read out noise values, respectively.</p>

        <p>Counts from the object, counts from the sky and number of pixels in the aperture are calculated as:</p>

        <MathJax hideUntilTypeset={"first"}>{objectSignalFormula}</MathJax>
        <MathJax hideUntilTypeset={"first"}>{skySignalFormula}</MathJax>
        <MathJax hideUntilTypeset={"first"}>{pixelNumberFormula}</MathJax>

        <p>where</p>

        <MathJax hideUntilTypeset={"first"}>{resolutionFormula}</MathJax>

        <p>is camera resolution.</p>

        <h4>Parameters</h4>
        <Parameters />
      </section>
    </MathJaxContext>
  );
}

export default About;
