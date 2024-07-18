import { useRef, useEffect } from 'react';
import { drawCanvas } from '../utils/functions';

const Canvas = ({width, height, signalToNoise, exposureTime, signal, sky, numberOfPixels, darkCurrent, readOutNoise}) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;

    drawCanvas({
      canvas,
      exposureTime,
      darkCurrent,
      readOutNoise,
      numberOfPixels,
      signal,
      signalToNoise,
      sky
    });
  }, [darkCurrent, exposureTime, numberOfPixels, readOutNoise, signal, signalToNoise, sky]);
  
  return <canvas ref={canvasRef} width={width} height={height} />
}

export default Canvas;
