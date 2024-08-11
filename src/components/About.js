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
  const objectSignalFormulaPoint = `\\[S^p_{sig} = 10^{-\\frac{m + a \\cdot C_{ext}}{2.5}} \\cdot \\Phi_p \\cdot T \\cdot A_{eff} \\cdot q \\cdot \\Delta\\lambda \\cdot c\\]`;
  const objectSignalFormulaExtended = `\\[S^e_{sig} = 10^{-\\frac{m + a \\cdot C_{ext}}{2.5}} \\cdot \\Phi_p \\cdot T \\cdot A_{eff} \\cdot q \\cdot \\Delta\\lambda \\cdot R^2 \\cdot c\\]`;
  const skySignalFormula = `\\[S_{sky} = 10^{-\\frac{m_s}{2.5}} \\cdot \\Phi_p \\cdot T \\cdot A_{eff} \\cdot q \\cdot \\Delta\\lambda \\cdot R^2\\]`;
  const pixelNumberFormula = `\\[n = \\pi \\left(\\frac{r['']}{R}\\right)^2\\]`;
  const effectiveTelescopeAreaFormula = `\\[A_{eff} = \\frac{d^2 \\pi}{4} \\cdot C_{eff}\\]`;
  const resolutionFormula = `\\[R \\left[ \\frac{''}{pix} \\right] = \\frac{206265[''] \\cdot l_{px}[m]}{f[m]} \\cdot b\\]`;

  return (
    <MathJaxContext version={3} config={config}>
      <section className={cn(classes.appAbout, {[classes.hidden]: !isShown})}>
        <h4>About the calculator</h4>

        <p>
          This calculator is made primarily for planning observations at the <a href='http://vidojevica.aob.rs/' target='_blank' rel='noreferrer'> Astronomical Station Vidojevica</a> <a href='http://aob.rs/' target='_blank' rel='noreferrer'>(Astronomical Observatory of Belgrade)</a>.
          By filling up the form and clicking on the 'Calculate' button, exposure time needed in order to achive wanted signal-to-noise ratio (S/N) is calculated.
        </p>

        <h4>How to use</h4>

        <p>
          In the form, instruments currently available at the AS Vidojevica can be chosen.
          Total throughput over all reflective and refractive optical surfaces in the telescope, along with the transmission of the chosen
          filter, should be calculated separately and entered in the 'Total transparency' field. The atmosphere transmission coefficient
          should also be calculated independently of the calculator and entered in the 'Sky transparency' field.
        </p>
        <p>
          Calculator can also be used with some custom instruments and options and not only those listed in the dropdown menus.
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

        <p>The following notation is used in the formulas below:</p>

        <div className={classes.notation}>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(d\\)'}</MathJax>
            </span> – telescope diameter
          </div>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(f\\)'}</MathJax>
            </span> – telescope focal length
          </div>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(A_{eff}\\)'}</MathJax>
            </span> – telescope effective area
          </div>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(C_{eff}\\)'}</MathJax>
            </span> – telescope effective area coefficient
          </div>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(\\Phi_p\\)'}</MathJax>
            </span> – filter photon flux
          </div>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(\\Delta\\lambda\\)'}</MathJax>
            </span> – filter bandwidth
          </div>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(C_{ext}\\)'}</MathJax>
            </span> – filter extinction coefficient
          </div>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(q\\)'}</MathJax>
            </span> – camera quantum efficiency at a wavelength of selected filter
          </div>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(l_{px}\\)'}</MathJax>
            </span> – camera pixel size
          </div>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(R\\)'}</MathJax>
            </span> – camera resolution
          </div>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(S_{dc}\\)'}</MathJax>
            </span> – camera dark current
          </div>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(S_{ro}\\)'}</MathJax>
            </span> – camera read-out noise
          </div>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(T\\)'}</MathJax>
            </span> – total transparency on all optical elements
          </div>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(b\\)'}</MathJax>
            </span> – binning
          </div>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(r\\)'}</MathJax>
            </span> – aperture (photometry radius)
          </div>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(m\\)'}</MathJax>
            </span> – magnitude of the observed object
          </div>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(m_{s}\\)'}</MathJax>
            </span> – magnitude of the sky (sky brightness)
          </div>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(a\\)'}</MathJax>
            </span> – airmass
          </div>
          <div>
            <span className={classes.notationSymbol}>
              <MathJax hideUntilTypeset={"first"} inline>{'\\(c\\)'}</MathJax>
            </span> – a percentage of light from the object that falls within the aperture (dependant on the aperture and seeing)
          </div>
        </div>

        <p>Starting with the signal-to-noise ratio (SNR) formula:</p>

        <MathJax hideUntilTypeset={"first"}>{snrFormula}</MathJax>

        <p>we get that the exposure time can be calculated as:</p>

        <MathJax hideUntilTypeset={"first"}>{exposureFormula}</MathJax>

        <p>Counts from the object (point and extended), counts from the sky and number of pixels in the aperture are calculated as:</p>

        <MathJax hideUntilTypeset={"first"}>{objectSignalFormulaPoint}</MathJax>
        <MathJax hideUntilTypeset={"first"}>{objectSignalFormulaExtended}</MathJax>
        <MathJax hideUntilTypeset={"first"}>{skySignalFormula}</MathJax>
        <MathJax hideUntilTypeset={"first"}>{pixelNumberFormula}</MathJax>

        <p>Effective telescope area and camera resolution are:</p>

        <MathJax hideUntilTypeset={"first"}>{effectiveTelescopeAreaFormula}</MathJax>
        <MathJax hideUntilTypeset={"first"}>{resolutionFormula}</MathJax>

        <h4>Parameters</h4>

        <p>The relevant characteristics of telescopes, cameras and filters available at AS Vidojevica are given in the tables below.</p>
        <Parameters />
      </section>
    </MathJaxContext>
  );
}

export default About;
