import { useRef, useState, useCallback, useEffect } from 'react'
import Webcam from 'react-webcam'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [isCapturing, setIsCapturing] = useState(false)
  const [captureInterval, setCaptureInterval] = useState(1)
  const captureIntervalRef = useRef(null)

  const startCapture = useCallback(() => {
    setIsCapturing(true);
    captureIntervalRef.current = setInterval(capture, captureInterval * 1000);
  }, [])

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

  return (
    <>
      <div className='App'>
        <h1>PORG - Processing Of Real-time Gestures</h1>
        <h3>the most beautiful website u have ever seen</h3>
        <div>
          <Webcam
            audio={false}
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
