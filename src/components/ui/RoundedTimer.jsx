import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RoundedTimer({ seconds = 3, navTarget = "/login" }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const navigate = useNavigate();

  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          navigate(navTarget);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [navigate, seconds, navTarget]);

  const progress = 1 - timeLeft / seconds; // от 0 до 1
  const offset = circumference * progress; // от circumference до 0

  return (
    <div className="timer-container">
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <circle className="timer-bg" fill="transparent" strokeWidth={stroke} r={normalizedRadius} cx="50" cy="50" />
        <circle
          className="timer-progress"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={normalizedRadius}
          cx="50"
          cy="50"
        />
        <text className="timer-countdown" x="50" y="55">
          {timeLeft}
        </text>
      </svg>
      <p className="timer-desc">Переадресація через {timeLeft} сек...</p>
    </div>
  );
}

export default RoundedTimer;
