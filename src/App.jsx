import { useRef, useState, useCallback, useEffect } from 'react'
import Webcam from 'react-webcam'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [isCapturing, setIsCapturing] = useState(false)
  const [captureInterval, setCaptureInterval] = useState(1)
  const [processedFrames, setProcessedFrames] = useState(0)
  const captureIntervalRef = useRef(null)
  const webcamRef = useRef(null)

  const capture = useCallback(() => {
    // get image from webcam
    const imageSrc = webcamRef.current.getScreenshot();

    // do preprocessing
    const processedFrame = doPreProcessing(imageSrc);

  }, [webcamRef])

  const startCapture = useCallback(() => {
    setIsCapturing(true);
    captureIntervalRef.current = setInterval(capture, captureInterval * 1000);
  }, [capture, captureInterval])

  const stopCapture = useCallback(() => {
    clearInterval(captureIntervalRef.current);
  }, [])

  useEffect(() => {
    return () => {
      if (captureIntervalRef.current) {
        clearInterval(captureIntervalRef.current);
      }
    }
  }, [])

  const handleIntervalChange = (e) => {
    setCaptureInterval(Number(e.target.value));
  }

  return (
    <>
      <div className='App'>
        <h1>PORG - Processing Of Real-time Gestures</h1>
        <h3>the most beautiful website u have ever seen</h3>
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            style={{ width: '512px', height: 'auto' }}
          />
        </div>
        <div>
          {isCapturing ? (
            <button onClick={stopCapture}>Stop Capture</button>
          ) : (
            <button onClick={startCapture}>Start Capture</button>
          )}
        </div>
      </div>
    </>
  )
}

export default App
