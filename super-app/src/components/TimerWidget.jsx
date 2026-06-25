import { useEffect, useMemo, useState } from "react";

function TimerWidget() {
  const [time, setTime] = useState({ hours: 5, minutes: 9, seconds: 0 });
  const [remaining, setRemaining] = useState(18540);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    const interval = setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          setRunning(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    if (!running) {
      setRemaining(time.hours * 3600 + time.minutes * 60 + time.seconds);
    }
  }, [time, running]);

  const display = useMemo(() => {
    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const seconds = remaining % 60;
    return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0"));
  }, [remaining]);

  const changeTime = (key, step) => {
    setTime((current) => {
      const max = key === "hours" ? 23 : 59;
      const value = Math.min(max, Math.max(0, current[key] + step));
      return { ...current, [key]: value };
    });
  };

  return (
    <article className="timer-widget">
      <div className="timer-ring">
        <span>{display.join(":")}</span>
      </div>
      <div className="timer-controls">
        {["hours", "minutes", "seconds"].map((key) => (
          <div key={key}>
            <p>{key[0].toUpperCase() + key.slice(1)}</p>
            <button type="button" onClick={() => changeTime(key, 1)} disabled={running}>
              ^
            </button>
            <strong>{String(time[key]).padStart(2, "0")}</strong>
            <button type="button" onClick={() => changeTime(key, -1)} disabled={running}>
              v
            </button>
          </div>
        ))}
        <button className="timer-start" type="button" onClick={() => setRunning((value) => !value)}>
          {running ? "Pause" : remaining === 0 ? "Restart" : "Start"}
        </button>
      </div>
    </article>
  );
}

export default TimerWidget;
