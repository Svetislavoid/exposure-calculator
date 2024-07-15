import { useRef, useEffect } from 'react';
import { resetGraph, drawGraphLines, addGraphValues, drawGraph, drawHelpLines } from '../utils/functions';

const Canvas = ({width, height, signalToNoise, exposureTime, signal, sky, numberOfPixels, darkCurrent, readOutNoise}) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;

    resetGraph({ canvas });
    const {
      xOffset,
      yOffset,
      numberOfXSteps,
      numberOfYSteps,
      widthOfXStep,
      widthOfYStep
    } = drawGraphLines({ canvas, signalToNoise });
    const { upLimitX, upLimitY } = addGraphValues({
      canvas,
      signalToNoise,
      exposureTime,
      xOffset,
      yOffset,
      numberOfXSteps,
      numberOfYSteps,
      widthOfXStep,
      widthOfYStep
    });
    const { scaleX, scaleY } = drawGraph({
      canvas,
      xOffset,
      yOffset,
      numberOfXSteps,
      numberOfYSteps,
      widthOfXStep,
      widthOfYStep,
      upLimitX,
      upLimitY,
      signal,
      sky,
      numberOfPixels,
      darkCurrent,
      readOutNoise
    });
    drawHelpLines({
      canvas,
      xOffset,
      yOffset,
      scaleX,
      scaleY,
      signalToNoise,
      exposureTime
    });
  }, [darkCurrent, exposureTime, numberOfPixels, readOutNoise, signal, signalToNoise, sky]);
  
  return <canvas ref={canvasRef} width={width} height={height} />
}

export default Canvas;
