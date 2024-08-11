import { TELESCOPES, CAMERAS, BANDS } from '../utils/params';
import classes from './Parameters.module.css';
import { v4 as uuidv4 } from 'uuid';

const Parameters = () => {

  return (
    <>
      <table className={classes.table}>
        <caption className={classes.caption}>
          Telescopes
        </caption>
        <thead>
        <tr>
          <th scope="col">Telescope</th>
          <th scope="col">Diameter (m)</th>
          <th scope="col">Focal length (m)</th>
          <th scope="col">Effective area coefficient</th>
        </tr>
        </thead>
        <tbody>
          {
            Object.entries(TELESCOPES).map(([key, value]) => (
              <tr key={uuidv4()}>
                <th scope="row">{`${value.label} (${key})`}</th>
                <td>{value.diameter}</td>
                <td>{value.focalLength}</td>
                <td>{value.effectiveAreaCoeff}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <table className={classes.table}>
        <caption className={classes.caption}>
          CCDs
        </caption>
        <thead>
        <tr>
          <th scope="col">CCD</th>
          <th scope="col">Dark current (e<sup>-</sup>/pixel/s)</th>
          <th scope="col">Read-out noise (e<sup>-</sup>)</th>
          <th scope="col">Pixel size (&#181;m)</th>
        </tr>
        </thead>
        <tbody>
          {
            Object.entries(CAMERAS).map(([key, value]) => (
              <tr key={uuidv4()}>
                <th scope="row">{value.label}</th>
                <td>{value.dc}</td>
                <td>{value.ro}</td>
                <td>{value.pxSize * 1000000}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <table className={classes.table}>
        <caption className={classes.caption}>
          Quantum efficiencies of CCDs
        </caption>
        <thead>
        <tr>
          <th scope="col">Wavelength (nm)</th>
          {
            Object.entries(CAMERAS).map(([key, value]) => (
              <th scope="col" key={uuidv4()}>{value.label} (%)</th>
            ))
          }
        </tr>
        </thead>
        <tbody>
          {
            Object.entries(Object.values(CAMERAS).map((value) => value.qe).reduce((acc, qe) => {
              Object.entries(qe).forEach(([wavelength, value]) => {
                if (wavelength !== '0') {
                  acc[wavelength] = acc?.[wavelength] ? [...acc?.[wavelength], value] : [value];
                }
              })

              return acc;              
            }, {})).map(([key, values]) => {
              return <tr key={uuidv4()}>
                <th scope="row">{key}</th>
                {
                  values.map((value) => (
                    <td key={uuidv4()}>{Math.round(value * 100)}</td>
                  ))
                }
              </tr>
            })
          }
        </tbody>
      </table>
      <table className={classes.table}>
        <caption className={classes.caption}>
          Bands
        </caption>
        <thead>
        <tr>
          <th scope="col">Band</th>
          <th scope="col">Wavelength (&#8491;)</th>
          <th scope="col">Bandwidth (&#8491;)</th>
          <th scope="col">Flux (Jy)</th>
          <th scope="col">Flux (photons)</th>
          <th scope="col">Extinction coefficient (mag/airmass)</th>
        </tr>
        </thead>
        <tbody>
          {
            Object.entries(BANDS).map(([key, value]) => (
              <tr key={uuidv4()}>
                <th scope="row">{key}</th>
                <td>{value.wavelength}</td>
                <td>{value.bandwidth}</td>
                <td>{value.fluxJY}</td>
                <td>{value.fluxPh}</td>
                <td>{value.extinctCoeff}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}

export default Parameters;
