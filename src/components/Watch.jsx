import { useState, useEffect } from "react";

const Watch = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  return (
    <div className="hidden sm:block border-2 rounded-full bg-white text-blue-500 w-28 whitespace-nowrap text-center py-1">
      <p className="text-base font-bold">{formatTime(time)}</p>
    </div>
  );
};

export default Watch;
