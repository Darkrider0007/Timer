import { useState, useEffect } from "react";

function App() {
  const storedTime = localStorage.getItem("timer");
  const initialElapsedTime = storedTime ? parseInt(storedTime, 10) : 0;
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(initialElapsedTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        const currentTime = new Date().getTime();
        setElapsedTime(currentTime - startTime);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (isRunning || storedTime) {
      // Save elapsed time to localStorage whenever it changes
      localStorage.setItem("timer", elapsedTime.toString());
    } else {
      // If the timer is not running and there's no stored time, clear localStorage
      localStorage.removeItem("timer");
    }

    return () => clearInterval(interval);
  }, [isRunning, startTime, elapsedTime, storedTime]);

  const start = () => {
    if (!isRunning) {
      setStartTime(new Date().getTime() - elapsedTime);
      setIsRunning(true);
    }
  };

  const end = () => {
    setIsRunning(false);
    // Save elapsed time to localStorage when timer is stopped
    localStorage.setItem("timer", elapsedTime.toString());
  };

  const reset = () => {
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
    // Reset timer in localStorage
    localStorage.removeItem("timer");
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };


  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-slate-950 text-white ">
        <img src="./timer.png" alt="logo" className="w-20"/>
        <h1 className="text-4xl p-5 m-4 bg-slate-900 rounded-lg">Timer</h1>
        <div className="text-6xl">{formatTime(elapsedTime)}</div>
        <div className="flex flex-row gap-4"> 
          {!isRunning ? (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={start}>
              Start
            </button>
          ) : (
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={end}>
              Stop
            </button>
          )}
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={reset}>
            Reset
          </button>
          </div>
      </div>
    </>
  );
}

export default App;
