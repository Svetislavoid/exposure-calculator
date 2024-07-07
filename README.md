# Exposure time calculator

Live preview, to be available soon at: https://svetislavoid.github.io/exposure-calculator-react/

![Exposure time calculator form](/src/img/exposureTimeCalculator1.png)
![Exposure time calculator results](/src/img/exposureTimeCalculator2.png)

## About the calculator

This calculator is made primarily for planning observations at the [Astronomical Station Vidojevica](http://vidojevica.aob.rs/) [(Astronomical Observatory of Belgrade)](http://aob.rs/). By filling up the form and clicking on the 'Calculate' button, exposure time needed in order to achive wanted signal-to-noise ratio (S/N) is calculated. If, for the given parameters, exposure time is calculated to be less than 0.01s, calculator will not show any result and the graph will not be drawn.

## How to use

In the form, instruments currently available at the AS Vidojevica can be chosen. Total throughput over all reflective and refractive optical surfaces in the telescope along with the transmission of the chosen filter should be calculated separately and entered in the 'Total transparency' field. The atmosphere transmission coefficient should also be calculated independently of the calculator and entered in the 'Sky transparency' field.

Calculator can also be used with some custom instruments and options, and not only those listed in the dropdown menus. In order to do that, choose 'Custom' option from the dropdown menu. Pop-up window will appear asking for custom instrument parameters.

When using custom telescope, telescope effective area can be omitted, in which case a default value of 100% will be used.

When using custom CCD, to get the best results enter quantum efficiency of the CCD at the wavelength that corresponds to the mean wavelength of a filter that is going to be used.

## Calculations

Calculator uses the following equation to calculate signal-to-noise ratio (SNR):

![Signal to noise ratio](/src/img/snr.png)

From this equation we get an expression for exposure time:

![Exposure time](/src/img/exposure.png)

where S<sub>dc</sub> and S<sub>ro</sub> are camera dark current and read out noise values, respectively.

Counts from the object, counts from the sky and number of pixels in the aperture are calculated as:

![Counts from the object](/src/img/objectSignal.png)
![Counts from the sky](/src/img/skySignal.png)
![Number of pixels in the aperture](/src/img/pixelNo.png)

where

![Camera resolution](/src/img/scale.png)

is camera resolution.

## Telescopes

| Telescope            | Diameter (m) | Focal length (m) | Effective area coefficient |
| :---                 | :----:       | :----:           | :----:                     |
| Cassegrain           | 0.6          | 6                | 1                          |
| Nasmyth (Milanković) | 1.4          | 11.2             | 1                          |

## CCDs

| CCD              | Dark current (e<sup>-</sup>/pixel/sec) | Read-out noise (e<sup>-</sup>) | Pixel size (&mu;m)|
| :---             | :----:                                 | :----:                         | :----:            |
| ANDOR iKon-L 936 | 0.00040                                | 7                              | 13.5              |
| ANDOR iXon 897   | 0.00030                                | 5.3                            | 16                |
| SBIG STXL-6303E  | 0.5                                    | 15                             | 9                 |
| ProLine PL23042  | 0.2                                    | 13                             | 15                |

## Quantum efficiency of CCDs

| Wavelength (nm) | ANDOR iKon-L 936 (%) | ANDOR iXon 897 (%) | SBIG STXL-6303E (%) | ProLine PL23042 (%) |
| :---            | :----:               | :----:             | :----:              | :----:              |
| 300             | 9                    | 12                 | 62                  | 8                   |
| 320             | 12                   | 14                 | 62                  | 12                  |
| 340             | 18                   | 20                 | 62                  | 15                  |
| 360             | 24                   | 25                 | 62                  | 25                  |
| 380             | 42                   | 46                 | 62                  | 4                   |
| 400             | 58                   | 57                 | 62                  | 53                  |
| 420             | 68                   | 67                 | 62                  | 63                  |
| 440             | 75                   | 77                 | 62                  | 73                  |
| 460             | 84                   | 84                 | 62                  | 82                  |
| 480             | 90                   | 90                 | 62                  | 88                  |
| 500             | 95                   | 94                 | 62                  | 91                  |
| 520             | 96                   | 96                 | 62                  | 92                  |
| 540             | 97                   | 97                 | 62                  | 93                  |
| 560             | 98                   | 97                 | 62                  | 93                  |
| 580             | 97                   | 97                 | 62                  | 93                  |
| 600             | 97                   | 97                 | 62                  | 93                  |
| 620             | 96                   | 96                 | 62                  | 92                  |
| 640             | 95                   | 95                 | 62                  | 91                  |
| 660             | 94                   | 94                 | 62                  | 91                  |
| 680             | 93                   | 93                 | 62                  | 9                   |
| 700             | 92                   | 92                 | 62                  | 88                  |
| 720             | 90                   | 89                 | 62                  | 85                  |
| 740             | 90                   | 86                 | 62                  | 81                  |
| 760             | 87                   | 84                 | 62                  | 78                  |
| 780             | 81                   | 82                 | 62                  | 74                  |
| 800             | 77                   | 77                 | 62                  | 7                   |
| 820             | 73                   | 73                 | 62                  | 66                  |
| 840             | 69                   | 68                 | 62                  | 6                   |
| 860             | 64                   | 60                 | 62                  | 55                  |
| 880             | 54                   | 55                 | 62                  | 48                  |
| 900             | 47                   | 48                 | 62                  | 41                  |
| 920             | 40                   | 40                 | 62                  | 31                  |
| 940             | 35                   | 33                 | 62                  | 22                  |
| 960             | 27                   | 27                 | 62                  | 19                  |
| 980             | 20                   | 19                 | 62                  | 16                  |
| 1000            | 14                   | 14                 | 62                  | 1                   |

## Bands

| Band                | Wavelength (&#8491;) | Bandwidth (&#8491;) | Flux (Jy) | Flux (photons) | Extinction coefficient (mag/airmass) |
| :---                | :----:               | :----:              | :----:    | :----:         | :----:                               |
| B                   | 4450                 | 940                 | 4260      | 1445           | 0.4                                  |
| V                   | 5510                 | 880                 | 3640      | 997            | 0.2                                  |
| R                   | 6580                 | 1380                | 3080      | 706            | 0.1                                  |
| I                   | 8060                 | 1490                | 2550      | 477            | 0.08                                 |
| L                   | 35000                | 4720                | 280       | 12             | 0                                    |
| H<sub>&alpha;</sub> | 6563                 | 50                  | 3631      | 835            | 0                                    |
| Red-continuum       | 6452                 | 50                  | 3631      | 849            | 0                                    |
| [SII]               | 6718                 | 35                  | 3631      | 816            | 0                                    |
| G                   | 4770                 | 1450                | 3631      | 1149           | 0                                    |
| R                   | 6231                 | 1300                | 3631      | 879            | 0                                    |
| I                   | 7625                 | 1500                | 3631      | 719            | 0                                    |
| ZS                  | 8930                 | 980                 | 3631      | 613            | 0                                    |
| Y                   | 10200                | 1060                | 3631      | 537            | 0                                    |
